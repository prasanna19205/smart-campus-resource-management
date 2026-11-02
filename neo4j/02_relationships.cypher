// 1. Connect users to events they organize
MATCH (u:User), (e:Event)
WHERE u.user_id = e.organizer_id
MERGE (u)-[:ORGANIZES]->(e);

// 2. Connect events to bookings
MATCH (e:Event), (b:Booking)
WHERE b.event_id = e.event_id
MERGE (e)-[:HAS_BOOKING]->(b);

// 3. Connect bookings to venues
MATCH (b:Booking), (v:Venue)
WHERE b.venue_id = v.venue_id
MERGE (b)-[:AT_VENUE]->(v);

// 4. Connect users to registrations
MATCH (u:User), (r:Registration)
WHERE r.user_id = u.user_id
MERGE (u)-[:HAS_REGISTRATION]->(r);

// 5. Connect registrations to events
MATCH (r:Registration), (e:Event)
WHERE r.event_id = e.event_id
MERGE (r)-[:FOR_EVENT]->(e);

// 6. Connect resources to maintenance records
MATCH (r:Resource), (m:Maintenance)
WHERE m.resource_id = r.resource_id
MERGE (r)-[:HAS_MAINTENANCE]->(m);

// 7. Connect users to feedback
MATCH (u:User), (f:Feedback)
WHERE f.user_id = u.user_id
MERGE (u)-[:SUBMITTED]->(f);

// 8. Connect feedback to events
MATCH (f:Feedback), (e:Event)
WHERE f.event_id = e.event_id
MERGE (f)-[:ABOUT_EVENT]->(e);