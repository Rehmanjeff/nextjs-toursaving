import { CarDataType } from "@/data/types";
import { UserSearch } from "../(client-components)/type";
import axios from 'axios';
import { NextResponse } from 'next/server';
import { formatDate } from "@/utils/common";

export function rewriteSearch(search : UserSearch, response : any) : UserSearch{

   let inputSearch = search;
   const startPlaceId = response[0].start_place.place_id;
   const finishPlaceId = response[0].finish_place.place_id;

   if(inputSearch.type == 'transfer' && inputSearch.transfer && inputSearch.transfer.pickUp && inputSearch.transfer.destination){

      inputSearch.transfer.pickUp.id = startPlaceId;
      inputSearch.transfer.destination.id = finishPlaceId;
   }else if(inputSearch.type == 'chauffer' && inputSearch.chauffer && inputSearch.chauffer.pickUp){

      inputSearch.chauffer.pickUp.id = startPlaceId;
   }

   return inputSearch;
}

export function getCarSubTotal(car : any, search : UserSearch){

   let total = 0;

   if(search.type == 'chauffer'){

      let bookingHours = car.minimum_duration/3600;
      if(search.chauffer?.hours){

         bookingHours = bookingHours <= search.chauffer.hours ? search.chauffer.hours : bookingHours;
      }

      const subTotal = car.price_per_hour * bookingHours;
      total += subTotal;

   }else if(search.type == 'transfer'){

      total += car.price;
   }

   return total;
}

export async function isBookingPossible(search: UserSearch, lang: string, car: CarDataType){

   let startPlaceId = null;
   let pickUpDateTime = null;

   if(search.type == 'transfer'){

      let datee = search.transfer?.startDate as number;
      startPlaceId = search.transfer?.pickUp?.id;
      pickUpDateTime = formatDate(datee.toString(), search.transfer?.startTime as string);
   }else if(search.type == 'chauffer'){

      let datee = search.chauffer?.startDate as number;
      startPlaceId = search.transfer?.pickUp?.id;
      startPlaceId = search.chauffer?.pickUp?.id;
      pickUpDateTime = formatDate(datee.toString(), search.chauffer?.startTime as string);
   }

   const url = `https://sandbox.iway.io/transnextgen/v4/orders/check-time?lang=${lang}&user_id=${process.env.IWAY_USER_ID}`;
   const headers = {
      'Authorization': `Bearer ${process.env.IWAY_API_TOKEN}`,
      'Content-Type': 'application/json'
   };
   const data = {
      'price_id': car.priceId,
      'pickup_time': pickUpDateTime,
      'start_place_id': startPlaceId,
   }

   try {

      const response = await axios.post(url, data, { headers });
      return response.data
   } catch (error) {

      return null;
   }
}