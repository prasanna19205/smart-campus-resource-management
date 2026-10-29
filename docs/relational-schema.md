# Smart Campus Resource & Event Management System
## Relational Schema

The system uses PostgreSQL to store structured information about campus users, events, venues, equipment, bookings, registrations, maintenance, feedback, and equipment allocations.

### 1. Relations

**APP_USER**(`user_id` PK, full_name, email UNIQUE, role)

**CAMPUS_EVENT**(`event_id` PK, event_name, description, `organizer_id` FK → APP_USER.user_id, start_time, end_time, capacity)

**VENUE**(`venue_id` PK, venue_name UNIQUE, location, capacity)

**RESOURCE**(`resource_id` PK, resource_name, quantity, status)

**BOOKING**(`booking_id` PK, `event_id` FK → CAMPUS_EVENT.event_id, `venue_id` FK → VENUE.venue_id, start_time, end_time, status)

**REGISTRATION**(`registration_id` PK, `event_id` FK → CAMPUS_EVENT.event_id, `user_id` FK → APP_USER.user_id, registered_at, UNIQUE(event_id, user_id))

**MAINTENANCE**(`maintenance_id` PK, `resource_id` FK → RESOURCE.resource_id, start_time, end_time, description)

**FEEDBACK**(`feedback_id` PK, `event_id` FK → CAMPUS_EVENT.event_id, `user_id` FK → APP_USER.user_id, rating, comments, submitted_at, UNIQUE(event_id, user_id))

**BOOKING_RESOURCE**(`booking_id` PK/FK → BOOKING.booking_id, `resource_id` PK/FK → RESOURCE.resource_id, quantity)

### 2. Relationships and cardinalities

- One user can organize multiple events.
- One user can register for multiple events.
- One event can receive multiple registrations.
- One event can have multiple booking records.
- One venue can have multiple bookings at different times.
- One booking can require multiple resource types through BOOKING_RESOURCE.
- One resource type can be allocated to multiple bookings.
- One resource can have multiple maintenance records.
- One user can submit feedback for multiple events, with at most one feedback record per event.

### 3. Integrity rules

- Primary keys uniquely identify records.
- Foreign keys maintain relationships between tables.
- Email addresses must be unique.
- Event and venue capacities must be positive.
- Event, booking, and maintenance end times must follow their start times.
- Registration records must be unique for each event-user pair.
- Feedback ratings must be between 1 and 5.
- Confirmed bookings for the same venue cannot overlap.
- Registration capacity is enforced by a database trigger.

### 4. Equipment allocation

BOOKING_RESOURCE is a junction relation between BOOKING and RESOURCE. Its composite primary key prevents duplicate allocation rows for the same booking-resource pair. The quantity column records how many units of a resource are requested.

Resource inventory availability and prevention of equipment over-allocation require additional validation beyond this relationship table.