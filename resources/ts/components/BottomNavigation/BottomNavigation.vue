<script setup lang="ts">
import NavigationItems from "@/config/navigation";
import BottomNavigationItem from "./BottomNavigationItem.vue";
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <BottomNavigationItem
        v-for="link in NavigationItems"
        :key="link.label"
        :item="link"
      />
    </div>
  </div>
</template>
