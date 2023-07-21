"use client";

import React, { FC } from "react";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import ChaufferSearchForm from "./(car-search-form)/ChaufferSearchForm";
import { UserSearchType } from "../type";

export interface HeroSearchFormSmallProps {
  className?: string;
  search: UserSearchType
}

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = "",
  search = null
}) => {

   return (
      <div className={`nc-HeroSearchFormSmall ${className}`} data-nc-id="HeroSearchFormSmall">
         <div className="mt-2">
            {(search && search.type == 'rental' && <RentalCarSearchForm userSearch={search.rental} />)}
            {(search && search.type == 'chauffer' && <ChaufferSearchForm userSearch={search.chauffer} />)}
         </div>
      </div>
   );
};

export default HeroSearchFormSmall;
