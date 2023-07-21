"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";

export interface HoursInputProps {
   fieldClassName?: string;
   className?: string;
   placeholder?: string;
   desc: string,
   hours?: string;
   onHoursChange: (selectedHours: string) => void;
}

const hoursData = [ {title: '1 Hour' , display: '1 Hour (30KM / 20MI)'}, {title: '2 Hours' , display: '2 Hours (60KM / 40MI)'}, {title: '3 Hours' , display: '3 Hours (90KM / 60MI)'}, {title: '4 Hours' , display: '4 Hours (120KM / 80MI)'}, {title: '5 Hours' , display: '5 Hours (150KM / 100MI)'}, {title: '6 Hours' , display: '6 Hours (180KM / 120MI)'}, {title: '7 Hours' , display: '7 Hours (210KM / 140MI)'}, {title: '8 Hours' , display: '8 Hours (240KM / 160MI)'}, {title: '9 Hours' , display: '9 Hours (270KM / 180MI)'}, {title: '10 Hours' , display: '10 Hours (300KM / 200MI)'}];

const HoursInput: FC<HoursInputProps> = ({
   fieldClassName = "[ nc-hero-field-padding--small ]",
   className = "[ nc-flex-1 ]",
   placeholder = 'Hours',
   desc = '',
   hours = '',
   onHoursChange
}) => {
   const [inputValue, setInputValue] = useState("");

   useEffect(() => {
      
      if(hours){

         setInputValue(hours);
      }  
   }, [hours]);

   const handleChangeData = (value: string) => {

      setInputValue(value);
      onHoursChange(value);
   };

   const resetValue = () => {

      setInputValue(hours);
      onHoursChange(hours);
   };

   return (
      <Popover className={`flex relative ${className}`}>
         {({ open }) => (
            <>
               <div className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""}`}>
                  <Popover.Button className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}>
                     <div className="flex-grow text-left">
                        <span className="block xl:text-lg font-semibold">
                           {inputValue ? inputValue : placeholder}
                        </span>
                        <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                           {desc}
                        </span>
                        {inputValue && open && (
                           <ClearDataButton onClick={() => {setInputValue("")}} />
                        )}
                     </div>
                  </Popover.Button>
               </div>

               {open && ( <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>)}

               <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
               >
                  <div className="absolute right-0 z-40 w-full sm:min-w-[340px] max-h-[300px] overflow-y-auto max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 rounded-3xl shadow-xl">
                  {hoursData.map((item) => (
                     <div key={item.title} onClick={() => handleChangeData(item.title)} className="px-4 sm:px-8 cursor-pointer rounded-md py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 px-2">{item.display}</div>
                  ))}
                  </div>
               </Transition>
            </>
         )}
      </Popover>
   );
};

export default HoursInput;
