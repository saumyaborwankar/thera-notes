import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";
import { Client, NewClientDetails } from "@saumyaborwankar/thera-notes-api";

export const CLIENT = "CLIENT";

export const clientApi = createApi({
  reducerPath: `${CLIENT}api`,
  baseQuery: fakeBaseQuery(),
  tagTypes: [CLIENT],
  endpoints: (build) => ({
    getClients: build.query<Client[], void>({
      async queryFn() {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Client.getClients({
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: [CLIENT],
    }),
    getClientById: build.query<Client, GetClient>({
      async queryFn(clientDetails) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Client.getClientById(
            clientDetails.clientId,
            {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }
          );
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
    }),
    addClient: build.mutation<Client, NewClientDetails>({
      async queryFn(newClientDetails) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Client.addClient(newClientDetails, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [CLIENT],
    }),
    deleteClient: build.mutation<void, DeleteClient>({
      async queryFn(deleteClient) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Client.deleteClient(
            deleteClient.clientId,
            {
              headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }
          );
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [CLIENT],
    }),
  }),
});

export const {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useLazyGetClientByIdQuery,
} = clientApi;

interface DeleteClient {
  clientId: string;
}
interface GetClient extends DeleteClient {}
