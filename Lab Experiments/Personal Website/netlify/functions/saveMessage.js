import { Client } from "pg";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body);

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // set in Netlify
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Make sure table exists
    await client.query(
      "CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, name TEXT, email TEXT, message TEXT, created_at TIMESTAMP DEFAULT NOW())"
    );

    // Insert message
    await client.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message saved successfully!" }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to save message" }) };
  }
}
