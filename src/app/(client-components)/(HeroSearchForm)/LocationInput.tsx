"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import { Location } from "@/app/(client-components)/type";

export interface LocationInputProps {
   placeHolder?: string;
   desc?: string;
   className?: string;
   divHideVerticalLineClass?: string;
   autoFocus?: boolean;
   locations: Location[];
   location?: Location | null,
   onInputChange: (location: Location | null, inputIdentifier?: string) => void;
   inputIdentifier?: string;
   error?: string | null
}

const LocationInput: FC<LocationInputProps> = ({
   autoFocus = false,
   placeHolder = "Location",
   desc = "Where are you going?",
   className = "nc-flex-1.5",
   divHideVerticalLineClass = "left-10 -right-0.5",
   locations = [],
   location = null,
   onInputChange,
   inputIdentifier,
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
   }, [autoFocus]);

   useEffect(() => {
      if (eventClickOutsideDiv) {
         document.removeEventListener("click", eventClickOutsideDiv);
      }
      showPopover && document.addEventListener("click", eventClickOutsideDiv);
      return () => {
         document.removeEventListener("click", eventClickOutsideDiv);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [showPopover]);

   useEffect(() => {
      if (showPopover && inputRef.current) {
         inputRef.current.focus();
      }
   }, [showPopover]);

   const eventClickOutsideDiv = (event: MouseEvent) => {
      if (!containerRef.current) return;
      // CLICK IN_SIDE
      if (!showPopover || containerRef.current.contains(event.target as Node)) {
         return;
      }
      // CLICK OUT_SIDE
      setShowPopover(false);
   };

   const handleSelectLocation = (item: Location) => {
      setValue(item.name);
      setShowPopover(false);
      onInputChange(item, inputIdentifier);
   };

   const renderSearchValue = () => {
      return (
         <>
         {locations.map((item) => (
            <span onClick={() => handleSelectLocation(item)} key={item.id} className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
               <span className="block text-neutral-400">
                  <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
               </span>
               <span className="block font-medium text-neutral-700 dark:text-neutral-200">{item.name}</span>
            </span>
         ))}
         </>
      );
   };

   return (
      <div className={`relative flex ${className}`} ref={containerRef}>
         <div onClick={() => setShowPopover(true)} className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${showPopover ? "nc-hero-field-focused" : ""}`}>
            <div className="text-neutral-300 dark:text-neutral-400">
               <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-grow">
               <input className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`} placeholder={placeHolder} value={value} autoFocus={showPopover} onChange={(e) => { setValue(e.currentTarget.value); }} ref={inputRef} />
               <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                  {error !== null && <span className="text-theme-red font-medium">{error}</span>}
                  {error === null && <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>}
               </span>
               {value && showPopover && (<ClearDataButton onClick={resetValue} />)}
            </div>
         </div>

         {showPopover && (<div className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}></div>)}

         {showPopover && (
         <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
            {renderSearchValue()}
         </div>
         )}
      </div>
   );
};

export default LocationInput;
