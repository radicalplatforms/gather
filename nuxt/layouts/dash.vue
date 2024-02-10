<template>
  <Html data-theme="light" />
  <div class="h-full">
    <!-- Mobile Sidebar -->
    <SidebarMobile
      :classes="classes"
      :userAuthor="userAuthor"
      :sidebarOpen="sidebarOpen"
      @closeSidebar="sidebarOpen = false"
    />

    <!-- Desktop Sidebar -->
    <SidebarBody
      :classes="classes"
      :sessions="sessions"
      :tickets="tickets"
      :userAuthor="userAuthor"
      class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col"
    />

    <div class="h-full xl:pl-72">
      <!-- Navbar -->
      <Navbar @openSidebar="sidebarOpen = true" />

      <main class="h-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

let { auth, isAuth, token, userAuth0, userAuthor } = await getAuth0();

const { data: classes } = await useFetch("/classes", {
  method: "GET",
  server: false, // not to Nitro
  baseURL: config.public.urlBase.back, // backend url
  headers: {
    // auth headers
    Authorization: "Bearer " + token,
  },
});

const { data: sessions } = await useFetch("/sessions", {
  method: "GET",
  server: false, // not to Nitro
  baseURL: config.public.urlBase.back, // backend url
  headers: {
    // auth headers
    Authorization: "Bearer " + token,
  },
});

const { data: tickets } = await useFetch("/tickets/all", {
  method: "GET",
  server: false, // not to Nitro
  baseURL: config.public.urlBase.back, // backend url
  headers: {
    // auth headers
    Authorization: "Bearer " + token,
  },
});

console.log(classes);
console.log(sessions);
console.log(tickets);

const sidebarOpen = ref(false);
</script>