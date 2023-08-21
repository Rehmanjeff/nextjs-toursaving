import { UserSearch } from "../(client-components)/type";

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