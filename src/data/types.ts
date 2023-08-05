import { UserSearch } from "@/app/(client-components)/type";
import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string>;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export type Supplier = 'iway'

export type Currency = 'usd' | 'bd'

export interface CarAdditionalService {
   id?: string,
   serviceId?: string,
   price?: string,
   name: string,
   uid?: string,
   defaultInclude: boolean,
   currency?: Currency,
   category?: string,
   type?: string
}

export interface CarPriceBreakdown {

   name: string;
   price: string
}

export interface CarChauffer{

   priceBreakdown: CarPriceBreakdown[];
   deliveryPrice: string;
   minimumHours: number;
   ratePerHour: number
}

export interface CarDataType {
  id: string | number;
  priceId: string;
  href: Route<string>;
  title: string;
  shortDescription: string;
  featuredImage: StaticImageData | string;
  reviewStart?: number;
  reviewCount?: number;
  like?: boolean;
  price: string;
  grandTotal: string;
  chauffer?: CarChauffer
  seats: number;
  gearshift?: string;
  supplier : Supplier;
  currency : Currency;
  cancellationTime?: string;
  allowableTime?: string;
  additionalServices? : [CarAdditionalService];
  hasFastBooking? : boolean;
}

export interface CarFullDataType {
   
   searchId : string;
   data: CarDataType;
   timestamp: number
}
