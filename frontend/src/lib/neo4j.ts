
import "server-only";
import neo4j from "neo4j-driver";

// Connect to the local Neo4j instance.
const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME!,
    process.env.NEO4J_PASSWORD!
  )
);

// Open a session for our Smart Campus graph database.
export function getNeo4jSession() {
  return driver.session({
    database: process.env.NEO4J_DATABASE || "neo4j",
  });
}

export default driver;
