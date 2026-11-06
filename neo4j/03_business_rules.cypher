
// SMART CAMPUS RESOURCE MANAGEMENT
// BUSINESS RULES AND VALIDATION QUERIES
// Database: smart.campus.graph

// RULE 1: RESOURCE ALLOCATION
// Allocate 2 projectors to Booking 1.

MATCH (b:Booking {booking_id: 1})
MATCH (r:Resource {resource_id: 1})
MERGE (b)-[a:ALLOCATES]->(r)
SET a.quantity = 2;

// RULE 2: RESOURCE STOCK VALIDATION

MATCH (r:Resource)
OPTIONAL MATCH (b:Booking)-[a:ALLOCATES]->(r)
WHERE b.status = 'confirmed'
WITH r, COALESCE(SUM(a.quantity), 0) AS allocated
RETURN
    r.resource_id AS resource_id,
    r.resource_name AS resource,
    r.quantity AS available_stock,
    allocated,
    r.quantity - allocated AS remaining_stock,
    CASE
        WHEN allocated <= r.quantity THEN 'VALID'
        ELSE 'OVER ALLOCATED'
    END AS validation_status
ORDER BY r.resource_id;

// RULE 3: EXCESSIVE RESOURCE ALLOCATION TEST
// Simulate a request for 2 additional projectors.

MATCH (r:Resource {resource_id: 1})
OPTIONAL MATCH (b:Booking)-[a:ALLOCATES]->(r)
WHERE b.status = 'confirmed'
WITH r, COALESCE(SUM(a.quantity), 0) AS allocated
WITH r, allocated, 2 AS requested
RETURN
    r.resource_name AS resource,
    r.quantity AS total_stock,
    allocated AS already_allocated,
    requested AS new_request,
    allocated + requested AS total_required,
    CASE
        WHEN r.status <> 'available'
            THEN 'REJECTED: Resource unavailable'
        WHEN allocated + requested <= r.quantity
            THEN 'ACCEPTED'
        ELSE 'REJECTED: Insufficient stock'
    END AS result;

// RULE 4: EVENT REGISTRATION CAPACITY VALIDATION
// Simulate 79 additional registrations for Event 1.

MATCH (e:Event {event_id: 1})
OPTIONAL MATCH (reg:Registration)-[:FOR_EVENT]->(e)
WITH e, COUNT(reg) AS current_registrations
WITH e, current_registrations, 79 AS requested
RETURN
    e.event_name AS event,
    e.capacity AS event_capacity,
    current_registrations,
    requested AS new_registrations,
    current_registrations + requested AS total_required,
    CASE
        WHEN current_registrations + requested <= e.capacity
            THEN 'ACCEPTED'
        ELSE 'REJECTED: Event capacity exceeded'
    END AS result;

// RULE 5: VENUE BOOKING CONFLICT VALIDATION
// Simulate a booking at Seminar Hall A from 11:00 to 13:00.

MATCH (v:Venue {venue_id: 1})
OPTIONAL MATCH (existing:Booking)-[:AT_VENUE]->(v)
WHERE existing.status = 'confirmed'
  AND existing.start_time < '2026-11-10 13:00'
  AND existing.end_time > '2026-11-10 11:00'
WITH v, COUNT(existing) AS conflicting_bookings
RETURN
    v.venue_name AS venue,
    '2026-11-10 11:00' AS requested_start,
    '2026-11-10 13:00' AS requested_end,
    conflicting_bookings,
    CASE
        WHEN conflicting_bookings > 0
            THEN 'REJECTED: Venue already booked'
        ELSE 'ACCEPTED'
    END AS result;
