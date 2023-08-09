import { NextResponse } from 'next/server';
import db from '@/db.js';
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

      const query = `INSERT INTO user_contacts (full_name, email, description, search) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await db.query(query, [name, email, description, JSON.stringify(search)]);

      return NextResponse.json({ data: result.rows });
  } catch (err) {
      return NextResponse.json({ error: 'An error occurred while processing the request.' });
  }
}