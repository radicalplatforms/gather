<template>
  <NuxtLink
    :to="url"
    :class="[
      current
        ? 'bg-primary-focus text-neutral'
        : 'text-accent hover:text-neutral hover:bg-primary-focus',
      'group flex items-center gap-x-3 rounded-md leading-tight p-1 min-h-[41px] text-sm font-semibold',
    ]"
  >
    <component :is="icon" class="ml-1 h-6 w-6 shrink-0" aria-hidden="true" />
    <div class="flex-col truncate">
      <div class="">{{ title }}</div>
      <div class="text-xs font-normal">
        {{ desc }}
      </div>
    </div>
    <span
      v-if="false"
      class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 mr-1 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
      aria-hidden="true"
      >TA</span
    >
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  icon: Function,
  title: String,
  desc: String,
  url: String,
  current: Boolean,
});
</script>