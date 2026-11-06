# Neo4j Graph Database — Smart Campus Management

## 1. Overview

This folder contains the Neo4j graph database component for the Smart Campus Resource & Event Management System.

Neo4j represents campus entities as nodes and their connections as relationships. It helps explore connections between users, events, bookings, venues and resources.

## 2. Database

- Database: `smart.campus.graph`
- Database type: Neo4j
- Query language: Cypher

## 3. Node Types

- **User:** Students, organizers and administrators.
- **Venue:** Campus halls and laboratories.
- **Resource:** Equipment and campus resources.
- **Event:** Campus events.
- **Booking:** Venue booking records.
- **Registration:** Student event registrations.
- **Maintenance:** Resource maintenance records.
- **Feedback:** Event feedback.

## 4. Relationships

- `ORGANIZES` — User organizes an event.
- `HAS_BOOKING` — Event has a booking.
- `AT_VENUE` — Booking uses a venue.
- `HAS_REGISTRATION` — User has a registration.
- `FOR_EVENT` — Registration belongs to an event.
- `HAS_MAINTENANCE` — Resource has maintenance.
- `SUBMITTED` — User submits feedback.
- `ABOUT_EVENT` — Feedback is about an event.
- `ALLOCATES` — Booking allocates resources with a specified quantity.

## 5. Setup Instructions

1. Install and open Neo4j Desktop.
2. Start the `SmartCampusDB` instance.
3. Connect to the `smart.campus.graph` database.
4. Run the following Cypher files in order:

   - `01_constraints.cypher`
   - `00_create_data.cypher`
   - `02_relationships.cypher`
   - `03_business_rules.cypher`
   - `04_demo_queries.cypher`
The business rules file creates a sample resource allocation and contains validation queries.

## 6. Demonstration Dataset

The initial demonstration graph contains:

- 4 users
- 3 venues
- 3 resources
- 2 events
- 2 bookings
- 3 registrations
- 1 maintenance record
- 1 feedback record

The initial graph contains 19 nodes and 15 relationships.

The business rules implementation additionally creates an `ALLOCATES` relationship between Booking 1 and Projector 1, with an allocated quantity of 2.

After this allocation, the graph contains 19 nodes and 16 relationships.

These are demonstration seed records. They are not automatically synchronized with PostgreSQL.

## 7. Verification Queries

### Count all nodes

```cypher
MATCH (n)
RETURN count(n) AS Total_Nodes;
```

### Count all relationships

```cypher
MATCH ()-[r]->()
RETURN count(r) AS Total_Relationships;
```

### View the complete graph

```cypher
MATCH (n)
OPTIONAL MATCH (n)-[r]->(m)
RETURN n, r, m;
```

### View users and their events

```cypher
MATCH (u:User)-[:ORGANIZES]->(e:Event)
RETURN u.full_name, e.event_name;
```

### View event bookings and venues

```cypher
MATCH (e:Event)-[:HAS_BOOKING]->(b:Booking)-[:AT_VENUE]->(v:Venue)
RETURN e.event_name, b.status, v.venue_name;
```

## 8. Business Rules and Validation

The Neo4j implementation includes the following business-rule validation scenarios.

### 8.1 Resource Allocation

The `ALLOCATES` relationship connects a booking to a resource and stores the allocated quantity.

Example:

```cypher
MATCH (b:Booking {booking_id: 1})
MATCH (r:Resource {resource_id: 1})
MERGE (b)-[a:ALLOCATES]->(r)
SET a.quantity = 2;
```

### 8.2 Resource Stock Validation

Checks allocated quantities against available resource stock and calculates the remaining stock.

### 8.3 Excessive Resource Allocation

Tests whether a new resource request would exceed available stock.

Test result: **REJECTED: Insufficient stock**.

### 8.4 Event Registration Capacity

Checks whether existing and requested registrations exceed the event capacity.

Test result: **REJECTED: Event capacity exceeded**.

### 8.5 Venue Booking Conflict

Checks whether a proposed booking overlaps an existing confirmed booking at the same venue.

Test result: **REJECTED: Venue already booked**.

The validation scenarios are documented in `03_business_rules.cypher`.

These queries demonstrate business-rule validation. They do not provide automatic database-level enforcement. Application-level transactions must perform validation and writes together to provide reliable enforcement, particularly when concurrent requests are possible.

## 9. Testing Summary

The following tests have been executed successfully:

- Node count verification: 19 nodes.
- Initial relationship count verification: 15 relationships.
- Resource allocation: 2 projectors allocated to Booking 1.
- Resource stock validation: 1 projector remaining.
- Excessive resource allocation: Correctly rejected.
- Event registration capacity: Excessive registration request correctly rejected.
- Venue booking conflict: Overlapping booking correctly rejected.

Detailed test results are maintained in `../tests/neo4j-test-results.md`.

## 10. Current Status and Limitations

The Neo4j component includes:

- Database setup and connectivity.
- Eight uniqueness constraints.
- Demonstration nodes and relationships.
- Resource allocation relationships.
- Resource stock validation.
- Event registration capacity validation.
- Venue booking conflict validation.
- Verification queries and documentation.

PostgreSQL synchronization, integration with the web application and end-to-end testing remain integration tasks.

The Neo4j demonstration dataset is separate from PostgreSQL and is not automatically synchronized with it.