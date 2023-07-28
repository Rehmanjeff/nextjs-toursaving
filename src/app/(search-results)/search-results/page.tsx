"use client";

import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "@/app/(car-listings)/SectionGridFilterCard";
import HeroSearchFormSmall from "@/app/(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { UserSearch } from "@/app/(client-components)/type";
import { decodeFromQuery } from "@/utils/userSearch";
import {usePathname, useSearchParams} from 'next/navigation';
import Image from "next/image";
import { CarDataType } from "@/data/types";
import { PathName } from "@/routers/types";

export interface SearchResultssProps {}

const SearchResults: FC<SearchResultssProps> = () => {

   const [ cars, setCars ] = useState<CarDataType[]>([]);
   const [ isLoading, setIsLoading ] = useState<boolean>(true);
   const [search, setSearch] = useState<UserSearch>({'type': null});
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {

      const queryString = window.location.search.substring(1);
      const response : UserSearch | string = decodeFromQuery(queryString);
      
      if(typeof(response) == 'string'){

         console.log(response);
      }else{

         setSearch(() => (response));
         fetch('/api/search', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
               'data': response,
               'lang': 'en',
               'currency': 'USD'
            })})
            .then((response) => response.json())
            .then((data) => {
               console.log(data.response.result)
               let carsResult : CarDataType[] = [];
               data.response.result.forEach((car:any) => {
                  carsResult.push({
                     id: car.price_uid, 
                     href: '/car/123456789' as PathName,
                     title: car.car_class.title,
                     shortDescription: car.car_class.models.length ? car.car_class.models.map((name : string) => name) : '',
                     featuredImage: process.env.NEXT_PUBLIC_IWAY_CAR_PHOTO_URI + "/" + car.car_class.photo,
                     price: car.price,
                     seats: parseInt(car.car_class.capacity)
                  });
               });
               setIsLoading(false);
               setCars(carsResult);
            })
            .catch((error) => {
               console.error('Error fetching data:', error);
               setIsLoading(false);
            });
      }
   }, [pathname, searchParams]);

   return (
      <div className={`nc-ListingCarMapPage relative mt-10`}>
         <div className="container">
            <div className="hidden lg:block lg:pb-16">
               <HeroSearchFormSmall search={search} />
            </div>
            {isLoading && (<><Image className="mx-auto my-16" src="/loading.gif" alt="car" width={150} height={150} /></>)}
            {!isLoading && (<SectionGridFilterCard data={cars} className="pb-24 lg:pb-28" />)}
         </div>
         <div className="container overflow-hidden">
            <div className="relative py-16">
               <BackgroundSection />
               <SectionSliderNewCategories
                  heading="Explore by types of stays"
                  subHeading="Explore houses based on 10 types of stays"
                  categoryCardType="card5"
                  itemPerRow={5}
                  sliderStyle="style2"
               />
            </div>

            <SectionSubscribe2 className="py-24 lg:py-28" />

            <div className="relative py-16 mb-24 lg:mb-28">
               <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
            </div>
         </div>
      </div>
   );
};

export default SearchResults;
