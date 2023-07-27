"use client";

import CarCard from "@/components/CarCard";
import React, { useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { CarDataType } from "@/data/types";
import { PathName } from "@/routers/types";

const AccountSavelists = () => {
  
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

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Saved cars</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {cars.filter((_, i) => i < 8).map((stay) => (
                  <CarCard key={stay.id} car={stay} />
               ))}
            </div>
            <div className="flex mt-11 justify-center items-center">
               <ButtonSecondary>Show me more</ButtonSecondary>
            </div>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
