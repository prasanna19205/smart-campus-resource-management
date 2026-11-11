
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import driver from "@/lib/neo4j";

export async function GET() {
  let mysqlStatus = "Not tested";
  let neo4jStatus = "Not tested";

  // Test MySQL connection
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    mysqlStatus = `Connected: ${(rows as { db: string }[])[0].db}`;
  } catch (error) {
    mysqlStatus = "Connection failed";
    console.error("MySQL error:", error);
  }

  // Test Neo4j connection
  try {
    const session = driver.session({
      database: process.env.NEO4J_DATABASE || "neo4j",
    });

    try {
      await session.run("RETURN 1 AS result");
      neo4jStatus = "Connected";
    } finally {
      await session.close();
    }
  } catch (error) {
    neo4jStatus = "Connection failed";
    console.error("Neo4j error:", error);
  }

  return NextResponse.json({
    mysql: mysqlStatus,
    neo4j: neo4jStatus,
  });
}
