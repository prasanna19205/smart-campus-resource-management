# Neo4j Graph Database — Smart Campus Management

## 1. Overview

This folder contains the Neo4j graph database component for the Smart Campus Resource & Event Management System.

Neo4j represents campus entities as nodes and their connections as relationships. This makes it useful for exploring connections between users, events, bookings, venues and resources.

## 2. Database

- Database: `smart.campus.graph`
- Database type: Neo4j
- Query language: Cypher

## 3. Node Types

| Node | Description |
|---|---|
| User | Students, organizers and administrators |
| Venue | Campus halls and laboratories |
| Resource | Equipment and campus resources |
| Event | Campus events |
| Booking | Venue booking records |
| Registration | Student event registrations |
| Maintenance | Resource maintenance records |
| Feedback | Event feedback |

## 4. Relationships

| Relationship | Meaning |
|---|---|
| ORGANIZES | User organizes an event |
| HAS_BOOKING | Event has a booking |
| AT_VENUE | Booking uses a venue |
| HAS_REGISTRATION | User has a registration |
| FOR_EVENT | Registration belongs to an event |
| HAS_MAINTENANCE | Resource has maintenance |
| SUBMITTED | User submits feedback |
| ABOUT_EVENT | Feedback is about an event |

## 5. Setup Instructions

1. Install and open Neo4j Desktop.
2. Start the `SmartCampusDB` instance.
3. Connect to the `smart.campus.graph` database.
4. Run the following Cypher files in order:
   - `01_constraints.cypher`
   - `00_create_data.cypher`
   - `02_relationships.cypher`

## 6. Demonstration Dataset

The current demonstration graph contains:

- 4 users
- 3 venues
- 3 resources
- 2 events
- 2 bookings
- 3 registrations
- 1 maintenance record
- 1 feedback record

Total: 19 nodes and 15 relationships.

These are demonstration seed records. They are not yet automatically synchronized with PostgreSQL.

## 7. Verification Queries

Count all nodes:

```cypher
MATCH (n)
RETURN count(n) AS Total_Nodes;
```

Count all relationships:

```cypher
MATCH ()-[r]->()
RETURN count(r) AS Total_Relationships;
```

View the complete graph:

```cypher
MATCH (n)
OPTIONAL MATCH (n)-[r]->(m)
RETURN n, r, m;
```

View users and their events:

```cypher
MATCH (u:User)-[:ORGANIZES]->(e:Event)
RETURN u.full_name, e.event_name;
```

View event bookings and venues:

```cypher
MATCH (e:Event)-[:HAS_BOOKING]->(b:Booking)-[:AT_VENUE]->(v:Venue)
RETURN e.event_name, b.status, v.venue_name;
```

## 8. Current Status

The Neo4j database setup, demonstration data, uniqueness constraints and graph relationships have been implemented.

PostgreSQL synchronization, application integration and end-to-end testing remain future integration tasks.