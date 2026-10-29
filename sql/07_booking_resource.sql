

-- =========================================================
-- 07_booking_resource.sql
-- Resource allocation and stock protection
-- =========================================================

-- 1. Create the booking-resource junction table
CREATE TABLE booking_resource (
    booking_id INTEGER NOT NULL
        REFERENCES booking(booking_id) ON DELETE CASCADE,
    resource_id INTEGER NOT NULL
        REFERENCES resource(resource_id),
    quantity INTEGER NOT NULL DEFAULT 1
        CHECK (quantity > 0),
    PRIMARY KEY (booking_id, resource_id)
);

-- 2. Index resource allocations by resource
CREATE INDEX idx_booking_resource_resource
ON booking_resource(resource_id);


-- 3. Check stock when resource allocations are inserted
--    or updated for confirmed bookings
CREATE OR REPLACE FUNCTION check_resource_stock()
RETURNS TRIGGER AS $$
DECLARE
    available_stock INTEGER;
    already_allocated INTEGER;
    booking_status VARCHAR(20);
BEGIN
    -- Get and lock the resource record
    SELECT quantity, status
    INTO available_stock, booking_status
    FROM resource
    WHERE resource_id = NEW.resource_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Resource % does not exist', NEW.resource_id;
    END IF;

    IF booking_status <> 'available' THEN
        RAISE EXCEPTION
            'Resource % is not available', NEW.resource_id;
    END IF;

    -- Get the booking status
    SELECT status
    INTO booking_status
    FROM booking
    WHERE booking_id = NEW.booking_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION
            'Booking % does not exist', NEW.booking_id;
    END IF;

    -- Only confirmed bookings consume available stock
    IF booking_status = 'confirmed' THEN

        SELECT COALESCE(SUM(br.quantity), 0)
        INTO already_allocated
        FROM booking_resource br
        JOIN booking b
          ON b.booking_id = br.booking_id
        WHERE br.resource_id = NEW.resource_id
          AND b.status = 'confirmed'
          AND br.booking_id <> NEW.booking_id;

        -- Include existing allocation for this booking
        -- when updating its allocation
        IF TG_OP = 'UPDATE'
           AND OLD.resource_id = NEW.resource_id THEN
            already_allocated := already_allocated
                + COALESCE((
                    SELECT SUM(br.quantity)
                    FROM booking_resource br
                    WHERE br.booking_id = NEW.booking_id
                      AND br.resource_id = NEW.resource_id
                ), 0)
                - OLD.quantity;
        END IF;

        IF already_allocated + NEW.quantity > available_stock THEN
            RAISE EXCEPTION
                'Insufficient stock for resource %. Stock: %, allocated elsewhere: %, requested: %',
                NEW.resource_id, available_stock,
                already_allocated, NEW.quantity;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 4. Create the resource allocation trigger
--    Drop it first to make this section safe to rerun
DROP TRIGGER IF EXISTS trg_check_resource_stock
ON booking_resource;

CREATE TRIGGER trg_check_resource_stock
BEFORE INSERT OR UPDATE ON booking_resource
FOR EACH ROW
EXECUTE FUNCTION check_resource_stock();


-- 5. Validate allocations when a booking is confirmed
CREATE OR REPLACE FUNCTION validate_booking_resource_stock()
RETURNS TRIGGER AS $$
DECLARE
    allocated RECORD;
    available_stock INTEGER;
    already_allocated INTEGER;
BEGIN
    IF NEW.status = 'confirmed'
       AND (
           TG_OP = 'INSERT'
           OR OLD.status IS DISTINCT FROM 'confirmed'
       )
    THEN
        FOR allocated IN
            SELECT resource_id, SUM(quantity) AS requested
            FROM booking_resource
            WHERE booking_id = NEW.booking_id
            GROUP BY resource_id
        LOOP
            -- Lock resource and get available stock
            SELECT quantity
            INTO available_stock
            FROM resource
            WHERE resource_id = allocated.resource_id
              AND status = 'available'
            FOR UPDATE;

            IF NOT FOUND THEN
                RAISE EXCEPTION
                    'Resource % does not exist or is unavailable',
                    allocated.resource_id;
            END IF;

            -- Sum allocations for other confirmed bookings
            SELECT COALESCE(SUM(br.quantity), 0)
            INTO already_allocated
            FROM booking_resource br
            JOIN booking b
              ON b.booking_id = br.booking_id
            WHERE br.resource_id = allocated.resource_id
              AND b.status = 'confirmed'
              AND b.booking_id <> NEW.booking_id;

            IF already_allocated + allocated.requested
               > available_stock THEN
                RAISE EXCEPTION
                    'Insufficient stock for resource %. Stock: %, already allocated: %, requested: %',
                    allocated.resource_id, available_stock,
                    already_allocated, allocated.requested;
            END IF;
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 6. Create the booking confirmation trigger
DROP TRIGGER IF EXISTS trg_validate_booking_resource_stock
ON booking;

CREATE TRIGGER trg_validate_booking_resource_stock
BEFORE INSERT OR UPDATE OF status ON booking
FOR EACH ROW
EXECUTE FUNCTION validate_booking_resource_stock();
