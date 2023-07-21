import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSearchType } from "@/app/(client-components)/type";

type InitialState  = {

   value: UserSearchType;
}

const initialState = {

   value: {
      type: 'chauffer',
      rental: {
         type: 'same-destination',
         pickUp: '',
         dropOff: '',
         startDate: null,
         endDate: null,
         startTime: '',
         endTime: ''
      },
      chauffer: {
         type: 'destination',
         pickUp: '',
         destination: '',
         hours: 3,
         startDate: null,
         startTime: '',
      }
   } as UserSearchType
} as InitialState

export const search = createSlice({

   name : 'search',
   initialState: initialState,
   reducers: {

      userSearch: (state, action: PayloadAction<UserSearchType>) => {
         return {
            value: action.payload,
         };
      }
   }
})

export const { userSearch } = search.actions
export default search.reducer