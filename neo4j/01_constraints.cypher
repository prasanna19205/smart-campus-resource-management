
CREATE CONSTRAINT user_id_unique IF NOT EXISTS
FOR (u:User)
REQUIRE u.user_id IS UNIQUE;

CREATE CONSTRAINT venue_id_unique IF NOT EXISTS
FOR (v:Venue)
REQUIRE v.venue_id IS UNIQUE;

CREATE CONSTRAINT resource_id_unique IF NOT EXISTS
FOR (r:Resource)
REQUIRE r.resource_id IS UNIQUE;

CREATE CONSTRAINT event_id_unique IF NOT EXISTS
FOR (e:Event)
REQUIRE e.event_id IS UNIQUE;

CREATE CONSTRAINT booking_id_unique IF NOT EXISTS
FOR (b:Booking)
REQUIRE b.booking_id IS UNIQUE;

CREATE CONSTRAINT registration_id_unique IF NOT EXISTS
FOR (r:Registration)
REQUIRE r.registration_id IS UNIQUE;

CREATE CONSTRAINT maintenance_id_unique IF NOT EXISTS
FOR (m:Maintenance)
REQUIRE m.maintenance_id IS UNIQUE;

CREATE CONSTRAINT feedback_id_unique IF NOT EXISTS
FOR (f:Feedback)
REQUIRE f.feedback_id IS UNIQUE;
