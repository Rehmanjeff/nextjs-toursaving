import React, { FC } from "react";
import { CarDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Image from "next/image";
import Link from "next/link";
import { PathName } from "@/routers/types";

export interface CarCardProps {
  className?: string;
  size?: "default" | "small";
  car: CarDataType
}

const CarCard: FC<CarCardProps> = ({
  className="",
  size = "default",
  car
}) => {

  const renderSliderGallery = () => {
    return (
      (car && <>
         <div className="relative w-full rounded-2xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 ">
               <Image fill src={car.featuredImage} alt="car" sizes="(max-width: 640px) 100vw, 350px" />
            </div>
            <BtnLikeIcon isLiked={car.like} className="absolute right-3 top-3 z-[1]" />
            {car.saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
         </div>
      </>)
    );
  };

  const renderContent = () => {
    return (
      (car && <>
         <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
            <div className="space-y-2">
               <div className="flex items-center space-x-2">
                  {car.isAds && <Badge name="ADS" color="green" />}
                  <h2 className={`  capitalize ${ size === "default" ? "text-xl font-semibold" : "text-base font-medium"}`}>
                     <span className="line-clamp-1">{car.title}</span>
                  </h2>
               </div>
               <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                  <span className="">{car.seats} seats</span>
                  <span>-</span>
                  <span className="">{car.gearshift} </span>
               </div>
            </div>
            <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex justify-between items-center">
               <span className="text-base font-semibold">
                  {car.price}
                  {` `}
                  {size === "default" && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                     /day
                  </span>
                  )}
               </span>
               <StartRating reviewCount={car.reviewCount} point={car.reviewStart} />
            </div>
         </div>
      </>)
    );
  };

   return (
      (car && <>
         <div className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`} data-nc-id="CarCard">
            <Link href={car.href} className="flex flex-col">
            {renderSliderGallery()}
            {renderContent()}
            </Link>
         </div>
      </>)
   );
};

export default CarCard;
