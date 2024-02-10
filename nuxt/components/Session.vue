<template>
  <li
    v-for="session in sessions"
    :key="session.id"
    class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
  >
    <div class="min-w-0 flex-auto">
      <div class="flex items-center gap-x-2">
        <div
          :class="[
            statuses[
              DateTime.fromISO(session.data.End['@ts']) > DateTime.now()
                ? 'live'
                : 'completed'
            ],
            'flex-none rounded-full p-1',
          ]"
        >
          <div class="h-2 w-2 rounded-full bg-current" />
        </div>
        <h2 class="min-w-0 text-sm font-semibold leading-6 text-neutral">
          <NuxtLink
            :to="'/session/' + session.ref['@ref'].id + '/queue'"
            class="flex gap-x-2"
          >
            <span class="truncate">
              {{
                session.data.Title === "" ? "General OH" : session.data.Title
              }}
              <span class="text-accent">w/</span>
              {{
                session.instructors
                  .map(function (val) {
                    return val.profile.first + " " + val.profile.last;
                  })
                  .join(", ")
              }}
            </span>
            <span class="absolute inset-0" />
          </NuxtLink>
        </h2>
      </div>
      <div class="mt-1 flex items-center text-xs leading-5 text-accent">
        <p class="truncate">
          {{
            DateTime.fromISO(session.data.Start["@ts"]).toLocaleString(
              DateTime.DATETIME_MED
            )
          }}
          to
          {{
            DateTime.fromISO(session.data.End["@ts"]).toLocaleString(
              DateTime.TIME_SIMPLE
            )
          }}
        </p>
      </div>
    </div>
    <div
      v-if="!hideAction"
      :class="[
        actions[
          DateTime.fromISO(session.data.End['@ts']) > DateTime.now()
            ? 'Join'
            : 'Review'
        ],
        'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset',
      ]"
    >
      {{
        DateTime.fromISO(session.data.End["@ts"]) > DateTime.now()
          ? "Join"
          : "Review"
      }}
    </div>
    <ChevronRightIcon
      v-if="!hideAction"
      class="h-5 w-5 flex-none text-accent"
      aria-hidden="true"
    />
  </li>
</template>

<script setup>
import { DateTime } from "luxon";
import { ChevronRightIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const config = useRuntimeConfig();
const route = useRoute();

let { auth, isAuth, token, userAuth0, userAuthor } = await getAuth0();

const statuses = {
  upcoming: "text-yellow-500 bg-yellow-100/10",
  live: "text-green-400 bg-green-400/10",
  completed: "text-gray-500 bg-gray-100/10",
  cancelled: "text-rose-400 bg-rose-400/10",
};

const actions = {
  Edit: "text-accent bg-gray-600/30 ring-gray-700",
  Join: "text-green-400 bg-green-400/10 ring-green-400/30",
  Review: "text-accent bg-gray-600/30 ring-gray-700",
};

const props = defineProps({
  sessions: Object,
  hideAction: Boolean,
});
</script>