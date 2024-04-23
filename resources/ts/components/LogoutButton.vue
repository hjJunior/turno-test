<script setup lang="ts">
import useAuth from "@/modules/auth/hooks/useAuth";
import { FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { logout } = useAuth();

const onLogout = () => {
  logout();
  router.replace({ name: "auth.login" });
};
</script>

<template>
  <FwbButton @click="onLogout">Logout</FwbButton>
</template>
