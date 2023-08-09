"use client";

import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "@/app/(car-listings)/SectionGridFilterCard";
import HeroSearchFormSmall from "@/app/(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { UserSearch } from "@/app/(client-components)/type";
import { decodeFromQuery } from "@/utils/userSearch";
import {usePathname, useSearchParams} from 'next/navigation';
import { CarDataType } from "@/data/types";
import SearchEmpty from "@/shared/SearchEmpty";
import SearchLoading from "@/shared/SearchLoading";

export interface SearchResultssProps {}

const SearchResults: FC<SearchResultssProps> = () => {

   const [ cars, setCars ] = useState<CarDataType[]>([]);
   const [ isLoading, setIsLoading ] = useState<boolean>(true);
   const [search, setSearch] = useState<UserSearch>({'type': null, timestamp: new Date().getTime()});
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {

      const queryString = window.location.search.substring(1);
      const response : UserSearch | string = decodeFromQuery(queryString);
      
      if(typeof(response) == 'string'){

         console.log(response);
      }else{

         setIsLoading(true);
         setSearch(() => (response));
         fetch('/api/search/iway', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
               'data': response,
               'lang': 'en',
               'currency': 'USD'
            })})
            .then((response) => response.json())
            .then((data) => {
               
               setIsLoading(false);
               setCars(data.response);
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
            {cars && cars.length > 0 && (<SectionGridFilterCard data={cars} className="pb-24 lg:pb-28" />)}
            {(!cars || cars.length == 0) && !isLoading && (<SearchEmpty />)}
            {cars && cars.length == 0 && isLoading && (<SearchLoading />)}
         </div>
         <div className="container overflow-hidden">
            <SectionSubscribe2 className="py-24 lg:py-28" />
         </div>
      </div>
   );
};

export default SearchResults;
