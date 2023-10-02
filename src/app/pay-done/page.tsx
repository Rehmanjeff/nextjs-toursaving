import StartRating from "@/components/StartRating";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faClock } from '@fortawesome/free-solid-svg-icons'
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Badge from "@/shared/Badge";
import { Passenger } from "@/data/types";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {

   const passengers : Passenger[] = [
      {
         name: 'Leslie Alexander',
         email: 'leslie.alexander@example.com',
         phoneNumber: {
            countryCode: '+973',
            number: '38881234'
         }
      },
      {
         name: 'Leslie Alexander',
         email: 'lesli.alexander@example.com',
         phoneNumber: {
            countryCode: '+973',
            number: '38881234'
         }
      },
      {
         name: 'Leslie Alexander',
         email: 'lesl.alexander@example.com',
         phoneNumber: {
            countryCode: '+973',
            number: '38881234'
         }
      }
   ]

   const renderCar = () => {
      return (
         <div className="listingSection__wrap !space-y-6">
            <div className="flex justify-between items-center">
               <Badge color="green" name="Standard" />
               <LikeSaveBtns />
            </div>

            <div className="flex flex-col-reverse gap-1 md:flex-row md:gap-0 items-start">
               <div className="flex flex-col gap-6">
                  <div>
                     <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Volkswagen Jetta, Skoda Octavia or similar</h2>
                  </div>
                  <div className="flex items-center space-x-4">
                     <span>
                        Supplier: 
                        <span className="ml-1"> Iway</span>
                     </span>
                     <span>·</span>
                     <StartRating />
                  </div>
               </div>
               <div className="flex items-center ml-auto">
                  <Image className="w-full" layout="fixed" width={300} height={150} src="https://iwayex.com/images/cars/ad3tyn1dag.png" alt="car image" />
               </div>
            </div>
            <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {passengers.map((passenger) => (
                  <div key={passenger.email} className="relative flex items-center space-x-3 rounded-lg border border-neutral-200 bg-white px-6 py-5 shadow-sm">
                     <div className="min-w-0 flex-1">
                        <div className="focus:outline-none">
                           <p className="text-sm font-medium text-gray-900">{passenger.name}</p>
                           <p className="truncate text-sm text-gray-500">{passenger.email}</p>
                           <p className="truncate text-sm text-gray-500">{passenger.phoneNumber.countryCode}{passenger.phoneNumber.number}</p>
                        </div>
                     </div>
                  </div>
                  ))}
               </div>
         </div>
      );
   };

   const renderSummary = () => {
      return (
         <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
               <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Pick up</span>
                  <div className="flex flex-col mt-1.5 text-md">
                     <span>Friday, March 1 - 12:00 am</span>
                     <span>Dubai International Airport</span>
                  </div>
               </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
               <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Destination</span>
                  <div className="flex flex-col mt-1.5 text-md">
                     <span>Friday, March 1 - 12:00 am</span>
                     <span>Dubai International Airport</span>
                  </div>
               </div>
            </div>
         </div>
      );
   };

   const renderHighlights = () => {
      return (
         <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Booking detail</h3>
            <div className="flex flex-col space-y-4">
               <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Booking number</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                     #BN-222-333-111
                  </span>
               </div>
               <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Total</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                     $199.00
                  </span>
               </div>
               <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment status</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                     <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20 w-fit">
                        Paid
                     </span>
                  </span>
               </div>
               <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment method</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                     Credit card
                  </span>
               </div>
            </div>
         </div>
      );
   }
   
   const renderContent = () => {
      return (
         <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold">
               Congratulation 🎉
            </h2>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="space-y-6">
               <h3 className="text-2xl font-semibold">Your booking</h3>
               {renderCar()}
               {renderSummary()}
            </div>

            {renderHighlights()}
         
            <div className="flex flex-row items-center justify-start !mt-16 space-x-2">
               <a download href="/public/pdf/IN-11760.pdf" className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                  Download Invoice
               </a>
               <div className="cursor-pointer py-2 px-3.5 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center ">
                  <span className="text-sm font-medium">Go to dashboard</span>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className={`nc-PayPage`}>
         <main className="container mt-11 mb-24 lg:mb-32 ">
            <div className="max-w-4xl mx-auto">
               {renderContent()}
            </div>
         </main>
      </div>
   );
};

export default PayPage;
