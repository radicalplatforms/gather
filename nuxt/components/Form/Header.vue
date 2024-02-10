<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-secondary">{{ props.title }}</h3>
    <p class="mt-1 max-w-2xl text-sm text-accent">{{ props.desc }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  desc: String,
})
</script>