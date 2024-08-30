import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";
import { SiRotaryinternational } from "react-icons/si";
import { FiMoreVertical } from "react-icons/fi";
import { UserResponse } from "@saumyaborwankar/thera-notes-api";

interface User {
  loggedIn: boolean;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
}
const initialState: User = {
  loggedIn: false,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  createdAt: "",
  updatedAt: "",
};

export const USER = "user";
export const validateAccessToken = createAsyncThunk<UserResponse>(
  `${USER}/validateAccessToken`,
  async (_accessToken, { rejectWithValue }) => {
    try {
      const headers = LocalStorage.getAuthorizationHeaders();
      const { data } = await Api.Auth.validate(headers); // if this passed the user is logged in
      return data;
    } catch (error: any) {
      console.log("validation fail", error);
      try {
        const refreshHeaders = LocalStorage.getRefreshAuthorizationHeaders();

        //trying to get new tokens
        const { data } = await Api.Auth.refresh(refreshHeaders);
        LocalStorage.setTokens(data.tokens);

        return data.user;
      } catch (e: any) {
        // refresh token is invalid
        return rejectWithValue(e.response.data);
      }
    }
  }
);

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserResponse>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        validateAccessToken.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.loggedIn = true;
          state.email = action.payload.email;
          state.username = action.payload.username;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.createdAt = action.payload.createdAt;
          state.updatedAt = action.payload.updatedAt;
        }
      )
      .addCase(validateAccessToken.rejected, (state, action) => {
        state.loggedIn = false;
        LocalStorage.logout();
        console.error("Token validation failed:", action.payload);
      });
  },
});

export const { setLoggedIn, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
