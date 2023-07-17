"use client";

import React, { FC } from "react";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import ChaufferSearchForm from "./(car-search-form)/ChaufferSearchForm";

export interface HeroSearchFormSmallProps {
  className?: string;
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = ""
}) => {

  return (
    <div className={`nc-HeroSearchFormSmall ${className}`} data-nc-id="HeroSearchFormSmall">
      <div className="mt-2">
         <RentalCarSearchForm />
      </div>
    </div>
  );
};

export default HeroSearchFormSmall;
