import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signup: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export const selectUser = (state: { auth: UserState }) => state.auth.user;
export const selectToken = (state:{ auth: UserState }) => state.auth.token;
export default authSlice.reducer;
