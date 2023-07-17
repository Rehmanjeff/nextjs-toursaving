"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import DateInput from "../DateInput";
import ButtonSubmit from "../ButtonSubmit";
import TimeInput from "../TimeInput";
import HoursInput from "../HoursInput";

export interface ChaufferSearchFormProps {}

const ChaufferSearchForm: FC<ChaufferSearchFormProps> = ({}) => {
  const [bookingType, setBookingType] = useState<"hours" | "destination">("destination");

  const renderRadioBtn = () => {
    return (
      <div className=" py-5 [ nc-hero-field-padding ] flex items-center flex-wrap flex-row border-b border-neutral-100 dark:border-neutral-700">
        <div onClick={(e) => setBookingType("destination")} className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${bookingType === "destination" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`}>
          Book by destination
        </div>
        <div onClick={(e) => setBookingType("hours")} className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${bookingType === "hours" ? "bg-black text-white shadow-black/10 shadow-lg" : "border border-neutral-300 dark:border-neutral-700" }`}>
          Book by hours
        </div>
      </div>
    );
  };

  return (
    <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      {renderRadioBtn()}
      <div className={`relative flex flex-row items-center`}>
         <LocationInput placeHolder="City or Airport" desc="Pick up location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
         {bookingType == 'destination' && <LocationInput placeHolder="City or Airport" desc="Drop off location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />}
         {bookingType == 'hours' && <HoursInput desc="Booking hours" className="flex-1" />}
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

export default ChaufferSearchForm;
