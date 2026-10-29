
CREATE TABLE booking_resource (
    booking_id INTEGER NOT NULL
        REFERENCES booking(booking_id) ON DELETE CASCADE,
    resource_id INTEGER NOT NULL
        REFERENCES resource(resource_id),
    quantity INTEGER NOT NULL DEFAULT 1
        CHECK (quantity > 0),
    PRIMARY KEY (booking_id, resource_id)
);

CREATE INDEX idx_booking_resource_resource
ON booking_resource(resource_id);
