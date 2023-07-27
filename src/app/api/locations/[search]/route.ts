import { NextResponse } from 'next/server';
import db from '@/db.js';
import axios from 'axios';

export async function GET(request: Request, {params}: {params: {search: string}}){

   const searchQuery = params.search;
   const apiKey = process.env.GOOGLE_API_KEY;
   const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

   try {

      const response = await axios.get(apiUrl, {
         params: {
            query: searchQuery,
            key: apiKey,
         }
      });

      const responseData = response.data;

      if(responseData.error_message){
         throw Error(responseData.error_message)
      }

      return NextResponse.json({ data: responseData.results });
   } catch (e:any) {
      
      return NextResponse.json({error: e.message});
   }

   // try {
      
   //    const searchQuery = params.search;
   //    if (!searchQuery || typeof searchQuery !== 'string') {
   //       return NextResponse.json({ data: [] });
   //    }
   //    const query = `SELECT * FROM master_locations WHERE name ILIKE $1`;
   //    const result = await db.query(query, [`%${searchQuery}%`]);
      
   //    return NextResponse.json({ data: result.rows });
   // } catch (err) {

   //    return NextResponse.json({ error: 'An error occurred while processing the request.' });
   // }
}