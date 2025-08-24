import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createListSignal } from "../../api/reqControl";
import { getCampers } from "../../api/campersApi";

const PAGE_SIZE = 12;

const isCanceled = (err) =>
  err?.name === "CanceledError" ||
  err?.message === "canceled" ||
  err?.code === "ERR_CANCELED";

export const loadMoreCampers = createAsyncThunk(
  "campers/loadMore",
  async (_, { getState }) => {
    const { campers, filters } = getState();
    const nextPage = campers.page + 1;
    const signal = createListSignal();
    const data = await getCampers({
      page: nextPage,
      limit: campers.limit,
      filters,
      signal,
    });
    return { data, page: nextPage };
  }
);

export const resetAndFetchCampers = createAsyncThunk(
  "campers/resetAndFetch",
  async (_, { getState }) => {
    const { filters } = getState();
    const page = 1;
    const signal = createListSignal();
    const data = await getCampers({ page, limit: PAGE_SIZE, filters, signal });
    return { data, page };
  }
);

const initialState = {
  items: [],
  page: 1,
  limit: PAGE_SIZE,
  hasMore: true,
  status: "idle",
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    hardReset(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAndFetchCampers.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(resetAndFetchCampers.fulfilled, (s, { payload }) => {
        const arr = Array.isArray(payload.data) ? payload.data : [];
        s.items = arr;
        s.page = payload.page;
        s.hasMore = arr.length === s.limit;
        s.status = "succeeded";
      })
      .addCase(resetAndFetchCampers.rejected, (s, a) => {
        if (isCanceled(a.error)) {
          s.status = "idle";
          return;
        }
        s.status = "failed";
        s.error = a.error?.message || "Failed to load campers";
      })

      .addCase(loadMoreCampers.pending, (s) => {
        s.status = "loadingMore";
        s.error = null;
      })
      .addCase(loadMoreCampers.fulfilled, (s, { payload }) => {
        const arr = Array.isArray(payload.data) ? payload.data : [];
        s.items.push(...arr);
        s.page = payload.page;
        s.hasMore = arr.length === s.limit;
        s.status = "succeeded";
      })
      .addCase(loadMoreCampers.rejected, (s, a) => {
        if (isCanceled(a.error)) {
          s.status = "idle";
          return;
        }
        s.status = "failed";
        s.error = a.error?.message || "Failed to load more campers";
      });
  },
});

export const { hardReset } = campersSlice.actions;

export default campersSlice.reducer;
