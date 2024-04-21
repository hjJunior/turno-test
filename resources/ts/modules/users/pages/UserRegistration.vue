<script setup lang="ts">
import { FwbA, FwbButton, FwbCard, FwbHeading, FwbInput } from "flowbite-vue";
import { Field, Form } from "vee-validate";
import { RouterLink } from "vue-router";
import useSignUpForm from "../hooks/useSignUpForm";

const { onSubmit, isSubmitting } = useSignUpForm();
</script>

<template>
  <div class="mx-auto max-w-5xl px-2">
    <div class="flex items-center justify-center pt-8">
      <FwbCard class="p-5 w-full sm:min-w-80" variant="image">
        <form @submit="onSubmit" class="grid gap-4">
          <div>
            <FwbHeading tag="h5" class="mb-2">Registration</FwbHeading>
            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur, culpa enim molestiae
              consequuntur aperiam unde maiores.
            </p>
          </div>
          <Field name="name" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              label="Name"
              aria-label="Name"
              placeholder="Eg. Jhon Doe"
              :validation-status="errorMessage ? 'error' : undefined"
            >
              <template #validationMessage>
                {{ errorMessage }}
              </template>
            </FwbInput>
          </Field>
          <Field name="email" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              label="E-mail"
              aria-label="E-mail"
              placeholder="Eg. your@mail.com"
              :validation-status="errorMessage ? 'error' : undefined"
            >
              <template #validationMessage>
                {{ errorMessage }}
              </template>
            </FwbInput>
          </Field>
          <Field name="username" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              label="Username"
              aria-label="Username"
              placeholder="Eg. nickname2024"
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
              :validation-status="errorMessage ? 'error' : undefined"
            >
              <template #validationMessage>
                {{ errorMessage }}
              </template>
            </FwbInput>
          </Field>
          <Field name="password_confirmation" v-slot="{ field, errorMessage }">
            <FwbInput
              v-bind="field"
              type="password"
              label="Password confirmation"
              aria-label="Password confirmation"
              placeholder="****"
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
              Sign Up
            </FwbButton>
            <div class="text-sm text-gray-500 dark:text-gray-300">
              Already have a account?
              <RouterLink custom :to="{ name: 'auth.login' }" v-slot="{ href }">
                <FwbA
                  v-bind="{ href }"
                  color="text-blue-600 dark:text-blue-500"
                >
                  Sign in
                </FwbA>
              </RouterLink>
            </div>
          </div>
        </form>
      </FwbCard>
    </div>
  </div>
</template>
