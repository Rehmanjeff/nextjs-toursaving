"use client";

import { Tab } from "@headlessui/react";
import React, { FC, Fragment, useState, ChangeEvent, useEffect } from "react";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import { format } from 'date-fns';
import Image from "next/image";
import Select from "@/shared/Select";
import { PathName } from "@/routers/types";
import { CarDataType } from "@/data/types";
import { UserSearch } from "../(client-components)/type";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {

   const [countryCode, setCountryCode] = useState('+973');
   const [car, setCar] = useState<CarDataType|null>(null);
   const [search, setSearch] = useState<UserSearch | null>(null);

   useEffect(() => {

      const search = localStorage.getItem('tour-search');
      const car = localStorage.getItem('tour-checkout-vehicle');

      if(search){

         setSearch(JSON.parse(search) as UserSearch);
      }
      if(car){

         setCar(JSON.parse(car) as CarDataType);
      }
   },[]);

   const handleCountryCodeChange = (event: ChangeEvent<HTMLSelectElement>) => {

      setCountryCode(event.target.value)
   }

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                Hotel room in Tokyo, Jappan
              </span>
              <span className="text-base font-medium mt-1 block">
                The Lounge & Bar
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$57</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
         <h2 className="text-3xl lg:text-4xl font-semibold">
            Confirm and payment
         </h2>
         <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
         <div>
            <div>
               <h3 className="text-2xl font-semibold">Booking summary</h3>
            </div>
            {search && search.type && (<div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
               <button className="text-left flex-1 p-5 flex justify-between space-x-5" type="button">
                  <div className="flex flex-col">
                     <span className="text-sm text-neutral-400">Pick up</span>
                     <div className="flex flex-col mt-1.5 text-md">
                        <span>{format(parseInt(search[search.type]?.startDate?.toString() ?? '', 10), 'EEEE, MMMM d')} - {search[search.type]?.startTime}</span>
                        <span>{search[search.type]?.pickUp?.name}</span>
                     </div>
                  </div>
               </button>

               <button className="text-left flex-1 p-5 flex justify-between space-x-5" type="button">
                  <div className="flex flex-col">
                     <span className="text-sm text-neutral-400">
                        {search.type == 'chauffer' ? 'Duration' : 'Destination'}
                     </span>
                     <div className="flex flex-col mt-1.5 text-md">
                        {search.type == 'rental' && <span>{format(parseInt(search[search.type]?.endDate?.toString() ?? '', 10), 'EEEE, MMMM d')} . {search[search.type]?.endTime}</span>}
                        {search.type == 'transfer' && <span>{search[search.type]?.destination?.name}</span>}
                        {search.type == 'chauffer' && <span>{search[search.type]?.hours} Hours</span>}
                        {search.type == 'rental' && search[search.type]?.type == 'different-destination' && (<span>{search[search.type]?.dropOff?.name}</span>)}
                        {search.type == 'transfer' && (<span>{search[search.type]?.destination?.name}</span>)}
                     </div>
                  </div>
               </button>
            </div>)}
         </div>

         <div>
            <div>
               <h3 className="text-2xl font-semibold">Driver's Details</h3>
               <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
            </div>
            <div className="flex flex-col space-y-5">
               <div className="space-y-1">
                  <Label>Email address </Label>
                  <Input type="email" />
               </div>
               <div className="flex flex-row items-center space-y-1 gap-2">
                  <div className="flex-1">
                     <Label>First name </Label>
                     <Input type="text" />
                  </div>
                  <div className="flex-1">
                     <Label>Last name </Label>
                     <Input type="text" />
                  </div>
               </div>
               <div className="space-y-1">
                  <Label>Contact number </Label>
                  <div className="flex items-center gap-1 mt-2">
                     <Select onChange={handleCountryCodeChange} className="w-auto">
                        <option value="+973">Bahrain</option>
                        <option value="+971">UAE</option>
                        <option value="+966">Saudi Arabia</option>
                     </Select>
                     <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                           <span className="flex items-center justify-center px-2 h-11 border-r text-sm bg-transparent border-colo-neutral-200">
                              {countryCode}
                           </span>
                        </div>
                        <Input type="number" className="py-1.5 pl-16" />
                     </div>
                  </div>
               </div>
               <div className="flex space-x-5  ">
                  <div className="flex-1 space-y-1">
                     <Label>Country of residence</Label>
                     <Select className="w-full">
                        <option value="+973">Bahrain</option>
                        <option value="+971">UAE</option>
                        <option value="+966">Saudi Arabia</option>
                     </Select>
                  </div>
               </div>
               <div className="flex space-x-5  ">
                  <div className="flex-1 space-y-1">
                     <Label>Flight number (optional)</Label>
                     <Input type="text" placeholder="e.g. BH4234" />
                  </div>
               </div>
            </div>
         </div>

         <div>
            <h3 className="text-2xl font-semibold">Pay with</h3>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

            <div className="mt-6">
               <Tab.Group>
                  <Tab.List className="flex my-5 gap-1">
                     <Tab as={Fragment}>
                        {({ selected }) => (
                        <button
                           className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                              selected
                              ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                              : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                           }`}
                        >
                           <span className="mr-2.5">Credit card</span>
                           <Image className="w-8" src={visaPng} alt="visa" />
                           <Image className="w-8" src={mastercardPng} alt="mastercard" />
                        </button>
                        )}
                     </Tab>
                  </Tab.List>

                  <Tab.Panels>
                     <Tab.Panel className="space-y-5">
                        <div className="space-y-1">
                        <Label>Card number </Label>
                        <Input type="number" placeholder="111112222999" />
                        </div>
                        <div className="space-y-1">
                        <Label>Card holder </Label>
                        <Input placeholder="JOHN DOE" />
                        </div>
                        <div className="flex space-x-5  ">
                        <div className="flex-1 space-y-1">
                           <Label>Expiration month and year </Label>
                           <Input type="month" />
                        </div>
                        <div className="flex-1 space-y-1">
                           <Label>CVC </Label>
                           <Input type="number" placeholder="123" />
                        </div>
                        </div>
                     </Tab.Panel>
                  </Tab.Panels>
               </Tab.Group>
               <div className="pt-8">
                  <ButtonPrimary href={"pay-done" as PathName}>Confirm and pay</ButtonPrimary>
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
