import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({

   reducer: {
      searchReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector