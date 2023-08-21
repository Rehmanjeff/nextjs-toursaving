"use client";

import { Tab } from "@headlessui/react";
import React, { FC, Fragment, useState, ChangeEvent, useEffect } from "react";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { format } from 'date-fns';
import Image from "next/image";
import Select from "@/shared/Select";
import { PathName } from "@/routers/types";
import { BookedAdditionalService, CarDataType, Passenger, Trip } from "@/data/types";
import { UserSearch } from "../(client-components)/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { getCurrencySymbol } from "@/utils/currency";
import ChoosePassengers from "@/components/ChoosePassengers";
import ChooseChildSeats from "@/components/ChooseChildSeats";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {

   const schema = yup.object().shape({
      passengers: yup.array().of(
         yup.object().shape({
            name: yup.string().required('Name is required')
         })
      ),
   });

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = (data: any) => {
      console.log(data);
   };

   const supplier = 'iway';
   const [car, setCar] = useState<CarDataType|null>(null);
   const [search, setSearch] = useState<UserSearch | null>(null);
   const [bookedAdditionalServices, setBookedAdditionalServices] = useState<BookedAdditionalService[]>([]);
   const [countryOptions, setCountryOptions] = useState([
      { value: "+973", label: "Bahrain" },
      { value: "+971", label: "UAE" },
      { value: "+966", label: "Saudi Arabia" }
   ]);
   const passenger : Passenger = {
      name : '',
      phoneNumber: {
         countryCode: countryOptions[0].value,
         number: ''
      }
   }
   const [trip, setTrip] = useState<Trip>({
      passengers : [passenger],
      passengersNumber: 1,
      adultsNumber: 1,
      childrenNumber: 0,
      supplier: supplier,
      subTotal: 0,
      additionalServiceTotal: 0,
      grandTotal: 0
   });
   const childSeatServices = car?.additionalServices?.filter(
      (item) => item.category == 'baby_seat'
   );

   useEffect(() => {

      const search = localStorage.getItem('tour-search');
      const car = localStorage.getItem('tour-checkout-vehicle');

      if(search){
         setSearch(JSON.parse(search) as UserSearch);
      }

      if(car){
         setCar(JSON.parse(car) as CarDataType);
      }

      if(car && search){

         let subTotal = 0;
         if (supplier == 'iway') {
            const c = JSON.parse(car);
            subTotal = parseFloat(c.grandTotal);
         }

         const updatedTrip = {
            ...trip,
            subTotal: subTotal,
            grandTotal: subTotal,
         }
         setTrip(updatedTrip);
      }
   }, []);

   useEffect(() => {

      if(car && search){
         
         const servicesTotal = bookedAdditionalServices.reduce((total:number, service:any) => total + service.price * service.frequency, 0);
         const updatedTrip = {
            ...trip,
            additionalServiceTotal: servicesTotal,
            grandTotal: trip.subTotal + servicesTotal,
         }
         setTrip(updatedTrip);
      }

   }, [bookedAdditionalServices]);

   const handlePassengerChange = (index : number, value : string, type: string) => {

      const updatedTrip = { ...trip };
      const passengerToUpdate = updatedTrip.passengers[index];

      if (type == 'name') {
         passengerToUpdate.name = value;
      } else if (type == 'country_code') {
         passengerToUpdate.phoneNumber.countryCode = value;
      } else if (type == 'phone_number') {
         passengerToUpdate.phoneNumber.number = value.slice(0, 9);
      }

      setTrip(updatedTrip);
   }

   const handleTripPassengersChange = (adults: number, children: number) => {
      const totalPassengers = adults + children;
    
         if (totalPassengers > trip.passengers.length) {
         const newPassenger: Passenger = {
            name: '',
            phoneNumber: {
               countryCode: countryOptions[0].value,
               number: ''
            }
         }
         const updatedTrip = {
            ...trip,
            passengers: [...trip.passengers, newPassenger],
            passengersNumber: totalPassengers,
            adultsNumber: adults,
            childrenNumber: children
         }
         setTrip(updatedTrip);
      } else if (totalPassengers < trip.passengers.length) {
         const updatedTrip = {
            ...trip,
            passengers: trip.passengers.slice(0, totalPassengers),
            passengersNumber: totalPassengers,
            adultsNumber: adults,
            childrenNumber: children
         }
         setTrip(updatedTrip);
      }
   }

   const handleChildSeatsChange = (index: number, value: number) => {
      const selectedService = childSeatServices?.[index];
      if (selectedService) {
         const existingServiceIndex = bookedAdditionalServices.findIndex(service => service.id === selectedService.id);
         if (existingServiceIndex !== -1) {
            if (value === 0) {
               const updatedServices = [...bookedAdditionalServices];
               updatedServices.splice(existingServiceIndex, 1);
               setBookedAdditionalServices(updatedServices);
            } else {
               const updatedServices = [...bookedAdditionalServices];
               updatedServices[existingServiceIndex].frequency = value;
               setBookedAdditionalServices(updatedServices);
            }
         } else {
            setBookedAdditionalServices(prevServices => [...prevServices, { id: selectedService.id, category: selectedService.category, type: selectedService.type, frequency: value, price: selectedService.price }]);
         }
      }
   }

   const renderSidebar = () => {
      return (
         <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
         <div className="flex flex-col sm:flex-row">
            <div className="flex-shrink-0 w-full sm:w-40">
               <div className="rounded-2xl overflow-hidden">
                  {car && (<Image alt="car image" layout="fixed" width={300} height={150} src={car.featuredImage as string} />)}
               </div>
            </div>
            <div className="pb-5 sm:px-5 space-y-3">
               <div>
                  <span className="text-base font-medium mt-1 block">
                     {car?.shortDescription} or similar
                  </span>
               </div>
               <div className="flex items-center space-x-3 text-sm text-neutral-500 dark:text-neutral-400">
                  <FontAwesomeIcon icon={faCouch} className="text-neutral-500 dark:text-neutral-400" />
                  <span>{car?.seats} seats</span>
               </div>
            </div>
         </div>
         <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold">Price detail</h3>
            {car && car.priceBreakdown.length && car.priceBreakdown.map((item, index) => (
               <div key={index} className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                  <span>{item.name}</span>
                  <span>{getCurrencySymbol(car?.currency ? car?.currency : 'usd')}{item.price}</span>
               </div>
            ))}
            {trip?.additionalServiceTotal > 0 && (<div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
               <span>
                  Additional services
               </span>
               <span>
                  {getCurrencySymbol(car?.currency ? car?.currency : 'usd')}{trip?.additionalServiceTotal}
               </span>
            </div>)}
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex justify-between font-semibold">
               <span>Total</span>
               <span>{getCurrencySymbol(car?.currency ? car?.currency : 'usd')}{trip?.grandTotal}</span>
            </div>
         </div>
         </div>
      );
   };

   const renderBookingSummary = () => {
      return (
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
                     </div>
                  </div>
               </button>
            </div>)}
         </div>
      );
   }

   const renderChildSeats = () => {

      if (trip.childrenNumber > 0 && childSeatServices && childSeatServices.length) {
         return (
            <div className="mb-12">
               <ChooseChildSeats maxSeats={trip.childrenNumber} services={childSeatServices} handleChange={handleChildSeatsChange} />
            </div>
         );
      } else {
         return null;
      }
   }

   const renderPassengerDetails = () => {
      return (
         <div>
            <div>
               <h3 className="text-2xl font-semibold">Passengers' Details</h3>
               <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
            </div>
            <div className="mb-12 relative">
               {car && (<ChoosePassengers maxPassengers={car.seats} onChange={(adults, children) => handleTripPassengersChange(adults, children)} />)}
            </div>
            <div>
               { renderChildSeats() }
            </div>
            <div className="flex flex-col space-y-5">
            {trip.passengers.map((item, index) => (
               <div key={index} className="flex flex-col space-y-5">
                  <div className="space-y-1">
                     <Label>First and last name </Label>
                     <Input onChange={(event) => handlePassengerChange(index, event.target.value, 'name')} type="text" placeholder="David Burner" value={item.name} />
                  </div>
                  <div className="space-y-1">
                     <Label>Contact number </Label>
                     <div className="flex items-center gap-1 mt-2">
                        <Select onChange={(event) => handlePassengerChange(index, event.target.value, 'country_code')} className="w-auto">
                        {countryOptions.map((option) => (
                           <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                        </Select>
                        <div className="relative flex-1">
                           <div className="absolute inset-y-0 left-0 flex items-center">
                              <span className="flex items-center w-14 justify-center px-2 h-11 border-r text-sm bg-transparent border-colo-neutral-200">
                                 {item.phoneNumber.countryCode}
                              </span>
                           </div>
                           <Input onChange={(event) => handlePassengerChange(index, event.target.value, 'phone_number')} type="number" className="py-1.5 pl-16" value={item.phoneNumber.number} />
                        </div>
                     </div>
                  </div>
                  {errors.passengers && errors.passengers[index] && (
                     <>
                     {errors.passengers[index]?.name && (
                        <p>{errors.passengers[index]?.name?.message}</p>
                     )}
                     </>
                  )}
                  <div className="border-b border-dashed border-neutral-200 dark:border-neutral-700"></div>
               </div>
            ))}
            </div>
         </div>
      );
   }

   const renderPaymentDetails = () => {
      return (
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
                        <div className="flex space-x-5">
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
      );
   }

   const renderFlightDetails = () => {
      return (
         <div className="flex flex-col space-y-5">
            <div>
               <h3 className="text-2xl font-semibold">Flight Details</h3>
               <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
            </div>
            <div className="flex space-x-5">
               <div className="flex-1 space-y-1">
                  <Label>Flight number </Label>
                  <Input type="text" placeholder="BH9727" />
               </div>
               <div className="flex-1 space-y-1">
                  <Label>Arrival terminal </Label>
                  <Input placeholder="Terminal no 1" />
               </div>
            </div>
         </div>
      );
   }

   const renderMain = () => {
      return (
         <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold" onClick={handleSubmit(onSubmit)}>Confirm and payment</h2>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            {renderBookingSummary()}
            {search && search.chauffer?.pickUp?.isAirport && renderFlightDetails()}
            {((search && search.transfer?.pickUp?.isAirport) || (search && search.transfer?.destination?.isAirport)) && renderFlightDetails()}
            {renderPassengerDetails()}
            {renderPaymentDetails()}
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
