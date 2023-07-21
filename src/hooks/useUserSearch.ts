import { useState, useEffect } from 'react';
import { userSearch } from "@/redux/features/search-slice"
//import { useDispatch } from "react-redux";
import { UserSearchType } from "@/app/(client-components)/type";

export const useUserSearch = (initialSearch : UserSearchType) => {
   //const dispatch = useDispatch();
   const [search, setSearch] = useState<UserSearchType>(initialSearch);

   useEffect(() => {
      
      //dispatch(userSearch(search));
      localStorage.setItem('toursaving-search', JSON.stringify(search));
   }, [search]);

   return { search, setSearch };
};