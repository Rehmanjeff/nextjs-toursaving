"use client";

import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "./ClearDataButton";
import { useRef } from "react";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Location } from "@/app/(client-components)/type";

export interface LocationInputProps {
   placeHolder?: string;
   desc?: string;
   locations: Location[];
   className?: string;
   divHideVerticalLineClass?: string;
   autoFocus?: boolean;
   location?: Location | null,
   onInputChange: (location: Location | null, inputIdentifier?: string) => void;
   inputIdentifier?: string;
   error?: string | null
}

const LocationInput: FC<LocationInputProps> = ({
   autoFocus = false,
   placeHolder = "Location",
   locations = [],
   desc = "Where are you going?",
   className = "nc-flex-1.5",
   location = null,
   onInputChange,
   inputIdentifier,
   divHideVerticalLineClass = "left-10 -right-0.5",
   error = null
}) => {

   const containerRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const [value, setValue] = useState(location ? location.name : '');
   const [showPopover, setShowPopover] = useState(autoFocus);

   const resetValue = () => {

      setValue('');
      onInputChange(null, inputIdentifier);
   };

   useEffect(() => {
      setShowPopover(autoFocus);
      if (autoFocus && !!inputRef.current) {
         setTimeout(() => {
         inputRef.current && inputRef.current.focus();
         }, 200);
      }
   }, [autoFocus]);

   useEffect(() => {
      
      if(location){

         setValue(location.name);
      }  
   }, [location]);

   useOutsideAlerter(containerRef, () => {
      setShowPopover(false);
   });

   useEffect(() => {
      if (showPopover && inputRef.current) {
         inputRef.current.focus();
      }
   }, [showPopover]);

   const handleSelectLocation = (item: Location) => {
      setValue(item.name);
      setShowPopover(false);
      onInputChange(item, inputIdentifier);
   };

   const renderSearchValue = () => {
      return (
         <>
         {locations.map((item) => (
            <span onClick={() => handleSelectLocation(item)} key={item.id}className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
               <span className="block text-neutral-400">
                  <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
               </span>
               <span className="block text-neutral-700 dark:text-neutral-200">
                  {item.name}
               </span>
            </span>
         ))}
         </>
      );
   };

   return (
      <div className={`relative flex ${className}`} ref={containerRef}>
         <div onClick={() => setShowPopover(true)} className={`flex flex-1 relative z-10 [ nc-hero-field-padding--small ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${showPopover ? "nc-hero-field-focused--2" : ""}`}>
            <div className="flex-1">
               <input className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-400 xl:text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`} placeholder={placeHolder} value={value} autoFocus={showPopover} onChange={(e) => setValue(e.currentTarget.value)} ref={inputRef} />
               <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                  {error !== null && <span className="text-theme-red font-medium">{error}</span>}
                  {error === null && <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>}
               </span>
               {value && showPopover && (<ClearDataButton onClick={() => setValue("")} />)}
            </div>
         </div>

         {showPopover && (<div className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}></div>)}
         {showPopover && (
         <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[400px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-5 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
            {renderSearchValue()}
         </div>
         )}
      </div>
   );
};

export default LocationInput;
