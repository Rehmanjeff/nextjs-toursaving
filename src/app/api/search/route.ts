import { NextResponse } from 'next/server';
import { saveSearch } from '@/app/services/search';
import { saveCars } from '@/app/services/car';
 
export async function POST(request: Request) {
  
   const res = await request.json();
   const search = res.data;
   const lang = res.lang;
   const currency = res.currency;
   const headers = {
      Authorization: `Bearer ${process.env.IWAY_API_TOKEN}`,
   };
   
   if(search.type == 'transfer'){

      const iwayUser = process.env.IWAY_USER_ID;
      const url = process.env.IWAY_API_URI + `/prices/?user_id=${iwayUser}&lang=${lang}&start_place_point=${search.transfer.pickUp.coords}&finish_place_point=${search.transfer.destination.coords}&currency=${currency}`;
      const apiResponse = await fetch(url, {
         headers: {
            ...headers
         }
      });

      let response = await apiResponse.json();

      if(response.result && response.result.length){
         
         const searchId = await saveSearch(search, response);
         const data = await saveCars(searchId, response.result, 'iway');
         response = data;
      }

      return NextResponse.json({ response });
   }else if(search.type == 'chauffer'){

      const iwayUser = process.env.IWAY_USER_ID;
      const url = process.env.IWAY_API_URI + `/prices/rent/?user_id=${iwayUser}&lang=${lang}&start_place_point=${search.chauffer.pickUp.coords}&duration=${search.chauffer.hours * 3600}&currency=${currency}`;
      const apiResponse = await fetch(url, {
         headers: {
            ...headers
         }
      });

      let response = await apiResponse.json();

      if(response.result && response.result.length){
         
         const searchId = await saveSearch(search, response);
         const data = await saveCars(searchId, response.result, 'iway');
         response = data;
      }

      return NextResponse.json({ response });
   }else if(search.type == 'rental'){

      const response = {};
      return NextResponse.json({ response });
   }
}