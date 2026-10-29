# smart-campus-resource-management
Smart Campus Resource and Event Management System using PostgreSQL, Redis and Next.js
# Smart Campus Resource & Event Management System

A full-stack campus management system for organizing events, managing venues and equipment, processing bookings, and handling student registrations.

## Technology Stack

- PostgreSQL — relational database and permanent records
- Redis — caching and temporary booking holds
- Next.js — web application and API routes
- Git and GitHub — version control and collaboration

## PostgreSQL Setup

### Prerequisites

- PostgreSQL installed on your computer
- Git installed
- Access to the project repository

### 1. Create the database

Open PostgreSQL SQL Shell (`psql`) and connect using your PostgreSQL credentials.

Run:

```sql
CREATE DATABASE smart_campus_db;
```

Connect to the new database:

```sql
\c smart_campus_db
```

### 2. Run the SQL scripts

From the project root, execute the SQL scripts in this order using PostgreSQL `psql`:

1. `sql/01_schema.sql`
2. `sql/02_constraints_indexes.sql`
3. `sql/03_sample_data.sql`
4. `sql/04_functions_triggers.sql`
5. `sql/05_views.sql`
6. `sql/06_queries_reports.sql`
7. `sql/07_booking_resource.sql`

For example, in PowerShell:

```powershell
Get-Content .\sql\01_schema.sql | & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d smart_campus_db
```

Replace the executable path with your PostgreSQL installation path if it differs.

Run each script in the same database. The schema and sample-data scripts are intended for initial setup; do not blindly rerun them against a populated database.

### 3. Verify the database

In SQL Shell (`psql`), run:

```sql
\c smart_campus_db
\dt
```

Use the table listing to verify that the database tables exist.

### 4. Project documentation

- `docs/er-diagram.md` — entity relationships
- `docs/data-dictionary.md` — table and column definitions
- `docs/relational-schema.md` — relational model and integrity rules
- `tests/sql-test-results.md` — SQL test results and evidence

## Database Features

- Relational tables, primary keys, foreign keys, and constraints
- Sample data for campus events, users, venues, resources, bookings, and registrations
- Indexes for commonly queried columns
- SQL joins, aggregate queries, subqueries, and reports
- Views for event, booking, and registration summaries
- Prevention of overlapping confirmed venue bookings
- Registration-capacity enforcement through a database trigger
- Equipment allocation through the `booking_resource` junction table

## Current Implementation Status

The initial PostgreSQL implementation and its core SQL tests have been completed. Website development, Redis integration, equipment-availability validation, and end-to-end integration testing remain separate project tasks.

## Team Collaboration

This is a shared team repository. Person 1 leads PostgreSQL and SQL implementation; Person 2 leads Redis and its integration. Both members contribute to integration, testing, documentation, and the final presentation.

**Security:** Never commit database passwords, real credentials, or `.env` files to GitHub.