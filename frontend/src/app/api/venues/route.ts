
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT
        venue_id,
        venue_name,
        location,
        capacity
      FROM venue
      ORDER BY venue_name
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Fetch venues error:", error);

    return NextResponse.json(
      { error: "Could not fetch venues from MySQL." },
      { status: 500 }
    );
  }
}
