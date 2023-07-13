import React, { FC } from "react";
import SectionGridFilterCard from "@/app/(car-listings)/SectionGridFilterCard";
import SectionHeroArchivePage from "@/app/(server-components)/SectionHeroArchivePage";
import heroRightImage from "@/images/hero-right-car.png";
import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import BgGlassmorphism from "@/components/BgGlassmorphism";

export interface ListingCarPageProps {}

const ListingCarPage: FC<ListingCarPageProps> = () => {
  return (
   <div className={`nc-ListingCarMapPage relative `}>
      <BgGlassmorphism />
      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage
          rightImage={heroRightImage}
          currentPage="Cars"
          currentTab="Cars"
          listingType={
            <>
              <i className="text-2xl las la-car"></i>
              <span className="ml-2.5">1512 cars</span>
            </>
          }
        />
      </div>
      <div className="container ">
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
          <SectionGridAuthorBox />
        </div>
      </div>
   </div>
  );
};

export default ListingCarPage;
