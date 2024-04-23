<script setup lang="ts">
import { FwbA, FwbButton, FwbCard, FwbHeading, FwbInput } from "flowbite-vue";
import { Field, Form } from "vee-validate";
import useLoginForm from "../hooks/useLoginForm";
import { RouterLink } from "vue-router";

const { onSubmit, isSubmitting } = useLoginForm();
</script>

<template>
  <div class="mx-auto max-w-5xl px-2">
    <div class="flex items-center justify-center pt-8">
      <FwbCard class="p-5 w-full sm:min-w-80" variant="image">
        <form @submit="onSubmit" class="grid gap-4">
          <div>
            <FwbHeading tag="h5" class="mb-2">Login</FwbHeading>
            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur, culpa enim molestiae
              consequuntur aperiam unde maiores.
            </p>
          </div>
          <Field name="email" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              label="E-mail"
              aria-label="E-mail"
              placeholder="Eg. your@mail.com"
              type="email"
              autocomplete="email"
              :validation-status="errorMessage ? 'error' : undefined"
            >
              <template #validationMessage>
                {{ errorMessage }}
              </template>
            </FwbInput>
          </Field>
          <Field name="password" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              type="password"
              label="Password"
              aria-label="Password"
              placeholder="****"
              autocomplete="current-password"
              :validation-status="errorMessage ? 'error' : undefined"
            >
              <template #validationMessage>
                {{ errorMessage }}
              </template>
            </FwbInput>
          </Field>
          <div class="grid">
            <FwbButton
              type="submit"
              class="mb-4 justify-center"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
              Login
            </FwbButton>
            <div class="text-sm text-gray-500 dark:text-gray-300">
              Not registered?
              <RouterLink
                custom
                :to="{ name: 'users.create' }"
                v-slot="{ href }"
              >
                <FwbA
                  v-bind="{ href }"
                  color="text-blue-600 dark:text-blue-500"
                >
                  Create account
                </FwbA>
              </RouterLink>
            </div>
          </div>
        </form>
      </FwbCard>
    </div>
  </div>
</template>
