<script setup lang="ts">
import BottomNavigation from "@/components/BottomNavigation/BottomNavigation.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="h-full flex flex-col items-stretch">
    <Sidebar class="h-full hidden lg:block" />
    <main class="flex flex-col flex-auto min-h-0 pb-8 lg:ml-64 lg:pb-0">
      <slot />
    </main>
    <BottomNavigation class="lg:hidden" />
  </div>
</template>
