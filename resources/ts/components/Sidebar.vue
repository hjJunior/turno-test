<script setup lang="ts">
import { FwbSidebar, FwbSidebarItem } from "flowbite-vue";
import NavigationItems from "@/config/navigation";
</script>

<template>
  <FwbSidebar class="dark">
    <FwbSidebarItem
      v-for="link in NavigationItems"
      :key="link.label"
      :link="link.to"
      class="aria-[current='page']:bg-gray-700"
    >
      <template #icon>
        <span
          class="w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          :class="link.icon"
        />
      </template>
      <template #default>{{ link.label }}</template>
    </FwbSidebarItem>
  </FwbSidebar>
</template>
