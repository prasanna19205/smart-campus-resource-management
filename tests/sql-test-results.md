# Smart Campus Resource & Event Management System
## SQL Test Results 

### 1. Test Environment

- **Database:** PostgreSQL 18
- **Database name:** `smart_campus_db`
- **SQL client:** PostgreSQL `psql`
- **Project responsibility:** SQL and PostgreSQL implementation

### 2. Test Results

| Test ID | Test description | Expected result | Observed result |
|---|---|---|---|
| DB-01 | Create the database | Database is created | Passed — database created successfully |
| DB-02 | Create database tables | All nine tables exist | Passed — nine tables verified using `\dt` |
| DB-03 | Insert and retrieve sample data | Sample records are stored and retrievable | Passed — sample data retrieved successfully |
| DB-04 | Create indexes | Query indexes and constraint indexes exist | Passed — 20 indexes verified in PostgreSQL |
| DB-05 | Execute reporting queries | Reporting queries return results | Passed — all ten SQL queries executed successfully |
| DB-06 | Prevent overlapping confirmed bookings | Conflicting booking is rejected | Passed — exclusion constraint rejected an overlapping confirmed booking |
| DB-07 | Enforce registration capacity | Registration beyond capacity is rejected | Passed — trigger rejected registration when event capacity was temporarily set to two |
| DB-08 | Create database views | Three views exist | Passed — all three views verified using `\dv` |
| DB-09 | Query registration summary view | Registration counts and available seats are returned | Passed — summary returned the expected counts and available seats |
| DB-10 | Create resource allocation relation | Junction table and index exist | Passed — `booking_resource` table and its index verified |
| DB-11 | Validate resource allocation | Valid resource allocation succeeds | Passed — one projector was allocated to booking 1 |
| DB-12 | Enforce positive allocation quantity | Zero quantity is rejected | Passed — PostgreSQL rejected quantity zero using a CHECK constraint |
| DB-13 | Prevent resource over-allocation | Allocation exceeding stock is rejected | Passed — PostgreSQL rejected a request for three projectors when one was already allocated and stock was three |
| DB-14 | Validate stock during booking confirmation | Booking cannot be confirmed if its allocation exceeds stock | Passed — PostgreSQL rejected confirmation because the requested quantity exceeded available stock |
| DB-15 | Verify final resource data | Temporary test records are removed and original allocations remain | Passed — temporary test booking was deleted; the original projector allocation remained |

### 3. Important Observations

- The database contains nine tables: `app_user`, `campus_event`, `venue`, `resource`, `booking`, `registration`, `maintenance`, `feedback`, and `booking_resource`.
- The database rejected an overlapping confirmed booking for the same venue.
- The registration-capacity trigger prevented an additional registration when the event's temporary capacity was two and two registrations already existed.
- The original AI Workshop capacity remained 80, with two registrations, after the capacity test.
- The database rejected a resource allocation that would exceed the available projector stock.
- The booking-confirmation trigger rejected confirmation when the requested resource allocation exceeded the stock limit.
- Temporary test bookings were deleted after testing. The original projector allocation for booking 1 remained intact.
- Three views and the resource-allocation relation were verified in PostgreSQL.
- Redis coordination and website integration require separate integration testing with Person 2.

### 4. Evidence to Attach

Capture and attach the actual terminal screenshots for:

1. Database and table creation; final nine-table listing.
2. Sample data retrieval.
3. Index listing.
4. Successful execution of the ten reporting queries.
5. Rejected overlapping confirmed booking.
6. Rejected over-capacity registration.
7. View listing and registration summary output.
8. Resource allocation table and valid allocation.
9. Rejected zero-quantity allocation.
10. Rejected resource over-allocation.
11. Rejected booking confirmation due to insufficient stock.
12. Final resource allocation query showing the original allocation after test cleanup.

### 5. Conclusion

The PostgreSQL implementation includes relational table design, primary and foreign keys, constraints, indexes, SQL reporting queries, views, booking-conflict prevention, registration-capacity enforcement, and resource stock protection.

The resource stock tests confirmed that PostgreSQL prevents resource over-allocation both when allocating resources to confirmed bookings and when confirming a booking. Website integration and Redis coordination remain to be verified with the other team member.
