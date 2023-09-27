import { BookedAdditionalService, CarDataType, Trip } from "@/data/types";
import { ChaufferServiceType, TransferServiceType, UserSearch } from "../(client-components)/type";
import axios from 'axios';
import { NextResponse } from 'next/server';
import { formatDate, generateRandomNumber } from "@/utils/common";

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

export async function createBooking(trip : Trip, search: UserSearch, car: CarDataType, lang: string, bookingNumber: string){

   let startPlaceId = null;
   let pickUpDateTime = null;
   let additionalServices : string[] | null = null;
   let searchType : TransferServiceType | ChaufferServiceType | null = null;
   let finishLocation = null;
   let isRent: boolean = true;
   let rentDuration: number = 0;
   
   if (search.type == 'transfer') {
      isRent = false;
      searchType = search.transfer as TransferServiceType;
      let datee = searchType?.startDate as number;
      pickUpDateTime = formatDate(datee.toString(), search.transfer?.startTime as string);
      finishLocation = {
         "address": searchType?.destination?.name,
         "place_id": searchType?.destination?.id,
         "location": searchType?.destination?.coords,
         "flight_number": trip.flight ? trip.flight.number : "",
         "terminal_number": trip.flight ? trip.flight.terminal : "",
         "time": ""
      }
   } else if (search.type == 'chauffer') {
      searchType = search.chauffer as ChaufferServiceType;
      rentDuration = search.chauffer?.hours as number
   }

   let datee = searchType?.startDate as number;
   pickUpDateTime = formatDate(datee.toString(), search.transfer?.startTime as string);

   
   if(trip.additionalServices){
      additionalServices = trip.additionalServices.map((item: BookedAdditionalService) => item.id)
   }

   const passengers = trip.passengers.map((passenger) => {
      const { name, phoneNumber, email } = passenger;
      const phone = phoneNumber ? `${phoneNumber.countryCode}${phoneNumber.number}` : '';
      return { name, phone, email };
   })

   const url = `https://sandbox.iway.io/transnextgen/v4/orders?lang=${lang}`;
   const headers = {
      "Authorization": `Bearer ${process.env.IWAY_API_TOKEN}`,
      "Content-Type": "application/json"
   };
   const data = {
      "user_id": process.env.IWAY_USER_ID,
      "lang": lang,
      "trips": [
         {
            "user_id": process.env.IWAY_USER_ID,
            "price_id": car.priceId,
            "currency": car.currency.toUpperCase(),
            "passengers_number": trip.passengersNumber,
            "adults_amount": trip.adultsNumber,
            "children_amount": trip.childrenNumber,
            "text_tablet": trip.flight?.greetingSign ?? '',
            "comment": trip.notes,
            "passengers": passengers,
            "internal_number": bookingNumber,
            "additional_services": additionalServices,
            "send_params": {
               "send_client_voucher": false,
               "send_admin_voucher": true,
               "send_client_doc": false,
               "send_admin_doc": true
            },
            "platform": 7,
            "flexible_tariff": true,
            "flexible_tariff_agreement": true,
            "address": "",
            "location": '',
            "additional_address": true,
            "start_location": {
               "address": searchType?.pickUp?.name,
               "place_id": startPlaceId,
               "location": searchType?.pickUp?.coords,
               "flight_number": trip.flight ? trip.flight.number : '',
               "terminal_number": trip.flight ? trip.flight.terminal : '',
               "time": pickUpDateTime
            },
            "finish_location": finishLocation,
            "additional_change_itinerary": 1,
            "additional_wait": 1,
            "fare_on_toll_road": 1,
            "is_rent": isRent,
            "duration": rentDuration * 3600,
            "lang": lang
         }
      ],
   }

   const response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data) });
   const json = await response.json()
   if (json.error) {
      return { success : false, error: json.error, data: null };
   }

   return { success : true, error: null, data: json.result };   
}