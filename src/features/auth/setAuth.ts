import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {User} from "../../types/user"
import type {LoginPayload} from "../../types/user"
const initialState={
    id:0,
    accessToken:"",
    name:"",
    phone:"",
    isLogin:false
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      setAuth: (
  state,
  action: PayloadAction<LoginPayload>
) => {
  state.accessToken = action.payload.accessToken;

  state.id = action.payload.user.id;
  state.name = action.payload.user.name;
  state.phone = action.payload.user.phone;

  state.isLogin = true;

  localStorage.setItem(
    "accessToken",
    action.payload.accessToken
  );
}
    }
})
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;