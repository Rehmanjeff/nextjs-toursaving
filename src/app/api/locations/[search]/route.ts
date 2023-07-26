import { NextResponse } from 'next/server';
import db from '@/db.js';

export async function GET(request: Request, {params}: {params: {search: string}}){
   try {
      
      const searchQuery = params.search;
      if (!searchQuery || typeof searchQuery !== 'string') {
         return NextResponse.json({ data: [] });
      }
      const query = `SELECT * FROM master_locations WHERE name ILIKE $1`;
      const result = await db.query(query, [`%${searchQuery}%`]);
      
      return NextResponse.json({ data: result.rows });
   } catch (err) {

      return NextResponse.json({ error: 'An error occurred while processing the request.' });
   }
}