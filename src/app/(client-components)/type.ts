export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface Location {
   id: number;
   name: string;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];

export type DriveType = "chauffer" | "rental";
export type RentalType = "same-destination" | "different-destination";
export type ChaufferType = "destination" | "hours";

export interface RentalServiceType {

   type: RentalType;
   pickUp: Location | null;
   dropOff: Location | null;
   startDate: number | null;
   endDate: number | null;
   startTime: string | null;
   endTime: string | null
}

export interface ChaufferServiceType {

   type: ChaufferType;
   pickUp: Location | null;
   destination?: Location | null;
   hours?: number | null;
   startDate: number | null;
   startTime: string | null;
}

export interface UserSearchType {
   type: DriveType;
   rental: RentalServiceType;
   chauffer: ChaufferServiceType;
}
