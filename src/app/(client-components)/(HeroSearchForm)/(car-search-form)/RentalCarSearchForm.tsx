"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import DateTimeInput from "../DateTimeInput";
import { Location } from "@/app/(client-components)/type";
import { PathName } from "@/routers/types";
import { DEMO_LOCATIONS } from "@/data/locations";
import IconButton from "@/shared/IconButton";
import useNextRouter from '@/hooks/useNextRouter';
import { RentalServiceType, RentalType, SearchParams } from "@/app/(client-components)/type";
import { encodeIntoQuery } from "@/utils/userSearch";

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
   const { redirectTo } = useNextRouter();
   const locations : Location[] = DEMO_LOCATIONS;

   const [pickupError, setPickupError] = useState<string | null>(null);
   const [dropoffError, setDropoffError] = useState<string | null>(null);

   const defaultPickupDate = new Date(new Date());
   defaultPickupDate.setDate(defaultPickupDate.getDate() + 1);
   const defaultPickupTime = "12:00 am";
   const defaultDropoffDate = new Date(new Date());
   defaultDropoffDate.setDate(defaultPickupDate.getDate() + 4);
   const defaultDropoffTime = "12:00 am";

   const [rentalSearch, setRentalSearch] = useState<RentalServiceType>({
      type: 'same-destination',
      pickUp: null,
      dropOff: null,
      startDate: defaultPickupDate.getTime(),
      endDate: defaultDropoffDate.getTime(),
      startTime: defaultPickupTime,
      endTime: defaultDropoffTime
   });
   const handleBookingType = (value: RentalType) => {

      setRentalSearch((prevSearch) => ({
         ...prevSearch,
         type: value
      }));
   }
   const handleLocationInputChange = (location: Location | null, inputIdentifier: string) => {
      
      if(inputIdentifier == 'pickup'){

         setPickupError(null);
         setRentalSearch((prevSearch) => ({
            ...prevSearch,
            pickUp: location
         }));
      }
      if(inputIdentifier == 'dropoff'){

         setDropoffError(null);
         setRentalSearch((prevSearch) => ({
            ...prevSearch,
            dropOff: location
         }));
      }
   }
   const handleDateTimeChange = (selectedDate: Date | null, selectedTime: string, inputIdentifier: string) => {

      if(inputIdentifier == 'start-date-time'){

         setRentalSearch((prevSearch) => ({
            ...prevSearch,
            startDate: selectedDate ? selectedDate.getTime() : null,
            startTime: selectedTime
         }));
      }else if(inputIdentifier == 'end-date-time'){

         setRentalSearch((prevSearch) => ({
            ...prevSearch,
            endDate: selectedDate ? selectedDate.getTime() : null,
            endTime: selectedTime
         }));
      }      
   }
   const renderRadioBtn = () => {
      return (
         <div className=" py-5 [ nc-hero-field-padding ] flex items-center flex-wrap flex-row border-b border-neutral-100 dark:border-neutral-700">
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${rentalSearch.type === "same-destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`} onClick={(e) => handleBookingType("same-destination")}>
               Same drop off
            </div>
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${rentalSearch.type === "different-destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`} onClick={(e) => handleBookingType("different-destination")}>
               Different drop off
            </div>
         </div>
      );
   };

   const handleSearch = () => {

      let hasError = false;
      if(rentalSearch.pickUp == null){

         hasError = true
         setPickupError('Please provide pick up location');
      }
      if(rentalSearch.type == 'different-destination' && rentalSearch.dropOff == null){

         hasError = true
         setDropoffError('Please provide drop off location');
      }

      if(!hasError){
         const searchQuery = encodeIntoQuery({'rental' : rentalSearch} as SearchParams);
         redirectTo('/search-results?' + searchQuery as PathName);
      }
   }

   return (
      <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
         {renderRadioBtn()}
         <div className={`relative flex flex-row items-center`}>
            <LocationInput error={pickupError} onInputChange={(location) => handleLocationInputChange(location, "pickup")} locations={locations} placeHolder="City or Airport" desc="Pick up location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
            {rentalSearch.type == 'different-destination' && (
               <>
                  <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                  <LocationInput error={dropoffError} onInputChange={(location) => handleLocationInputChange(location, "dropoff")} locations={locations} placeHolder="City or Airport" desc="Pick up location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
               </>
            )}
            <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
            <DateTimeInput date={defaultPickupDate} time={defaultPickupTime} onDateTimeChange={(date, time) => handleDateTimeChange(date, time, "start-date-time")} placeHolder="Pickup date and time" className="flex-1" />
            <DateTimeInput date={defaultDropoffDate} time={defaultDropoffTime} onDateTimeChange={(date, time) => handleDateTimeChange(date, time, "end-date-time")} placeHolder="Dropoff date and time" className="flex-1" />
            <div className="pr-2 xl:pr-4">
               <IconButton onClick={handleSearch} />
            </div>
         </div>
      </form>
   );
};

export default RentalCarSearchForm;
