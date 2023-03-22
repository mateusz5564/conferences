<template>
  <v-sheet class="mt-6 pa-6" max-width="600" elevation="3" location="top">
    <h1 class="text-h4 text-center font-weight-medium">Rejestracja</h1>
    <v-alert v-if="errorMsg" class="mt-6 mb-2" type="error" variant="tonal">{{ errorMsg }}</v-alert>
    <vee-form @submit="onSubmit" :validation-schema="schema">
      <vee-field name="email" v-slot="{ field, errors }">
        <v-text-field
          label="Email"
          prepend-inner-icon="mdi-at"
          variant="underlined"
          v-bind="field"
          :error-messages="errors"
        />
      </vee-field>
      <vee-field name="password" v-slot="{ field, errors }">
        <v-text-field
          label="Hasło"
          prepend-inner-icon="mdi-lock-outline"
          variant="underlined"
          v-bind="field"
          :error-messages="errors"
        />
      </vee-field>
      <vee-field name="username" v-slot="{ field, errors }">
        <v-text-field
          label="Nazwa użytkownika"
          variant="underlined"
          v-bind="field"
          :error-messages="errors"
        />
      </vee-field>
      <v-btn
        class="mt-6 d-block mx-auto"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
        >Zarejestruj się</v-btn
      >
    </vee-form>
    <v-divider class="my-6" />
    <v-btn
      @click="$router.push('logowanie')"
      class="d-block mx-auto"
      variant="outlined"
      color="primary"
      >Logowanie</v-btn
    >
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import type { RegisterForm } from '@/types'
import { FirebaseError } from '@firebase/util'
import { firebaseErrors } from '@/includes/firebase'

export default defineComponent({
  name: 'RegisterView',
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:6',
        username: 'required|min:3',
      },
      isLoading: false,
      errorMsg: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signUpWithEmail']),
    async onSubmit(values: RegisterForm) {
      this.isLoading = true
      this.errorMsg = ''
      try {
        await this.signUpWithEmail(values)
        this.$router.replace('/')
      } catch (err) {
        if (err instanceof FirebaseError)
          this.errorMsg = firebaseErrors[err.code as keyof typeof firebaseErrors] || err.message
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>
