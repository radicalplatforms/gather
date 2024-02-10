<template>
  <div class="mt-2 text-sm text-red-600 space-y-1" v-if="issues.length > 0">
    <p v-for="issue in props.issues.filter((e) => e.field === props.field)">
      {{ issue.message }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  issues: Array,
  field: String,
})
</script>