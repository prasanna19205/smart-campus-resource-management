# Smart Campus Resource & Event Management System
## SQL Test Results — Person 1

### 1. Test environment

- Database: PostgreSQL
- Database name: `smart_campus_db`
- SQL client: PostgreSQL `psql`
- Project responsibility: SQL and PostgreSQL implementation

### 2. Test results

| Test ID | Test description | Expected result | Observed result |
|---|---|---|---|
| DB-01 | Create the database | Database is created | Passed — database created successfully |
| DB-02 | Create core tables | All eight original tables are created | Passed — eight tables verified |
| DB-03 | Insert sample data | Sample records are stored | Passed — records retrieved from all eight original tables |
| DB-04 | Create indexes | Five additional indexes are created | Passed — five `CREATE INDEX` messages observed |
| DB-05 | Execute reporting queries | Queries return the expected results | Passed — all ten queries executed successfully |
| DB-06 | Prevent overlapping confirmed bookings | Conflicting booking is rejected | Passed — exclusion constraint rejected the overlapping booking |
| DB-07 | Enforce registration capacity | Registration beyond capacity is rejected | Passed — trigger rejected registration when capacity was set to two |
| DB-08 | Create database views | Three views are created | Passed — three `CREATE VIEW` messages observed |
| DB-09 | Query registration summary view | Counts and available seats are returned | Passed — both events and their counts were displayed |
| DB-10 | Create equipment-allocation relation | Junction table and index are created | Passed — `CREATE TABLE` and `CREATE INDEX` observed |

### 3. Important observations

- The database rejected an overlapping confirmed booking for the same venue.
- The registration trigger rejected an additional registration when the event's temporary capacity was set to two and two registrations already existed.
- The registration-capacity test ran in a transaction that included a rollback command. Verify the final capacity and registration count before submission.
- The registration summary view returned the correct counts and available seats for the sample events.
- The equipment-allocation relation was created successfully. Equipment over-allocation prevention has not yet been tested.

### 4. Evidence to attach

Capture and attach the actual terminal screenshots for:
1. Successful table creation and table listing.
2. Sample data retrieval.
3. Index creation and index listing.
4. Successful execution of the reporting queries.
5. Rejected overlapping booking.
6. Rejected over-capacity registration.
7. Successful creation of views and the registration summary output.
8. Successful creation of the equipment-allocation table.

### 5. Conclusion

The initial PostgreSQL implementation demonstrates relational table design, constraints, indexes, joins, aggregate queries, views, booking-conflict prevention, and registration-capacity enforcement. Further integration testing is needed to validate equipment availability, the website, and Redis coordination.git add tests/sql-test-results.md