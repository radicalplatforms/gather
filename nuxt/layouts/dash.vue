<template>
  <Html data-theme="light" />
  <div class="h-full">
    <!-- Mobile Sidebar -->
    <!--<SidebarMobile-->
    <!--  :userAuthor="userAuthor"-->
    <!--  :sidebarOpen="sidebarOpen"-->
    <!--  @closeSidebar="sidebarOpen = false"-->
    <!--/>-->

    <!-- Desktop Sidebar -->
    <SidebarBody
      :groups="groups"
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

const { data: groups } = await useFetch("/api/groups", {
  method: "GET",
  server: false, // not to Nitro
  baseURL: config.public.urlBase.back, // backend url
//  headers: {
//    // auth headers
//    Authorization: "Bearer " + token,
//  },
});

console.log(groups)

const sidebarOpen = ref(false);
</script>