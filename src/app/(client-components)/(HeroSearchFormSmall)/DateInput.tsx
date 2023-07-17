"use client";

import React, { Fragment, useState, FC } from "react";
import DatePicker from "react-datepicker";
import { Popover, Transition } from "@headlessui/react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "./ClearDataButton";

export interface DateInputProps {
  className?: string;
  fieldClassName?: string;
}

const DateInput: FC<DateInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding--small ]",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/03/01")
  );

  const onChangeDate = (dates: [Date | null]) => {
    const [start] = dates;
    setStartDate(start);
  };

  const renderInput = () => {
    return (
      <>
        <div className="flex-grow text-left">
          <span className="block xl:text-base font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            Pick up date
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <Popover
        className={`RentalCarDatesRangeInput relative flex ${className}`}
      >
        {({ open }) => (
          <>
            <div
              className={`flex-1 z-10 flex items-center focus:outline-none ${
                open ? "nc-hero-field-focused--2" : ""
              }`}
            >
              <Popover.Button
                className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none `}
              >
                {renderInput()}

                {startDate && open && (
                  <ClearDataButton onClick={() => onChangeDate([null])} />
                )}
              </Popover.Button>

            </div>

            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
            )}

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
                     onChange={(date) => setStartDate(date)}
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
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default DateInput;
