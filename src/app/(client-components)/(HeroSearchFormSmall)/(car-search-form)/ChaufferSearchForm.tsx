"use client";

import React, { FC, useState, useEffect } from "react";
import LocationInput from "../LocationInput";
import HoursInput from "../HoursInput";
import DateTimeInput from "../DateTimeInput";
import IconButton from "@/shared/IconButton";
import { ChaufferServiceType, ChaufferType, Location, SearchParams } from "@/app/(client-components)/type";
import { DEMO_LOCATIONS } from "@/data/locations";
import { encodeIntoQuery } from "@/utils/userSearch";
import { PathName } from "@/routers/types";
import useNextRouter from "@/hooks/useNextRouter";

export interface ChaufferSearchFormProps {
   userSearch : ChaufferServiceType
}

const ChaufferSearchForm: FC<ChaufferSearchFormProps> = ({
   userSearch
}) => {

   const [pickUpError, setPickUpError] = useState<string | null>(null);
   const [destinationError, setDestinationError] = useState<string | null>(null);
   const locations : Location[] = DEMO_LOCATIONS;
   const [chaufferSearch, setChaufferSearch] = useState<ChaufferServiceType>(userSearch);
   const { redirectTo } = useNextRouter();
   
   useEffect(() => {
      
      setChaufferSearch(userSearch);
   }, [userSearch]);
   const handleBookingType = (value: ChaufferType) => {

      setChaufferSearch((prevSearch) => ({
         ...prevSearch,
         type: value,
         destination: value == 'hours' ? null : prevSearch.destination
      }));
   }
   const handleHoursChange = (selectedHours: string) => {

      setChaufferSearch((prevSearch) => ({
         ...prevSearch,
         hours: parseInt(selectedHours)
      }));
   }
   const handleDateTimeChange = (selectedDate: Date | null, selectedTime: string) => {

      setChaufferSearch((prevSearch) => ({
         ...prevSearch,
         startDate: selectedDate ? selectedDate.getTime() : null,
         startTime: selectedTime
      }));
   }
   const handleLocationInputChange = (location: Location | null, inputIdentifier: string) => {
      if(inputIdentifier == 'pickUp'){

         setPickUpError(null);
         setChaufferSearch((prevSearch) => ({
            ...prevSearch,
            pickUp: location
         }));
      }
      if(inputIdentifier == 'destination'){

         setDestinationError(null);
         setChaufferSearch((prevSearch) => ({
            ...prevSearch,
            destination: location
         }));
      }
   }
   const handleSearch = () => {

      let hasError = false;
      if(chaufferSearch.pickUp == null){

         hasError = true
         setPickUpError('Please provide pick up location');
      }
      if(chaufferSearch.type == 'destination' && chaufferSearch.destination == null){

         hasError = true
         setDestinationError('Please provide destination location');
      }

      if(!hasError){

         const searchQuery = encodeIntoQuery({'chauffer' : chaufferSearch} as SearchParams);
         redirectTo('/search-results?' + searchQuery as PathName);
      }
   }

   const renderRadioBtn = () => {
      return (
         <div className="pb-3 flex justify-start items-center space-x-3">
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${chaufferSearch.type === "destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700"}`} onClick={(e) => handleBookingType("destination")}>
               Book by destination
            </div>
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${chaufferSearch.type === "hours" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700"}`} onClick={(e) => handleBookingType("hours")}>
               Book by hours
            </div>
         </div>
      );
   };

   const renderForm = () => {
      return (
         <form className="w-full relative ">
            {renderRadioBtn()}
            <div className="flex flex-row items-center w-full rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                  <LocationInput error={pickUpError} onInputChange={(location) => handleLocationInputChange(location, "pickUp")} location={chaufferSearch.pickUp !== null ? chaufferSearch.pickUp : null} locations={locations} placeHolder="City or Airport" desc="Pick up location" className="flex-1" />
                  {chaufferSearch.type === "destination" && (
                     <>
                     <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                     <LocationInput error={destinationError} onInputChange={(location) => handleLocationInputChange(location, "destination")} location={chaufferSearch.destination !== null ? chaufferSearch.destination : null} locations={locations} placeHolder="City or Airport" desc="Drop off location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
                     </>
                  )}
                  {chaufferSearch.type === "hours" && (
                     <>
                     <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                     <HoursInput onHoursChange={handleHoursChange} hours={chaufferSearch.hours?.toString()} desc="Booking hours" className="flex-1" />
                     </>
                  )}
                  <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                  <DateTimeInput date={chaufferSearch.startDate ? new Date(chaufferSearch.startDate * 1) : null} time={chaufferSearch.startTime ? chaufferSearch.startTime : ''} onDateTimeChange={handleDateTimeChange} placeHolder="Pickup date and time" className="flex-1" />
                  <div className="pr-1">
                     <IconButton onClick={handleSearch} />
                  </div>
            </div>
         </form>
      );
   };

  return renderForm();
};

export default ChaufferSearchForm;

