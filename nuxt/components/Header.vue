<template>
  <div
    class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
  >
    <svg
      class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
      viewBox="0 0 1155 678"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
        fill-opacity=".3"
        d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
      />
      <defs>
        <linearGradient
          id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
          x1="1155.49"
          x2="-78.208"
          y1=".177"
          y2="474.645"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9089FC" />
          <stop offset="1" stop-color="#586CB2" />
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div class="px-6 pt-6 lg:px-8">
    <div>
      <nav class="flex h-9 items-center justify-between" aria-label="Global">
        <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <img
              class="h-6"
              src="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/7ed7598b-5520-4e18-5159-daa458739b00/md"
              alt=""
            />
          </NuxtLink>
        </div>
        <div class="flex min-w-0 flex-1 justify-end">
          <NuxtLink
            to="/"
            v-if="actionHome"
            class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-neutral shadow-sm ring-1 ring-accent hover:ring-accent-focus"
          >
            Home
          </NuxtLink>
          <a
            @click="auth.logout()"
            v-else-if="isAuth"
            class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-neutral shadow-sm ring-1 ring-accent hover:ring-accent-focus"
          >
            Logout
          </a>
          <NuxtLink
            to="/profile"
            v-else
            class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-neutral shadow-sm ring-1 ring-accent hover:ring-accent-focus"
          >
            Login
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
// Setup props to be passed to this component
const props = defineProps({
  actionHome: Boolean,
});
// Create a new instance of Auth0 Client
let { auth, isAuth, token, userAuth0, userAuthor } = await getAuth0();
</script>