import {
  AuthApi,
  Configuration,
  VideoServiceApi,
} from "@saumyaborwankar/moovy-api";

const basePath = `http://localhost:3333`;

const config = new Configuration({
  basePath,
});

export default {
  Auth: new AuthApi(config),
  Video: new VideoServiceApi(config),
};
