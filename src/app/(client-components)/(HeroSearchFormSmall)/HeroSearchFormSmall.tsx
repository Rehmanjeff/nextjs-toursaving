"use client";

import React, { FC } from "react";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import ChaufferSearchForm from "./(car-search-form)/ChaufferSearchForm";
import { UserSearch } from "../type";

export interface HeroSearchFormSmallProps {
  className?: string;
  search: UserSearch
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  search = null
}) => {

   return (
      <div className={`nc-HeroSearchFormSmall ${className}`} data-nc-id="HeroSearchFormSmall">
         <div className="mt-2">
            {(search && search.type == 'rental' && search.rental && <RentalCarSearchForm userSearch={search.rental} />)}
            {(search && search.type == 'chauffer' && search.chauffer && <ChaufferSearchForm userSearch={search.chauffer} />)}
         </div>
      </div>
   );
};

export default HeroSearchFormSmall;
