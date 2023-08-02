import { CarDataType, CarFullDataType, Supplier } from '@/data/types';
import { checkKey, getValue, setValue } from './redis';
import random from '@/utils/random';
import { PathName } from '@/routers/types';

export async function saveCars(searchId : string, cars: any, supplier: Supplier){

   let carsResult : CarDataType[] = [];
   for (let index = 0; index < cars.length; index++) {
      
      const carId = random();
      const item = cars[index];
      const additionalServices = item.additional_services.map((service : any) => {
         return {
            id: service.id,
            serviceId: service.additional_service_id,
            price: service.price,
            name: service.name,
            uid: service.uid,
            defaultInclude: service.default_include,
            currency: service.currency.toLowerCase(),
            category: service.category,
            type: service.type
         }
      });
      const car : CarDataType = {
         id: carId,
         priceId: item.price_uid,
         href: '/car/' + carId as PathName,
         title: item.car_class.title,
         shortDescription: item.car_class.models.length ? item.car_class.models.join(',') : '',
         featuredImage: process.env.NEXT_PUBLIC_IWAY_CAR_PHOTO_URI + "/" + item.car_class.photo,
         price: item.price,
         seats: parseInt(item.car_class.capacity),
         supplier: supplier,
         currency: item.currency.toLowerCase(),
         cancellationTime: item.cancellation_time,
         allowableTime: item.allowable_time,
         additionalServices: additionalServices,
         hasFastBooking : item.is_fast_booking
      }

      const carFullData : CarFullDataType = {
         'searchId' : searchId,
         'data' : car,
         'timestamp' : new Date().getTime()
      }

      await setValue(carId.toString(), JSON.stringify(carFullData));
      carsResult.push(car);
   }

   return carsResult;
}

export async function getCar(carId : string){

   let carResult : CarFullDataType | null = null;
   const isCar = await checkKey(carId);
   if(isCar){

      let carString = await getValue(carId);
      carResult = carString ? JSON.parse(carString) : null;
   }

   return carResult;
}