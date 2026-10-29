
-- 1. Enable GiST support for equality comparisons
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 2. Prevent overlapping confirmed bookings
ALTER TABLE booking
ADD CONSTRAINT booking_no_overlapping_confirmed
EXCLUDE USING gist (
    venue_id WITH =,
    tsrange(start_time, end_time, '[)') WITH &&
)
WHERE (status = 'confirmed');

-- 3. Function to enforce event registration capacity
CREATE OR REPLACE FUNCTION enforce_registration_capacity()
RETURNS TRIGGER AS $$
DECLARE
    event_capacity INTEGER;
    registration_count INTEGER;
BEGIN
    -- Lock the event row to serialize registrations for this event
    SELECT capacity
    INTO event_capacity
    FROM campus_event
    WHERE event_id = NEW.event_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Event % does not exist', NEW.event_id;
    END IF;

    SELECT COUNT(*)
    INTO registration_count
    FROM registration
    WHERE event_id = NEW.event_id;

    IF registration_count >= event_capacity THEN
        RAISE EXCEPTION
            'Event % has reached its capacity of %',
            NEW.event_id, event_capacity;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Run the capacity check before each registration insertion
CREATE TRIGGER trg_registration_capacity
BEFORE INSERT ON registration
FOR EACH ROW
EXECUTE FUNCTION enforce_registration_capacity();
