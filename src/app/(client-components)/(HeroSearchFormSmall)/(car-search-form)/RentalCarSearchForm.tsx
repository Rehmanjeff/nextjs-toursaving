"use client";

import React, { FC, useState, useEffect } from "react";
import LocationInput from "../LocationInput";
import DateTimeInput from "../DateTimeInput";
import IconButton from "@/shared/IconButton";
import { RentalServiceType, RentalType, Location } from "@/app/(client-components)/type";
import { DEMO_LOCATIONS } from "@/data/locations";

export interface RentalCarSearchFormProps {
   userSearch : RentalServiceType
}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({
   userSearch
}) => {
   
   const [pickUpError, setPickUpError] = useState<string | null>(null);
   const [dropOffError, setDropOffError] = useState<string | null>(null);
   const locations : Location[] = DEMO_LOCATIONS;
   const [rentalSearch, setRentalSearch] = useState<RentalServiceType>(userSearch);

   useEffect(() => {
      
      setRentalSearch(userSearch);
   }, [userSearch]);
   const handleBookingType = (value: RentalType) => {

      setRentalSearch((prevSearch) => ({
         ...prevSearch,
         type: value
      }));
   }
   const handleDateTimeChange = (selectedDate: Date | null, selectedTime: string) => {

      setRentalSearch((prevSearch) => ({
         ...prevSearch,
         startDate: selectedDate ? selectedDate.getTime() : null,
         startTime: selectedTime
      }));
   }
   const handleSearch = () => {

      console.log('reload search params');
   }

   const renderRadioBtn = () => {
      return (
         <div className="pb-3 flex justify-start items-center space-x-3">
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${rentalSearch.type === "same-destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`} onClick={(e) => handleBookingType("same-destination")}>
               Same drop off
            </div>
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${rentalSearch.type === "different-destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`} onClick={(e) => handleBookingType("different-destination")}>
               Different drop off
            </div>
         </div>
      );
   };

   const renderForm = () => {
      return (
         <form className="w-full relative ">
            {renderRadioBtn()}
            <div className="flex flex-row items-center w-full rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
               <LocationInput location={rentalSearch.pickUp !== null ? rentalSearch.pickUp : null} locations={locations} placeHolder="City or Airport" desc="Pick up location" className="flex-1" />
               {rentalSearch.type === "different-destination" && (
                  <>
                  <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                  <LocationInput location={rentalSearch.dropOff !== null ? rentalSearch.dropOff : null} locations={locations} placeHolder="City or Airport" desc="Drop off location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5"/>
                  </>
               )}
               <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
               <DateTimeInput date={rentalSearch.startDate ? new Date(rentalSearch.startDate * 1) : null} time={rentalSearch.startTime} onDateTimeChange={handleDateTimeChange} placeHolder="Pickup date and time" className="flex-1" desc="Pick up time" />
               <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
               <DateTimeInput date={rentalSearch.endDate ? new Date(rentalSearch.endDate * 1) : null} time={rentalSearch.endTime} onDateTimeChange={handleDateTimeChange} placeHolder="Dropoff date and time" className="flex-1" desc="Drop off time" />
               <div className="pr-1">
                  <IconButton onClick={handleSearch} />
               </div>
            </div>
         </form>
      );
   };

   return renderForm();
};

export default RentalCarSearchForm;
