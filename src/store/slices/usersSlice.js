import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoadng: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoadng = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoadng = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoadng = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
