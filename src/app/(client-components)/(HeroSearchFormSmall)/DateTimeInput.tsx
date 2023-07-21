"use client";

import React, { Fragment, useState, FC, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Popover, Transition } from "@headlessui/react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "./ClearDataButton";
import TimePicker from '@/shared/TimePicker';
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface DateTimeInputProps {
   className?: string;
   fieldClassName?: string;
   placeHolder?: string;
   date: Date | null;
   time: string;
   onDateTimeChange: (selectedDate: Date | null, selectedTime: string) => void;
}

const DateTimeInput: FC<DateTimeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding--small ]",
  placeHolder = "Date and time",
  date,
  time,
  onDateTimeChange
}) => {

   const [startDate, setStartDate] = useState<Date | null>(date);
   const [selectedTime, setSelectedTime] = useState(time);

   useEffect(() => {

      setStartDate(date);
      setSelectedTime(time);
   }, [date, time]);

   const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      onDateTimeChange(startDate, time);
   };

   const resetValue = () => {
      setStartDate(date);
      setSelectedTime(time);
      onDateTimeChange(startDate, time);
   };

   const popoverRef = useRef<HTMLButtonElement>(null);

   const onChangeDate = (dates: [Date | null]) => {
      const [start] = dates;
      setStartDate(start);
      onDateTimeChange(start, selectedTime);
   };

   const handleSubmitButton = () => {

      if (popoverRef.current && popoverRef.current instanceof HTMLButtonElement) {console.log(1)
         popoverRef.current.click();
      }
   }

   const renderInput = () => {
      return (
         <>
         <div className="flex-grow text-left">
            <span className="block xl:text-base font-semibold">
               {startDate?.toLocaleDateString("en-US", {month: "short", day: "2-digit"}) || "Choose date"} - {selectedTime ? selectedTime : ''}
            </span>
            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
               {placeHolder}
            </span>
         </div>
         </>
      );
   };

   return (
      <>
         <Popover className={`RentalCarDatesRangeInput relative flex ${className}`}>
         {({ open }) => (
            <>
               <div className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused--2" : "" }`}>
                  <Popover.Button ref={popoverRef} className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none `}>
                     {renderInput()}
                     {startDate && open && (<ClearDataButton onClick={resetValue} />)}
                  </Popover.Button>
               </div>

               {open && (<div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>)}

               <Transition
               as={Fragment}
               enter="transition ease-out duration-200"
               enterFrom="opacity-0 translate-y-1"
               enterTo="opacity-100 translate-y-0"
               leave="transition ease-in duration-150"
               leaveFrom="opacity-100 translate-y-0"
               leaveTo="opacity-0 translate-y-1"
               >
               <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen z-40 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                     <DatePicker
                        selected={startDate}
                        onChange={(date) => onChangeDate([date])}
                        monthsShown={2}
                        showPopperArrow={false}
                        inline
                        renderCustomHeader={(p) => (
                           <DatePickerCustomHeaderTwoMonth {...p} />
                        )}
                        renderDayContents={(day, date) => (
                           <DatePickerCustomDay dayOfMonth={day} date={date} />
                        )}
                     />
                     <div className="flex flex-col">
                        <div className="flex flex-col mt-5">
                           <h2 className="text-sm lg:text-base font-medium my-5">Choose Time</h2>
                           <TimePicker time={selectedTime} onTimeSelect={handleTimeSelect} />
                        </div>
                        <div className="ml-auto mt-5">
                           <ButtonPrimary type="button" onClick={handleSubmitButton}>Done</ButtonPrimary>
                        </div>
                     </div>
                  </div>
               </Popover.Panel>
               </Transition>
            </>
         )}
         </Popover>
      </>
   );
};

export default DateTimeInput;
