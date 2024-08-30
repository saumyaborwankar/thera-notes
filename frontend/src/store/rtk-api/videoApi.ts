import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";

export const VIDEO = "VIDEO";

export const videoApi = createApi({
  reducerPath: `${VIDEO}api`,
  baseQuery: fakeBaseQuery(),
  tagTypes: [VIDEO],
  endpoints: (build) => ({
    getVideoUrl: build.mutation<any, any>({
      async queryFn() {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Video.getUploadUrl({
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
      invalidatesTags: [VIDEO],
    }),
  }),
});

export const { useGetVideoUrlMutation } = videoApi;
