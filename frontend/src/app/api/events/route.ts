
import { NextResponse } from "next/server";
import pool from "@/lib/db";

// GET: Fetch all events from MySQL
export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT
        event_id AS id,
        event_name AS title,
        description,
        DATE_FORMAT(start_time, '%Y-%m-%d') AS date,
        venue,
        DATE_FORMAT(start_time, '%H:%i') AS startTime,
        DATE_FORMAT(end_time, '%H:%i') AS endTime,
        DATE_FORMAT(registration_deadline, '%Y-%m-%d') AS deadline,
        capacity,
        organizer_name AS organizer,
        status
      FROM campus_event
      ORDER BY event_id DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Fetch events error:", error);
    return NextResponse.json(
      { error: "Could not fetch events." },
      { status: 500 }
    );
  }
}

// POST: Create a new event in MySQL
export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      date,
      venue,
      startTime,
      endTime,
      deadline,
      capacity,
      organizer,
    } = await request.json();

    if (
      !title || !date || !venue || !startTime ||
      !endTime || !capacity || !organizer
    ) {
      return NextResponse.json(
        { error: "Please fill in all required event details." },
        { status: 400 }
      );
    }

    // Find the organizer's database ID.
    const [users]: any = await pool.query(
      "SELECT user_id FROM app_user WHERE full_name = ? AND role = 'organizer' LIMIT 1",
      [organizer]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Organizer account not found in MySQL." },
        { status: 404 }
      );
    }

    await pool.query(
      `INSERT INTO campus_event
        (event_name, description, organizer_id, start_time,
         end_time, capacity, venue, registration_deadline,
         status, organizer_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)`,
      [
        title,
        description || null,
        users[0].user_id,
        `${date} ${startTime}:00`,
        `${date} ${endTime}:00`,
        Number(capacity),
        venue,
        deadline || null,
        organizer,
      ]
    );

    return NextResponse.json(
      { message: "Event submitted for Admin approval." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { error: "Could not create event in MySQL." },
      { status: 500 }
    );
  }
}


// PATCH: Approve or reject an event
export async function PATCH(request: Request) {
  try {
    const { eventId, status } = await request.json();

    if (
      !eventId ||
      !["Approved", "Rejected"].includes(status)
    ) {
      return NextResponse.json(
        { error: "Invalid event ID or status." },
        { status: 400 }
      );
    }

    const [result]: any = await pool.query(
      `UPDATE campus_event
       SET status = ?
       WHERE event_id = ?`,
      [status, eventId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Event ${status.toLowerCase()} successfully!`,
    });
  } catch (error) {
    console.error("Update event status error:", error);

    return NextResponse.json(
      { error: "Could not update event status." },
      { status: 500 }
    );
  }
}

