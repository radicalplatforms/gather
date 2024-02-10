<!-- RF Nuxt Header, Rev. 04/05/23 -->

<template>
  <Html class="h-full bg-primary scroll-smooth" lang="en" />
  <Link rel="icon" type="png" :href="config.public.meta.favicon" />
  <Link href="/css/main.css" rel="stylesheet" />
  <Body class="h-full bg-primary" />
  <div class="h-full bg-primary">
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,#586CB2 0%,#059669 50%,#CCCCCC 100%)"
      />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

useServerSeoMeta({
  title: config.public.meta.title,
  ogTitle: config.public.meta.title,
  description: config.public.meta.desc,
  ogDescription: config.public.meta.desc,
  ogImage: config.public.meta.img,
});
</script>