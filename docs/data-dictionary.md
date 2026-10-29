
# Smart Campus Resource & Event Management System
## Data Dictionary

### 1. app_user

| Column | Data type | Constraints | Description |
|---|---|---|---|
| user_id | INTEGER | Primary key, identity | Unique user identifier |
| full_name | VARCHAR(100) | NOT NULL | User's full name |
| email | VARCHAR(150) | NOT NULL, UNIQUE | User email |
| role | VARCHAR(20) | NOT NULL, CHECK | student, organizer, or admin |

### 2. campus_event

| Column | Data type | Constraints | Description |
|---|---|---|---|
| event_id | INTEGER | Primary key, identity | Unique event identifier |
| event_name | VARCHAR(150) | NOT NULL | Event title |
| description | TEXT | — | Event description |
| organizer_id | INTEGER | Foreign key | References app_user(user_id) |
| start_time | TIMESTAMP | NOT NULL | Event start time |
| end_time | TIMESTAMP | NOT NULL, CHECK | Must be after start_time |
| capacity | INTEGER | NOT NULL, CHECK | Maximum registrations; must be positive |

### 3. venue

| Column | Data type | Constraints | Description |
|---|---|---|---|
| venue_id | INTEGER | Primary key, identity | Unique venue identifier |
| venue_name | VARCHAR(100) | NOT NULL, UNIQUE | Venue name |
| location | VARCHAR(150) | NOT NULL | Campus location |
| capacity | INTEGER | NOT NULL, CHECK | Seating capacity; must be positive |

### 4. resource

| Column | Data type | Constraints | Description |
|---|---|---|---|
| resource_id | INTEGER | Primary key, identity | Unique resource identifier |
| resource_name | VARCHAR(100) | NOT NULL | Equipment name |
| quantity | INTEGER | NOT NULL, CHECK | Number of units |
| status | VARCHAR(20) | NOT NULL, CHECK | available, maintenance, or unavailable |

### 5. booking

| Column | Data type | Constraints | Description |
|---|---|---|---|
| booking_id | INTEGER | Primary key, identity | Unique booking identifier |
| event_id | INTEGER | NOT NULL, foreign key | References campus_event(event_id) |
| venue_id | INTEGER | NOT NULL, foreign key | References venue(venue_id) |
| start_time | TIMESTAMP | NOT NULL | Booking start |
| end_time | TIMESTAMP | NOT NULL, CHECK | Must be after start_time |
| status | VARCHAR(20) | NOT NULL, CHECK | pending, confirmed, rejected, or cancelled |

### 6. registration

| Column | Data type | Constraints | Description |
|---|---|---|---|
| registration_id | INTEGER | Primary key, identity | Unique registration identifier |
| event_id | INTEGER | NOT NULL, foreign key | References campus_event(event_id) |
| user_id | INTEGER | NOT NULL, foreign key | References app_user(user_id) |
| registered_at | TIMESTAMP | NOT NULL | Registration timestamp |
| event_id, user_id | — | UNIQUE together | Prevents duplicate registrations |

### 7. maintenance

| Column | Data type | Constraints | Description |
|---|---|---|---|
| maintenance_id | INTEGER | Primary key, identity | Unique maintenance record |
| resource_id | INTEGER | NOT NULL, foreign key | References resource(resource_id) |
| start_time | TIMESTAMP | NOT NULL | Maintenance start |
| end_time | TIMESTAMP | NOT NULL, CHECK | Must be after start_time |
| description | TEXT | — | Maintenance details |

### 8. feedback

| Column | Data type | Constraints | Description |
|---|---|---|---|
| feedback_id | INTEGER | Primary key, identity | Unique feedback identifier |
| event_id | INTEGER | NOT NULL, foreign key | References campus_event(event_id) |
| user_id | INTEGER | NOT NULL, foreign key | References app_user(user_id) |
| rating | INTEGER | NOT NULL, CHECK | Rating from 1 to 5 |
| comments | TEXT | — | User feedback |
| submitted_at | TIMESTAMP | NOT NULL | Submission timestamp |
| event_id, user_id | — | UNIQUE together | One feedback record per user per event |

### 9. booking_resource

| Column | Data type | Constraints | Description |
|---|---|---|---|
| booking_id | INTEGER | Primary key, foreign key | References booking(booking_id) |
| resource_id | INTEGER | Primary key, foreign key | References resource(resource_id) |
| quantity | INTEGER | NOT NULL, CHECK | Number of resource units requested |
| booking_id, resource_id | — | Composite primary key | One allocation record per resource per booking |
