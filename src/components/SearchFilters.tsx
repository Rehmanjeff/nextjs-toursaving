import { Popover, Transition } from '@headlessui/react';
import React, { FC, Fragment, useState } from 'react'
import convertNumbThousand from "@/utils/convertNumbThousand";
import Slider from 'rc-slider';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonThird from '@/shared/ButtonThird';
import Checkbox from '@/shared/Checkbox';
import NcInputNumber from './NcInputNumber';

export interface SearchFiltersProps {}

const SearchFilters: FC<SearchFiltersProps> = () => {

   const [rangePrices, setRangePrices] = useState([0, 1000]);
   const allSuppliers = [
      { name: "Iway", rating: "4.8 (112 reviews)" }
   ];
   
   const renderXClear = () => {
      return (
        <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      );
   };

   const renderPriceRage = () => {
      return (
        <Popover className="relative">
          {({ open, close }) => (
            <>
               <Popover.Button className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}>
                     <span>
                        {`$${convertNumbThousand( rangePrices[0] )} - $${convertNumbThousand(rangePrices[1])}`}{" "}
                     </span>
                     {renderXClear()}
               </Popover.Button>
               <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1">
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                     <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                        <div className="relative flex flex-col px-5 py-6 space-y-8">
                           <div className="space-y-5">
                              <span className="font-medium">Price</span>
                              <Slider range className="text-red-400" min={0} max={2000} defaultValue={[rangePrices[0], rangePrices[1]]} allowCross={false} onChange={(e) => setRangePrices(e as number[])} />
                           </div>
      
                           <div className="flex justify-between space-x-5">
                              <div>
                                 <label htmlFor="minPrice" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Min price
                                 </label>
                                 <div className="mt-1 relative rounded-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                       <span className="text-neutral-500 sm:text-sm">$</span>
                                    </div>
                                    <input type="text" name="minPrice" disabled id="minPrice" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900" value={rangePrices[0]} />
                                 </div>
                              </div>
                              <div>
                              <label htmlFor="maxPrice" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                 Max price
                              </label>
                              <div className="mt-1 relative rounded-md">
                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">$</span>
                                 </div>
                                 <input type="text" disabled name="maxPrice" id="maxPrice" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900" value={rangePrices[1]} />
                              </div>
                              </div>
                           </div>
                        </div>
                        <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                           <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5"> Clear</ButtonThird>
                           <ButtonPrimary onClick={close} sizeClass="px-4 py-2 sm:px-5">Apply</ButtonPrimary>
                        </div>
                     </div>
                  </Popover.Panel>
               </Transition>
            </>
          )}
        </Popover>
      );
   };

   const renderCapacity = () => {
      return (
         <Popover className="relative">
            {({ open, close }) => (
               <>
                  <Popover.Button className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${ open ? "!border-primary-500 " : ""}`}>
                     <span>Capacity</span>
                     <i className="las la-angle-down ml-2"></i>
                  </Popover.Button>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-200"
                     enterFrom="opacity-0 translate-y-1"
                     enterTo="opacity-100 translate-y-0"
                     leave="transition ease-in duration-150"
                     leaveFrom="opacity-100 translate-y-0"
                     leaveTo="opacity-0 translate-y-1">
                     <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                        <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900   border border-neutral-200 dark:border-neutral-700">
                           <div className="relative flex flex-col px-5 py-6 space-y-5">
                              <NcInputNumber label="Seats" max={40} />
                              <NcInputNumber label="Bags" max={40} />
                           </div>
                           <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                              <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5"> Clear </ButtonThird>
                              <ButtonPrimary onClick={close} sizeClass="px-4 py-2 sm:px-5">Apply</ButtonPrimary>
                           </div>
                        </div>
                     </Popover.Panel>
                  </Transition>
               </>
            )}
         </Popover>
      );
   };

   const renderSuppliers = () => {
      return (
         <Popover className="relative">
            {({ open, close }) => (
               <>
                  <Popover.Button className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${open ? "!border-primary-500 " : ""}`}>
                     <span>Suppliers</span>
                     <i className="las la-angle-down ml-2"></i>
                  </Popover.Button>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-200"
                     enterFrom="opacity-0 translate-y-1"
                     enterTo="opacity-100 translate-y-0"
                     leave="transition ease-in duration-150"
                     leaveFrom="opacity-100 translate-y-0"
                     leaveTo="opacity-0 translate-y-1">
                     <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                        <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                           <div className="relative flex flex-col px-5 py-6 space-y-5">
                              {allSuppliers.map((item) => (
                                 <div key={item.name} className="">
                                    <Checkbox name={item.name} label={item.name} subLabel={item.rating} />
                                 </div>
                              ))}
                           </div>
                           <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                              <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">Clear</ButtonThird>
                              <ButtonPrimary onClick={close} sizeClass="px-4 py-2 sm:px-5">Apply</ButtonPrimary>
                           </div>
                        </div>
                     </Popover.Panel>
                  </Transition>
               </>
            )}
         </Popover>
      );
   };

   return (
      <div className="hidden lg:flex space-x-4">
         {renderSuppliers()}
         {renderCapacity()}
         {renderPriceRage()}
      </div>
   )
}

export default SearchFilters;
