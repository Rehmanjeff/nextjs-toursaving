"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import DatesRangeInput from "../DatesRangeInput";
import ButtonSubmit from "../ButtonSubmit";
import TimeInput from "../TimeInput";

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("different");

  const renderRadioBtn = () => {
    return (
      <div className=" py-5 [ nc-hero-field-padding ] flex items-center flex-wrap flex-row border-b border-neutral-100 dark:border-neutral-700">
        <div
          className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
            dropOffLocationType === "different"
              ? "bg-black text-white shadow-black/10 shadow-lg"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => setDropOffLocationType("different")}
        >
          Different drop off
        </div>
        <div
          className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
            dropOffLocationType === "same"
              ? "bg-black text-white shadow-black/10 shadow-lg"
              : "border border-neutral-300 dark:border-neutral-700"
          }`}
          onClick={(e) => setDropOffLocationType("same")}
        >
          Same drop off
        </div>
      </div>
    );
  };

  const isDdropOffdifferent = dropOffLocationType === "different";

  return (
    <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
         {renderRadioBtn()}
         <div className={`relative flex flex-row items-center`}>
         <LocationInput placeHolder="City or Airport" desc="Pick up location" className="flex-1" />
         {isDdropOffdifferent && (
            <>
               <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
               <LocationInput placeHolder="City or Airport" desc="Drop off location" className="flex-1" divHideVerticalLineClass="-inset-x-0.5" />
            </>
         )}
         <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
         <DatesRangeInput className="flex-1" />
         <TimeInput className="flex-1" desc="Pick up time"/>
         <TimeInput className="flex-1" desc="Drop off time" />
         <div className="pr-2 xl:pr-4">
            <ButtonSubmit href="/search-results" />
         </div>
      </div>
    </form>
  );
};

export default RentalCarSearchForm;
