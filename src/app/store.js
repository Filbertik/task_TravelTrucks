import { configureStore } from "@reduxjs/toolkit";
import camperDetailsReducer from "../features/camperDetails/camperDetailsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import campersReducer from "../features/campers/campersSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filters: filtersReducer,
    campers: campersReducer,
    camperDetails: camperDetailsReducer,
  },
});
