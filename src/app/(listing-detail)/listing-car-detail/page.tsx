"use client";

import React, { FC, useState } from "react";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { Amenities_demos, includes_demo } from "./constant";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import HeroSearchFormSmall from "@/app/(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall";

export interface ListingCarDetailPageProps {}

const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({}) => {
  
   const [editSearch, setEditSearch] = useState<boolean>(false);
   
   const toggleEditSearch = () => {

      setEditSearch(!editSearch);
   }

   const renderSection1 = () => {
      return (
         <div className="listingSection__wrap !space-y-6">
            {/* 1 */}
            <div className="flex justify-between items-center">
               <Badge color="pink" name="BMW car" />
               <LikeSaveBtns />
            </div>

            <div className="flex flex-col-reverse gap-1 md:flex-row md:gap-0 items-start">
               <div className="flex flex-col gap-6">
                     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">BMW 3 Series Sedan</h2>

                     <div className="flex items-center space-x-4">
                     <StartRating />
                     <span>·</span>
                     <span>
                        <i className="las la-map-marker-alt"></i>
                        <span className="ml-1"> Tokyo, Jappan</span>
                     </span>
                     </div>

                     <div className="flex items-center">
                     <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
                     <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                        Car owner{" "}
                        <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                           Kevin Francis
                        </span>
                     </span>
                     </div>
               </div>
               <div className="flex">
                  <Image className="rounded-md sm:rounded-xl" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="photo 1" width="400" height="300" />
               </div>
            </div>

            <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

            <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
               <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                  <i className="las la-user-friends text-2xl"></i>
                  <span className="">4 seats</span>
               </div>
               <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                  <i className="las la-dharmachakra text-2xl"></i>
                  <span className=""> Auto gearbox</span>
               </div>
               <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
                  <i className="las la-suitcase text-2xl"></i>
                  <span className=""> 2 bags</span>
               </div>
            </div>
         </div>
      );
   };

   const renderSectionTienIch = () => {
      return (
         <div className="listingSection__wrap">
            <div>
               <h2 className="text-2xl font-semibold">
                  Vehicle parameters & utilities{" "}
               </h2>
               <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  Questions are at the heart of making things great.
               </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/* 6 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
               {/* TIEN ICH 1 */}
               {Amenities_demos.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 ">
                  <div className="w-10 flex-shrink-0">
                     <Image src={item.icon} alt="" />
                  </div>
                  <span>{item.name}</span>
                  </div>
               ))}
            </div>
         </div>
      );
   };

   const renderSection3 = () => {
      return (
         <div className="listingSection__wrap">
            <div>
               <h2 className="text-2xl font-semibold">Include </h2>
               <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  Included in the price
               </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/* 6 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
               {includes_demo
                  .filter((_, i) => i < 12)
                  .map((item) => (
                  <div key={item.name} className="flex items-center space-x-3">
                     <i className="las la-check-circle text-2xl"></i>
                     <span>{item.name}</span>
                  </div>
                  ))}
            </div>
         </div>
      );
   };

   const renderSection6 = () => {
      return (
         <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>

            <div className="flex flex-row items-center gap-x-4">
               <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
               <div className="mt-1">(4/5)</div>
            </div>
         </div>
      );
   };

   const renderSection8 = () => {
      return (
         <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">Extras</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="text-neutral-6000 dark:text-neutral-300">
               <p>Child seats, additional drivers and more.</p>
            </div>
         </div>
      );
   };

   const renderSidebarPrice = () => {
      return (
         <div className="listingSectionSidebar__wrap shadow-xl">
            {/* PRICE */}
            <div className="flex justify-between">
                  <span className="text-3xl font-semibold">
                     $19 <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/day
                     </span>
                  </span>
                  <StartRating />
            </div>

            {/* SUM */}
            <div className="flex flex-col space-y-4 ">
                  <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                     <span>$19 x 3 day</span>
                     <span>$57</span>
                  </div>

                  <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                  <div className="flex justify-between font-semibold">
                     <span>Total</span>
                     <span>$199</span>
                  </div>
            </div>

         <ButtonPrimary href="/checkout">Reserve</ButtonPrimary>
         </div>
      );
   };

   const renderSidebarDetail = () => {
      return (
         <div className="listingSection__wrap lg:shadow-xl">
            <div className="flex flex-row items-center">
               <span className="text-2xl font-semibold block">
                  Pick up and drop off
               </span>
               <ButtonCircle onClick={toggleEditSearch} type="button" className="ml-auto" size="w-10 h-10">
                  <i className="las la-edit text-xl"></i>
               </ButtonCircle>
            </div>
            <div className="mt-8 flex">
               <div className="flex-shrink-0 flex flex-col items-center py-2">
                  <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
                  <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
                  <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
               </div>
               <div className="ml-4 space-y-14 text-sm">
                  <div className="flex flex-col space-y-2">
                  <span className=" text-neutral-500 dark:text-neutral-400">
                     Monday, August 12 · 10:00
                  </span>
                  <span className=" font-semibold">
                     Saint Petersburg City Center
                  </span>
                  </div>
                  <div className="flex flex-col space-y-2">
                  <span className=" text-neutral-500 dark:text-neutral-400">
                     Monday, August 16 · 10:00
                  </span>
                  <span className=" font-semibold">
                     Saint Petersburg City Center
                  </span>
                  </div>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className={` nc-ListingCarDetailPage `}>
         <div className="hidden lg:block mt-10">
            {editSearch && (<HeroSearchFormSmall />)}
         </div>
         <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
               {renderSection1()}
               <div className="block lg:hidden">{renderSidebarDetail()}</div>
               {renderSectionTienIch()}
               {renderSection3()}
               {renderSection6()}
               {renderSection8()}
            </div>

            <div className="block flex-grow mt-14 lg:mt-0">
               {renderSidebarDetail()}
               <div className="hidden lg:block mt-10 sticky top-28">
                  {renderSidebarPrice()}
               </div>
            </div>
         </main>
      </div>
   );
};

export default ListingCarDetailPage;
