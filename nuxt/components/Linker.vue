<template>
  <NuxtLink :to="props.href" class="inline w-min group transition duration-300 hover:text-secondary">
    <slot />
    <span class="max-w-0 block group-hover:max-w-full transition-all duration-500 delay-75 h-[1.2px] opacity-70 -mt-0.5 mb-1 bg-secondary"></span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  href: String
})
</script>