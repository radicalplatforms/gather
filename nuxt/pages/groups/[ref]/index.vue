<template>
  <header
    class="flex items-center justify-between border-b border-accent/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
  >
    <h1 class="text-base font-semibold leading-7 text-neutral">Events</h1>

    <div>
      <NuxtLink
        to="#"
        class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary-focus focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
      >
        Create Custom Event
      </NuxtLink>
    </div>

    <!-- Sort dropdown -->
    <!--    <Menu as="div" class="relative">-->
    <!--      <MenuButton-->
    <!--        class="flex items-center gap-x-1 text-sm font-medium leading-6 text-neutral"-->
    <!--      >-->
    <!--        Sort by-->
    <!--        <ChevronUpDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />-->
    <!--      </MenuButton>-->
    <!--      <transition-->
    <!--        enter-active-class="transition ease-out duration-100"-->
    <!--        enter-from-class="transform opacity-0 scale-95"-->
    <!--        enter-to-class="transform opacity-100 scale-100"-->
    <!--        leave-active-class="transition ease-in duration-75"-->
    <!--        leave-from-class="transform opacity-100 scale-100"-->
    <!--        leave-to-class="transform opacity-0 scale-95"-->
    <!--      >-->
    <!--        <MenuItems-->
    <!--          class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-primary/5 focus:outline-none"-->
    <!--        >-->
    <!--          <MenuItem v-slot="{ active }">-->
    <!--            <a-->
    <!--              href="#"-->
    <!--              :class="[-->
    <!--                active ? 'bg-gray-50' : '',-->
    <!--                'block px-3 py-1 text-sm leading-6 text-primary',-->
    <!--              ]"-->
    <!--              >Name</a-->
    <!--            >-->
    <!--          </MenuItem>-->
    <!--          <MenuItem v-slot="{ active }">-->
    <!--            <a-->
    <!--              href="#"-->
    <!--              :class="[-->
    <!--                active ? 'bg-gray-50' : '',-->
    <!--                'block px-3 py-1 text-sm leading-6 text-primary',-->
    <!--              ]"-->
    <!--              >Date updated</a-->
    <!--            >-->
    <!--          </MenuItem>-->
    <!--          <MenuItem v-slot="{ active }">-->
    <!--            <a-->
    <!--              href="#"-->
    <!--              :class="[-->
    <!--                active ? 'bg-gray-50' : '',-->
    <!--                'block px-3 py-1 text-sm leading-6 text-primary',-->
    <!--              ]"-->
    <!--              >Environment</a-->
    <!--            >-->
    <!--          </MenuItem>-->
    <!--        </MenuItems>-->
    <!--      </transition>-->
    <!--    </Menu>-->
  </header>

  <ul role="list" class="divide-y divide-gray-100 px-8">
    <li v-for="event in events" :key="event.id" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <div>
        <p class="text-sm font-semibold leading-6 text-gray-900">
          <a href="#" class="hover:underline">{{ event.name }}</a>
        </p>
        <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p>
            {{ event.desc }}
          </p>
          <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
            <circle cx="1" cy="1" r="1" />
          </svg>
          <p>
            {{
              DateTime.fromSQL(event.startDate).toLocaleString(
                DateTime.DATETIME_MED
              )
            }}
            to
            {{
              DateTime.fromSQL(event.endDate).toLocaleString(
                DateTime.DATETIME_MED
              )
            }}
          </p>
        </div>
      </div>
      <dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
        <div class="flex -space-x-0.5">
          <dt class="sr-only">Commenters</dt>
          <dd v-for="(user, idx) in event.usersToGroupEvents" :key="user.authorUsername">
            <img class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white" :src="user.authorUsername === 'rak3rman' ? 'https://lh3.googleusercontent.com/a/ACg8ocJEkrXnJmo4G6aWGc2n7Fk5BNOJg55inlqmQaWdMUQgjw0Z=s96-c' : faces[idx]" :alt="user.authorUsername" />
          </dd>
        </div>
        <div class="flex w-16 gap-x-2.5">
          <dt>
            <span class="sr-only">Total comments</span>
            <CheckCircleIcon class="h-6 w-6" :class="{'text-green-500': event.usersToGroupEvents.some(user => user.authorUsername === userAuthor.profile.username)}" aria-hidden="true" />
          </dt>
          <dd class="text-sm leading-6 text-gray-900">{{ event.usersToGroupEvents.length }}</dd>
        </div>
      </dl>
    </li>
  </ul>
</template>

<script setup>
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { DateTime } from "luxon";

const route = useRoute();
const config = useRuntimeConfig();

definePageMeta({
  layout: "dash",
  middleware: ["enforce-auth"],
});

let { auth, isAuth, token, userAuth0, userAuthor } = await getAuth0();

console.log(userAuthor)

const { data: events } = await useFetch("/api/events", {
  method: "GET",
  params: {
    groupId: route.params.ref
  },
  server: false, // not to Nitro
  baseURL: config.public.urlBase.back, // backend url
  //  headers: {
  //    // auth headers
  //    Authorization: "Bearer " + token,
  //  },
});

console.log(events)

const faces = [
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
]
</script>