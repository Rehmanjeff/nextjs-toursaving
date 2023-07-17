"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import DateInput from "../DateInput";
import HoursInput from "../HoursInput";
import TimeInput from "../TimeInput";
import ButtonSubmit from "../ButtonSubmit";

export interface ChaufferSearchFormProps {}

const ChaufferSearchForm: FC<ChaufferSearchFormProps> = ({}) => {
   const [bookingType, setBookingType] = useState<"hours" | "destination">("destination");

   const renderRadioBtn = () => {
      return (
         <div className="pb-3 flex justify-start items-center space-x-3">
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${bookingType === "destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700"}`} onClick={(e) => setBookingType("destination")}>
               Book by destination
            </div>
            <div className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer ${bookingType === "hours" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700"}`} onClick={(e) => setBookingType("hours")}>
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
                  <LocationInput
                     placeHolder="City or Airport"
                     desc="Pick up location"
                     className="flex-1"
                  />
                  {bookingType === "destination" && (
                     <>
                     <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                     <LocationInput placeHolder="City or Airport" desc="Drop off location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
                     </>
                  )}
                  {bookingType === "hours" && (
                     <>
                     <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                     <HoursInput desc="Booking hours" className="flex-1" />
                     </>
                  )}
                  <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                  <DateInput className="flex-1" />
                  <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                  <TimeInput className="flex-1" desc="Pick up time" />
                  <div className="pr-2 xl:pr-4">
                     <ButtonSubmit href="/search-results" />
                  </div>
            </div>
         </form>
      );
   };

  return renderForm();
};

export default ChaufferSearchForm;
