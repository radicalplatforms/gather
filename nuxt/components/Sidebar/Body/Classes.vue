<template>
  <li>
    <div class="text-xs font-semibold leading-6 text-accent">Groups</div>
    <ul role="list" class="-mx-2 mt-2 space-y-1">
      <li v-for="item in classes" :key="item.data.Title">
        <SidebarBodyButton
          :icon="FolderIcon"
          :title="item.data.Number"
          :desc="item.data.Title"
          :url="'/class/' + item.data.ref"
          :current="route.path === '/class/' + item.data.ref"
        />
      </li>
      <li>
        <SidebarBodyButton
          :icon="SquaresPlusIcon"
          title="Create Group"
          :url="'/class/create'"
          :current="route.path === '/class/create'"
        />
      </li>
    </ul>
  </li>
</template>

<script setup>
import { FolderIcon, SquaresPlusIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  classes: Object,
});
const route = useRoute();
</script>