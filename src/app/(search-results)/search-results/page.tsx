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

   const cars : CarDataType[] = [
      {
        "id": "9824dd51-14bc-4a05-ba7d-1ca3c3c08bd7",
        "date": "May 20, 2021",
        "href": "/cars/123456789" as PathName,
        "title": "KONA Electric",
        "featuredImage": "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
        "galleryImgs": [
          "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
          "",
          "",
          ""
        ],
        "commentCount": 17,
        "viewCount": 97,
        "like": true,
        "address": "8953 Golf Course Terrace",
        "reviewStart": 5.0,
        "reviewCount": 126,
        "price": "$124",
        "gearshift": "Auto gearbox",
        "seats": 4,
        "saleOff": null,
        "isAds": null,
        "map": { "lat": 55.2094559, "lng": 61.5594641 }
      },
      {
        "id": "12a181b6-114c-45fa-a0cf-f4285bc7d952",
        "date": "May 20, 2021",
        "href": "/cars/123456789" as PathName,
        "title": "KONA Electric",
        "featuredImage": "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
        "galleryImgs": [
          "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1e10094/images/vfast/Hinh-anh-Thong-so-xe-VinFast-Fadil-cac-mau.png",
          "",
          "",
          ""
        ],
        "commentCount": 40,
        "viewCount": 902,
        "like": true,
        "address": "2606 Straubel Crossing",
        "reviewStart": 4.6,
        "reviewCount": 217,
        "price": "$382",
        "gearshift": "Auto gearbox",
        "seats": 4,
        "saleOff": null,
        "isAds": null,
        "map": { "lat": 55.1972153, "lng": 61.4407266 }
      }
   ];

   const [ isLoading, setIsLoading ] = useState<boolean>(false);
   const [search, setSearch] = useState<UserSearch>({'type': null});
   const pathname = usePathname()
   const searchParams = useSearchParams()
   useEffect(() => {
      
      const queryString = window.location.search.substring(1);
      const response : UserSearch | string = decodeFromQuery(queryString);
      
      if(typeof(response) == 'string'){

         console.log(response);
      }else{

         setSearch(() => (response));
         console.log(JSON.stringify(response));
      }

      setIsLoading(true);
      setTimeout(() => {
         
         setIsLoading(false);
      }, 3000);

   }, [pathname, searchParams])

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
