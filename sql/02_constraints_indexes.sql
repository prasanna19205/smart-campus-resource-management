
-- Speed up searches for events by start time
CREATE INDEX idx_event_start_time
ON campus_event(start_time);

-- Speed up booking searches by venue and time
CREATE INDEX idx_booking_venue_time
ON booking(venue_id, start_time, end_time);

-- Speed up finding registrations for an event
CREATE INDEX idx_registration_event
ON registration(event_id);

-- Speed up maintenance searches by resource
CREATE INDEX idx_maintenance_resource
ON maintenance(resource_id);

-- Speed up feedback analysis by event
CREATE INDEX idx_feedback_event
ON feedback(event_id);
