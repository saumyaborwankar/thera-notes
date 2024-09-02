import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthDto,
  AuthResponse,
  SingupAuthDto,
  Tokens,
} from "@saumyaborwankar/moovy-api";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";
import { setLoggedIn } from "../slice/userSlice";

export const AUTH = "AUTH";

export const authApi = createApi({
  reducerPath: `${AUTH}api`,
  baseQuery: fakeBaseQuery(),
  tagTypes: [AUTH],
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, AuthDto>({
      async queryFn(loginRequest) {
        try {
          const { data } = await Api.Auth.login(loginRequest);
          LocalStorage.setTokens(data.tokens);
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     LocalStorage.setTokens(data);
      //     console.log(data, "[[[[", queryFulfilled);
      //     // Dispatch the action to update the store
      //     dispatch(setLoggedIn(true));
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
    }),
    logout: build.mutation<boolean, void>({
      async queryFn() {
        try {
          const headers = LocalStorage.getAuthorizationHeaders();
          const { data } = await Api.Auth.logout(headers);
          return { data };
        } catch (e) {
          console.log(e);
          return { error: e };
        }
      },
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(() => {
            // Successful logout
            LocalStorage.logout();
            dispatch(setLoggedIn(false));
          })
          .catch((e) => {
            // Logout request failed, force logout on frontend
            LocalStorage.logout();
            dispatch(setLoggedIn(false));
          });
      },
    }),
    signup: build.mutation<AuthResponse, SingupAuthDto>({
      async queryFn(loginRequest) {
        try {
          const { data } = await Api.Auth.signup(loginRequest);
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [AUTH],
    }),

    refresh: build.query<AuthResponse, void>({
      async queryFn() {
        try {
          const refreshHeader = LocalStorage.getRefreshAuthorizationHeaders();

          console.log(
            "Trying to refresh with refresh HEADERS: ",
            refreshHeader.headers.Authorization
          );
          const { data } = await Api.Auth.refresh(refreshHeader);
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            LocalStorage.setTokens(data.tokens);
            // Dispatch the action to update the store
            dispatch(setLoggedIn(true));
          })
          .catch((error) => {
            console.error("Login failed:", error);
          });
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshQuery,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
