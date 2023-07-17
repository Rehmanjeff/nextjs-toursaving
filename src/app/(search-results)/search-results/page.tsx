"use client";

import React, { FC } from "react";
import SectionGridFilterCard from "@/app/(car-listings)/SectionGridFilterCard";
import HeroSearchFormSmall from "@/app/(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

export interface SearchResultssProps {}

const SearchResults: FC<SearchResultssProps> = () => {
  
   return (
      <div className={`nc-ListingCarMapPage relative mt-10`}>
         <div className="container ">
            <div className="hidden lg:block lg:pb-16">
               <HeroSearchFormSmall />
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
