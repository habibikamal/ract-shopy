import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import UserDto from "../contracts/auth/userDto";

interface AuthState {
  phoneVerifyToken?: string;
  user?:UserDto
}

const initialState: AuthState = {
  phoneVerifyToken: undefined,
  user:undefined
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updatePhoneVerifyToken: (state, action: PayloadAction<string|undefined>) => {
      state.phoneVerifyToken = action.payload;
    },
    clearPhoneVerifyToken: (state) => { state.phoneVerifyToken = undefined;},
    updateUser:(state,action:PayloadAction<UserDto>)=>{
      state.user=action.payload
    }
  },
});

export const { updatePhoneVerifyToken,clearPhoneVerifyToken ,updateUser } = authSlice.actions;

// Selector استاندارد
export const selectPhoneVerifyToken = (state: RootState) =>  state.auth.phoneVerifyToken;
export const selectUser = (state: RootState) =>  state.auth.user;

export default authSlice.reducer;
