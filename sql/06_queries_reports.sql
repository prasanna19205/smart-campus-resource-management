
-- 1. Display all upcoming events
SELECT event_id, event_name, start_time, end_time, capacity
FROM campus_event
ORDER BY start_time;

-- 2. Display events with organizer names
SELECT e.event_name, u.full_name AS organizer
FROM campus_event e
JOIN app_user u ON e.organizer_id = u.user_id;

-- 3. Display bookings with venue and event names
SELECT b.booking_id, e.event_name, v.venue_name,
       b.start_time, b.end_time, b.status
FROM booking b
JOIN campus_event e ON b.event_id = e.event_id
JOIN venue v ON b.venue_id = v.venue_id;

-- 4. Count registrations for each event
SELECT e.event_name, COUNT(r.registration_id) AS registrations
FROM campus_event e
LEFT JOIN registration r ON e.event_id = r.event_id
GROUP BY e.event_id, e.event_name
ORDER BY registrations DESC;

-- 5. Find events with more than one registration
SELECT e.event_name, COUNT(r.registration_id) AS registrations
FROM campus_event e
JOIN registration r ON e.event_id = r.event_id
GROUP BY e.event_id, e.event_name
HAVING COUNT(r.registration_id) > 1;

-- 6. Find venues that can accommodate at least 80 people
SELECT venue_name, capacity
FROM venue
WHERE capacity >= 80
ORDER BY capacity;

-- 7. Find resources currently under maintenance
SELECT r.resource_name, m.start_time, m.end_time, m.description
FROM maintenance m
JOIN resource r ON m.resource_id = r.resource_id
ORDER BY m.start_time;

-- 8. Calculate average feedback rating per event
SELECT e.event_name, ROUND(AVG(f.rating), 2) AS average_rating
FROM campus_event e
LEFT JOIN feedback f ON e.event_id = f.event_id
GROUP BY e.event_id, e.event_name;

-- 9. Find venues with capacity above the average venue capacity
SELECT venue_name, capacity
FROM venue
WHERE capacity > (SELECT AVG(capacity) FROM venue);

-- 10. Calculate confirmed booking hours for each venue
SELECT v.venue_name,
       COALESCE(
           SUM(EXTRACT(EPOCH FROM (b.end_time - b.start_time)) / 3600),
           0
       ) AS confirmed_booking_hours
FROM venue v
LEFT JOIN booking b
    ON v.venue_id = b.venue_id
   AND b.status = 'confirmed'
GROUP BY v.venue_id, v.venue_name
ORDER BY confirmed_booking_hours DESC;

