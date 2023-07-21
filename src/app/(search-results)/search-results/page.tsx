"use client";

import React, { FC, useEffect, useState } from "react";
import SectionGridFilterCard from "@/app/(car-listings)/SectionGridFilterCard";
import HeroSearchFormSmall from "@/app/(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import { UserSearchType } from "@/app/(client-components)/type";

export interface SearchResultssProps {}

const SearchResults: FC<SearchResultssProps> = () => {

   const [search, setSearch] = useState<UserSearchType>({
      
      type: 'chauffer',
      rental: {
         type: 'same-destination',
         pickUp: null,
         dropOff: null,
         startDate: null,
         endDate: null,
         startTime: '',
         endTime: ''
      },
      chauffer: {
         type: 'destination',
         pickUp: null,
         destination: null,
         hours: null,
         startDate: null,
         startTime: null
      }
   });

   useEffect(() => {

      const queryString = window.location.search.substring(1);
      const params = queryString.split('&').reduce((paramsObject:any, param) => {
      const [key, value] = param.split('=');
         paramsObject[key] = decodeURIComponent(value);
         return paramsObject;
      }, {});

      if(!('drive' in params)){

         console.log('search error');
      }else if(params['drive'] == 'chauffer'){

         if(!('type' in params) || (!('pick-up' in params) || !('pick-up-id' in params)) || ((!('destination' in params) || !('destination-id' in params)) && !('hours' in params)) || !('start-date' in params) || !('start-time' in params)) {

            console.log('chauffer search error');
         }
      }else if(params['drive'] == 'rental'){

         if(!('type' in params) || !('pick-up' in params) || !('drop-off' in params) || !('start-date' in params) || !('start-time' in params) || !('end-date' in params) || !('end-time' in params)) {

            console.log('rental search error');
         }
      }

      if(params['drive'] == 'chauffer'){

         setSearch((prevSearch) => ({
            ...prevSearch,
            type: 'chauffer',
            chauffer: {
               type: params['type'],
               pickUp: {id: params['pick-up-id'], name: params['pick-up']},
               destination: ('destination' in params) ? {id: params['destination-id'], name: params['destination']} : null,
               hours: ('hours' in params) ? params['hours'] : null,
               startDate: params['start-date'],
               startTime: params['start-time']
            }
         }));
      }else if(params['drive'] == 'rental'){

         setSearch((prevSearch) => ({
            ...prevSearch,
            type: 'rental',
            rental: {
               type: params['type'],
               pickUp: {id: params['pick-up-id'], name: params['pick-up']},
               dropOff: ('drop-off' in params) ? {id: params['drop-off-id'], name: params['drop-off']} : null,
               startDate: params['start-date'],
               startTime: params['start-time'],
               endDate: params['end-date'],
               endTime: params['end-time']
            }
         }));
      }
   }, [window.location.href]);

   return (
      <div className={`nc-ListingCarMapPage relative mt-10`}>
         <div className="container ">
            <div className="hidden lg:block lg:pb-16">
               <HeroSearchFormSmall search={search} />
            </div>
            <SectionGridFilterCard className="pb-24 lg:pb-28" />
         </div>
         <div className="container overflow-hidden">
         {/* SECTION 1 */}
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

         {/* SECTION */}
         <SectionSubscribe2 className="py-24 lg:py-28" />

         {/* SECTION */}
         <div className="relative py-16 mb-24 lg:mb-28">
            <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
         </div>
         </div>
      </div>
   );
};

export default SearchResults;
