
// SMART CAMPUS RESOURCE AND EVENT MANAGEMENT
// Main graph data creation script
// Database: smart.campus.graph

// 1. CREATE USERS
UNWIND [
 {id:1, name:'Aarav Sharma', email:'aarav@example.com', role:'organizer'},
 {id:2, name:'Priya Reddy', email:'priya@example.com', role:'student'},
 {id:3, name:'Rahul Kumar', email:'rahul@example.com', role:'student'},
 {id:4, name:'Campus Admin', email:'admin@example.com', role:'admin'}
] AS x
MERGE (n:User {user_id:x.id})
SET n.full_name=x.name, n.email=x.email, n.role=x.role;

// 2. CREATE VENUES
UNWIND [
 {id:1, name:'Seminar Hall A', location:'Block A', capacity:100},
 {id:2, name:'Computer Lab 1', location:'Block B', capacity:40},
 {id:3, name:'Auditorium', location:'Main Block', capacity:300}
] AS x
MERGE (n:Venue {venue_id:x.id})
SET n.venue_name=x.name, n.location=x.location, n.capacity=x.capacity;

// 3. CREATE RESOURCES
UNWIND [
 {id:1, name:'Projector', quantity:3},
 {id:2, name:'Microphone', quantity:5},
 {id:3, name:'Laptop', quantity:10}
] AS x
MERGE (n:Resource {resource_id:x.id})
SET n.resource_name=x.name, n.quantity=x.quantity, n.status='available';

// 4. CREATE EVENTS
UNWIND [
 {id:1, name:'AI Workshop', description:'Introduction to AI', organizer:1, start:'2026-11-10 10:00', end:'2026-11-10 12:00', capacity:80},
 {id:2, name:'Coding Contest', description:'Campus coding competition', organizer:1, start:'2026-11-12 14:00', end:'2026-11-12 17:00', capacity:100}
] AS x
MERGE (n:Event {event_id:x.id})
SET n.event_name=x.name, n.description=x.description,
    n.organizer_id=x.organizer, n.start_time=x.start,
    n.end_time=x.end, n.capacity=x.capacity;

// 5. CREATE BOOKINGS
UNWIND [
 {id:1, event:1, venue:1, start:'2026-11-10 10:00', end:'2026-11-10 12:00', status:'confirmed'},
 {id:2, event:2, venue:2, start:'2026-11-12 14:00', end:'2026-11-12 17:00', status:'confirmed'}
] AS x
MERGE (n:Booking {booking_id:x.id})
SET n.event_id=x.event, n.venue_id=x.venue,
    n.start_time=x.start, n.end_time=x.end, n.status=x.status;

// 6. CREATE REGISTRATIONS
UNWIND [
 {id:1, event:1, user:2},
 {id:2, event:1, user:3},
 {id:3, event:2, user:2}
] AS x
MERGE (n:Registration {registration_id:x.id})
SET n.event_id=x.event, n.user_id=x.user;

// 7. CREATE MAINTENANCE
UNWIND [
 {id:1, resource:3, start:'2026-11-15 09:00', end:'2026-11-15 12:00', description:'Scheduled laptop maintenance'}
] AS x
MERGE (n:Maintenance {maintenance_id:x.id})
SET n.resource_id=x.resource, n.start_time=x.start,
    n.end_time=x.end, n.description=x.description;

// 8. CREATE FEEDBACK
UNWIND [
 {id:1, event:1, user:2, rating:5, comments:'Very informative workshop'}
] AS x
MERGE (n:Feedback {feedback_id:x.id})
SET n.event_id=x.event, n.user_id=x.user,
    n.rating=x.rating, n.comments=x.comments;
