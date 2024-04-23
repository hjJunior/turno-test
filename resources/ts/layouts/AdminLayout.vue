<script setup lang="ts">
import LogoutButton from "@/components/LogoutButton.vue";
import { FwbHeading } from "flowbite-vue";
</script>

<template>
  <div class="h-full flex flex-col items-stretch">
    <nav class="flex flex-col sticky top-0 bg-white z-10 border-b px-2 py-4">
      <div class="flex justify-between items-center">
        <FwbHeading tag="h5">Admin</FwbHeading>
        <LogoutButton />
      </div>
    </nav>
    <main class="flex flex-col flex-auto min-h-0">
      <slot />
    </main>
  </div>
</template>
