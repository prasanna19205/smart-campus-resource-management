
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { eventId, email, phone } = await request.json();

    if (!eventId || !email || !phone) {
      return NextResponse.json(
        { error: "Event ID, email and phone are required." },
        { status: 400 }
      );
    }

    const [users]: any = await pool.query(
      `SELECT user_id, full_name
       FROM app_user
       WHERE email = ? AND role = 'student'`,
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Student account not found." },
        { status: 404 }
      );
    }

    await pool.query(
      "UPDATE app_user SET phone = ? WHERE user_id = ?",
      [phone, users[0].user_id]
    );

    await pool.query(
      "INSERT INTO registration (event_id, user_id) VALUES (?, ?)",
      [eventId, users[0].user_id]
    );

    return NextResponse.json({
      message: "Registration successful!",
      studentName: users[0].full_name,
      email,
      phone,
    });
  } catch (error: any) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        error:
          error.code === "ER_SIGNAL_EXCEPTION"
            ? error.sqlMessage || error.message
            : error.code === "ER_DUP_ENTRY"
            ? "You have already registered for this event."
            : "Registration failed. Please try again.",
      },
      { status: 400 }
    );
  }
}
