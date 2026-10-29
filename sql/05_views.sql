
-- View 1: Event details with organizer names
CREATE OR REPLACE VIEW event_organizer_view AS
SELECT
    e.event_id,
    e.event_name,
    u.full_name AS organizer_name,
    e.start_time,
    e.end_time,
    e.capacity
FROM campus_event e
JOIN app_user u ON e.organizer_id = u.user_id;

-- View 2: Booking details with venue and event names
CREATE OR REPLACE VIEW booking_details_view AS
SELECT
    b.booking_id,
    e.event_name,
    v.venue_name,
    b.start_time,
    b.end_time,
    b.status
FROM booking b
JOIN campus_event e ON b.event_id = e.event_id
JOIN venue v ON b.venue_id = v.venue_id;

-- View 3: Event registration summary
CREATE OR REPLACE VIEW event_registration_summary AS
SELECT
    e.event_id,
    e.event_name,
    e.capacity,
    COUNT(r.registration_id) AS registered_students,
    e.capacity - COUNT(r.registration_id) AS available_seats
FROM campus_event e
LEFT JOIN registration r ON e.event_id = r.event_id
GROUP BY e.event_id, e.event_name, e.capacity;
