<script setup lang="ts">
import { NavigationItem } from "@/config/navigation";

defineProps<{ item: NavigationItem }>();
</script>

<template>
  <RouterLink :to="item.to" custom v-slot="{ navigate, isActive }">
    <button
      type="button"
      class="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600 aria-[current='page']:bg-gray-50"
      v-bind="{ 'aria-current': isActive ? 'page' : undefined }"
      @click="navigate"
    >
      <span
        class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 group-aria-[current='page']:text-blue-600"
        :class="item.icon"
        aria-hidden="true"
      />
      <span
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 group-aria-[current='page']:text-blue-600"
      >
        {{ item.label }}
      </span>
    </button>
  </RouterLink>
</template>
