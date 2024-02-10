import createAuth0Client from "@auth0/auth0-spa-js";

export const getAuth0 = async () => {
  // Import global config defined in nuxt.config.ts
  const config = useRuntimeConfig();
  // Create a new instance of Auth0 Client
  let auth = await createAuth0Client({
    domain: config.public.auth0.domain,
    client_id: config.public.auth0.client_id,
    redirect_uri: config.public.urlBase.front + config.public.auth0.redirect_url,
    cacheLocation: "localstorage",
    audience: "https://rakerman.us.auth0.com/api/v2/",
  });
  // Fetch isAuth, userAuth0, and token
  const isAuth = await auth.isAuthenticated();
  const userAuth0 = isAuth ? await auth.getUser() : undefined;
  const token = isAuth ? await auth.getTokenSilently() : undefined;
  // Fetch userAuthor
  const { data: userAuthor } = await useFetch("/api/auth0/user", {
    method: "GET",
    server: false, // not to Nitro
    baseURL: "https://api.author.rakerman.com", // backend url
    headers: {
      // auth headers
      Authorization: "Bearer " + token,
    },
  });
  // Check if user is complete in Author, redirect to Author if so
  if (userAuthor.value && !userAuthor.value?.complete) {
    return navigateTo("https://author.rakerman.com/profile", {
      external: true,
    });
  }
  // Clear cache from Author if token is null
  if (token === undefined) {
    clearNuxtData();
  }
  // Return
  return { auth, isAuth, token, userAuth0, userAuthor };
};