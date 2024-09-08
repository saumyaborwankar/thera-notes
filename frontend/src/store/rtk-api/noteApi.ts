import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewNoteDetails, Note } from "@saumyaborwankar/thera-notes-api";
import { LocalStorage } from "../../components/auth/localStorage";
import Api from "../Api";

export const NOTE = "NOTE";

export const noteApi = createApi({
  reducerPath: `${NOTE}api`,
  baseQuery: fakeBaseQuery(),
  tagTypes: [NOTE],
  endpoints: (build) => ({
    getNotesForClients: build.query<Note[], ClientDetails>({
      async queryFn(clientDetails) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Note.getNotesForClient(
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
      providesTags: [NOTE],
    }),
    addNote: build.mutation<Note, NewNoteDetails>({
      async queryFn(newNoteDetails) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Note.addNote(newNoteDetails, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [NOTE],
    }),
    deleteNote: build.mutation<void, DeleteNote>({
      async queryFn(deleteNote) {
        try {
          const tokens = LocalStorage.getTokens();
          const { data } = await Api.Note.deleteNote(deleteNote.clientId, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });
          return { data };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: [NOTE],
    }),
  }),
});

export const {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetNotesForClientsQuery,
} = noteApi;

interface DeleteNote {
  clientId: string;
}
interface ClientDetails extends DeleteNote {}
