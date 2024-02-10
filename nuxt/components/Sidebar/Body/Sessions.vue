<template>
  <li v-if="sessions?.length > 0">
    <div class="text-xs font-semibold leading-6 text-accent">My Sessions</div>
    <ul role="list" class="-mx-2 mt-2 space-y-1">
      <li v-for="item in sessions" :key="item.data.title">
        <SidebarBodyButton
          :icon="ChartPieIcon"
          :title="item.data.Title === '' ? 'General OH' : item.data.Title"
          :url="'/session/' + item.ref['@ref'].id + '/dash'"
          :current="route.path === '/session/' + item.ref.id"
        />
      </li>
    </ul>
  </li>
</template>

<script setup>
import { ChartPieIcon } from "@heroicons/vue/24/outline/index.js";

const props = defineProps({
  sessions: Object,
});
const route = useRoute();
</script>