import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  phoneVerifyToken?: string;
}

const initialState: AuthState = {
  phoneVerifyToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePhoneVerifyToken: (state, action: PayloadAction<string|undefined>) => {
      state.phoneVerifyToken = action.payload;
    },
    clearPhoneVerifyToken: (state) => { state.phoneVerifyToken = undefined;},
  },
});

export const { updatePhoneVerifyToken,clearPhoneVerifyToken  } = authSlice.actions;

// Selector استاندارد
export const selectPhoneVerifyToken = (state: RootState) =>
  state.auth.phoneVerifyToken;

export default authSlice.reducer;
