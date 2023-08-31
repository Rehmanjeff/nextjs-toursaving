import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { isEmailValid } from '@/utils/random';

export async function POST(request: Request) {
  try {
      const { email, name, description, search } = await request.json();
      
      if (!name || !email || !search) {
         return NextResponse.json({ error: 'Name and email are required fields.' });
      }

      if (!isEmailValid(email)) {
         return NextResponse.json({ error: 'Invalid email format.' });
      }

      await sql`CREATE TABLE IF NOT EXISTS user_contacts (id SERIAL PRIMARY KEY, full_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMPTZ DEFAULT current_timestamp, updated_at TIMESTAMPTZ DEFAULT current_timestamp, search TEXT);`;
      const result = await sql`INSERT INTO user_contacts (full_name, email, description, search) VALUES (${name}, ${email}, ${description}, ${JSON.stringify(search)});`;
      return NextResponse.json({ data: result });
  } catch (err) {
      return NextResponse.json({ error: 'An error occurred while processing the request.' });
  }
}