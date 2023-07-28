import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  
   const res = await request.json();
   const search = res.data;
   const lang = res.lang;
   const currency = res.currency;
   
   if(search.type == 'chauffer'){

      const iwayUser = process.env.IWAY_USER_ID;
      const url = process.env.IWAY_API_URI + `/prices?user_id=${iwayUser}&lang=${lang}&start_place_point=${search.chauffer.pickUp.coords}&finish_place_point=${search.chauffer.destination.coords}&currency=${currency}`;
      const headers = {
         Authorization: `Bearer ${process.env.IWAY_API_TOKEN}`,
      };
      const apiResponse = await fetch(url, {
         headers: {
            ...headers
         }
      });

      const response = await apiResponse.json();
      return NextResponse.json({ response });
   }else if(search.type == 'rental'){

      const response = {};
      return NextResponse.json({ response });
   }
}