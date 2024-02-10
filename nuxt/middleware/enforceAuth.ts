import {useAuth0} from "~/utils/useAuth0";

export default defineNuxtRouteMiddleware(async (to, from) => {
    await useAuth0(to?.query, true)
});