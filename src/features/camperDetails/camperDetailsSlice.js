import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createDetailsSignal } from "../../api/reqControl";
import { getCamperById } from "../../api/campersApi";

const isCanceled = (err) =>
  err?.name === "CanceledError" ||
  err?.message === "canceled" ||
  err?.code === "ERR_CANCELED";

export const fetchCamperById = createAsyncThunk(
  "camperDetails/fetchById",
  async (id) => {
    const signal = createDetailsSignal();
    const data = await getCamperById(id, { signal });
    return data;
  }
);

const camperDetailsSlice = createSlice({
  name: "camperDetails",
  initialState: { entity: null, status: "idle", error: null },
  reducers: {
    clearDetails: (s) => {
      s.entity = null;
      s.status = "idle";
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCamperById.pending, (s) => {
      s.status = "loading";
      s.error = null;
    })
      .addCase(fetchCamperById.fulfilled, (s, a) => {
        s.entity = a.payload;
        s.status = "succeeded";
      })
      .addCase(fetchCamperById.rejected, (s, a) => {
        if (isCanceled(a.error)) {
          s.status = "idle";
          return;
        }
        s.status = "failed";
        s.error = a.error?.message || "Failed to load camper details";
      });
  },
});

export const { clearDetails } = camperDetailsSlice.actions;
export default camperDetailsSlice.reducer;
