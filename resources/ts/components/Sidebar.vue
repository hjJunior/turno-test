<script setup lang="ts">
import {
  FwbBadge,
  FwbSidebar,
  FwbSidebarItem,
  FwbSidebarItemGroup,
} from "flowbite-vue";
import NavigationItems from "@/config/navigation";
import LogoutButton from "./LogoutButton.vue";
import useAuth from "@/modules/auth/hooks/useAuth";
import useAmountFormat from "@/hooks/useAmountFormat";
import { computed } from "vue";

const { user } = useAuth();
const balanceFormated = useAmountFormat(
  computed(() => user.value!.bank_account.balance)
);
</script>

<template>
  <FwbSidebar class="dark">
    <div class="grid pb-2 gap-2">
      <div class="flex flex-col">
        <div class="text-gray-100">{{ user!.name }}</div>
        <div class="text-xs text-gray-400">{{ user!.email }}</div>
        <div class="flex mt-2">
          <FwbBadge class="!mr-0"> Balance: {{ balanceFormated }} </FwbBadge>
        </div>
      </div>
      <LogoutButton />
    </div>
    <FwbSidebarItemGroup border>
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
    </FwbSidebarItemGroup>
  </FwbSidebar>
</template>
