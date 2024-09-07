import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";

export const CLIENT = "CLIENT";

export const videoApi = createApi({
  reducerPath: `${CLIENT}api`,
  baseQuery: fakeBaseQuery(),
  tagTypes: [CLIENT],
  endpoints: (build) => ({
    getVideoUrl: build.mutation<any, any>({
      async queryFn() {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Client.addClient({
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          console.log(data);
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [CLIENT],
    }),
  }),
});

export const { useGetVideoUrlMutation } = videoApi;
