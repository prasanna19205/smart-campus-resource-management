
// SMART CAMPUS RESOURCE MANAGEMENT
// NEO4J CRUD AND GRAPH QUERY DEMONSTRATIONS
// Database: smart.campus.graph

// =====================================================
// 1. CREATE
// =====================================================

// Clean up an earlier demo record, if one exists.
MATCH (d:DemoTest {demo_id: 101})
DELETE d;

// Create a temporary demonstration node.
CREATE (d:DemoTest {
    demo_id: 101,
    name: 'Neo4j CRUD Demonstration',
    status: 'Created'
})
RETURN d;


// =====================================================
// 2. READ
// =====================================================

MATCH (d:DemoTest {demo_id: 101})
RETURN d;


// =====================================================
// 3. UPDATE
// =====================================================

MATCH (d:DemoTest {demo_id: 101})
SET d.status = 'Updated'
RETURN d;


// =====================================================
// 4. DELETE
// =====================================================

MATCH (d:DemoTest {demo_id: 101})
DELETE d;


// =====================================================
// 5. VIEW USERS AND EVENTS THEY ORGANIZE
// =====================================================

MATCH (u:User)-[:ORGANIZES]->(e:Event)
RETURN
    u.full_name AS Organizer,
    e.event_name AS Event;


// =====================================================
// 6. VIEW EVENT BOOKINGS AND VENUES
// =====================================================

MATCH (e:Event)-[:HAS_BOOKING]->(b:Booking)-[:AT_VENUE]->(v:Venue)
RETURN
    e.event_name AS Event,
    b.status AS BookingStatus,
    v.venue_name AS Venue;


// =====================================================
// 7. VIEW STUDENT EVENT REGISTRATIONS
// =====================================================

MATCH (u:User)-[:HAS_REGISTRATION]->(r:Registration)-[:FOR_EVENT]->(e:Event)
RETURN
    u.full_name AS Student,
    e.event_name AS Event;


// =====================================================
// 8. COUNT REGISTRATIONS PER EVENT
// =====================================================

MATCH (e:Event)
OPTIONAL MATCH (r:Registration)-[:FOR_EVENT]->(e)
RETURN
    e.event_name AS Event,
    COUNT(r) AS TotalRegistrations;


// =====================================================
// 9. VIEW RESOURCE ALLOCATIONS
// =====================================================

MATCH (b:Booking)-[a:ALLOCATES]->(r:Resource)
RETURN
    b.booking_id AS Booking,
    r.resource_name AS Resource,
    a.quantity AS AllocatedQuantity;


// =====================================================
// 10. CHECK RESOURCE STOCK
// =====================================================

MATCH (r:Resource)
OPTIONAL MATCH (b:Booking)-[a:ALLOCATES]->(r)
WITH
    r,
    SUM(
        CASE
            WHEN b.status = 'confirmed' THEN a.quantity
            ELSE 0
        END
    ) AS allocated
RETURN
    r.resource_name AS Resource,
    r.quantity AS AvailableStock,
    COALESCE(allocated, 0) AS Allocated,
    r.quantity - COALESCE(allocated, 0) AS RemainingStock
ORDER BY r.resource_id;


// =====================================================
// 11. VIEW THE COMPLETE CAMPUS GRAPH
// =====================================================

MATCH (n)
OPTIONAL MATCH (n)-[rel]->(m)
RETURN n, rel, m;
