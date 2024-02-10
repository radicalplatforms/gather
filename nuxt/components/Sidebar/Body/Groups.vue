<template>
  <li>
    <div class="text-xs font-semibold leading-6 text-accent">Groups</div>
    <ul role="list" class="-mx-2 mt-2 space-y-1">
      <li v-for="item in groups" :key="item.name">
        <SidebarBodyButton
          :icon="FolderIcon"
          :title="item.name"
          :url="'/groups/' + item.id"
          :current="route.path === '/groups/' + item.id"
        />
      </li>
      <li>
        <SidebarBodyButton
          :icon="SquaresPlusIcon"
          title="Create Group"
          :url="'/class/create'"
          :current="route.path === '/groups/create'"
        />
      </li>
    </ul>
  </li>
</template>

<script setup>
import { FolderIcon, SquaresPlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  groups: Object,
});
const route = useRoute();
</script>