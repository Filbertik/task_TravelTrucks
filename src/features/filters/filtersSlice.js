import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: "",
    form: "",
    AC: false, bathroom: false, kitchen: false, TV: false, radio: false,
    refrigerator: false, microwave: false, gas: false, water: false,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setLocation: (s, a) => { s.location = a.payload; },
        setForm: (s, a) => { s.form = a.payload; },
        setFeature: (s, a) => { const { key, value } = a.payload; s[key] = value; },
        resetFilters: () => initialState,
    },
});

export const { setLocation, setForm, setFeature, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
