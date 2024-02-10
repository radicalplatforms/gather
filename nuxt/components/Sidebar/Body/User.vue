<template>
  <li class="-mx-6 mt-auto">
    <NuxtLink
      to="https://author.rakerman.com/profile"
      class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-neutral hover:bg-primary-focus"
    >
      <Avatar
        class="rounded-full flex-shrink-0"
        :size="32"
        variant="beam"
        :name="userAuthor.profile.username"
        v-if="userAuthor.profile.useBoringAvatars"
      />
      <img
        class="h-8 w-8 rounded-full bg-primary-focus"
        :src="userAuthor.profile.pfp"
        alt=""
        v-else
      />
      <span class="sr-only">Your profile</span>
      <span aria-hidden="true" class="-mt-1">
        {{ userAuthor.profile.first }}
        {{ userAuthor.profile.last }}
        <span class="block text-xs font-medium -mt-0.5">
          @{{ userAuthor.profile.username }}
        </span>
      </span>
    </NuxtLink>
  </li>
</template>

<script setup>
import Avatar from "vue-boring-avatars";

const props = defineProps({
  userAuthor: Object,
});
</script>