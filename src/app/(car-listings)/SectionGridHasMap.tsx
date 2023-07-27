"use client";

import React, { FC, useState } from "react";
import GoogleMapReact from "google-map-react";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import CarCardH from "@/components/CarCardH";
import AnyReactComponent from "@/components/AnyReactComponent/AnyReactComponent";
import { CarDataType } from "@/data/types";
import { PathName } from "@/routers/types";

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
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

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          <Heading2
            heading="Cars in Tokyo"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                233 cars
                <span className="mx-2">·</span>
                Aug 12 - 18
              </span>
            }
          />
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {cars.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <CarCardH car={item} />
              </div>
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
        </div>

        <div
          className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
          onClick={() => setShowFullMapFixed(true)}
        >
          <i className="text-lg las la-map"></i>
          <span>Show map</span>
        </div>

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm text-neutral-800"
                name="xx"
                label="Search ass I move the map"
              />
            </div>
            {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}

            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ? process.env.NEXT_PUBLIC_GOOGLE_API_KEY : '',
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={12}
              defaultCenter={cars[0].map}
            >
              {cars.map((item) => (
                <AnyReactComponent
                  isSelected={currentHoverID === item.id}
                  key={item.id}
                  lat={item.map.lat}
                  lng={item.map.lng}
                  car={item}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
