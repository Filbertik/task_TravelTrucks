import { createSlice } from "@reduxjs/toolkit";
import { loadFavorites, saveFavorites } from "../../utils/persist";

const initialState = { ids: loadFavorites() };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (s, a) => {
      const id = String(a.payload);
      s.ids = s.ids.includes(id)
        ? s.ids.filter((x) => x !== id)
        : [...s.ids, id];
      saveFavorites(s.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
