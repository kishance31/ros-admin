export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { user: {tokens} }
      } = store.getState();

      if (tokens) {
        config.headers.tokens = tokens;
      }

      return config;
    },
    err => Promise.reject(err)
  );
}
