import { useAuth0 } from "~/utils/useAuth0";
import { getAuth0 } from "~/utils/getAuth0";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // First, lets enforce user is logged in via Auth0
  await useAuth0(to?.query, true);
  // Second, lets enforce user is a sudo user from Author
  let { auth, isAuth, token, userAuth0, userAuthor } = await getAuth0();
  // @ts-ignore
  if (!userAuthor?.value?.profile?.sudo) {
    // If user is not a sudo user, redirect to home page
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized, not a sudo user",
    });
  }
});