import {
  AuthApi,
  Configuration,
  ClientApi,
  NoteApi,
} from "@saumyaborwankar/thera-notes-api";

const basePath = `http://localhost:3333`;

const config = new Configuration({
  basePath,
});

export default {
  Auth: new AuthApi(config),
  Client: new ClientApi(config),
  Note: new NoteApi(config),
};
