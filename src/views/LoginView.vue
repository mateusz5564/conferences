<template>
  <v-sheet class="mt-6 pa-6" max-width="600" elevation="3" location="top">
    <h1 class="text-h4 text-center font-weight-medium">Logowanie</h1>
    <v-alert v-if="loginErrorMsg" class="mt-6 mb-2" type="error" variant="tonal">{{
      loginErrorMsg
    }}</v-alert>
    <vee-form @submit="onLogin" :validation-schema="loginSchema">
      <vee-field name="email" v-slot="{ field, errors }">
        <v-text-field
          class="mb-2"
          label="Email"
          prepend-inner-icon="mdi-at"
          variant="underlined"
          v-bind="field"
          :error-messages="errors"
        />
      </vee-field>
      <vee-field name="password" v-slot="{ field, errors }">
        <v-text-field
          class="mb-2"
          label="Hasło"
          prepend-inner-icon="mdi-lock-outline"
          variant="underlined"
          v-bind="field"
          :error-messages="errors"
        />
      </vee-field>
      <v-btn class="d-block" variant="text" color="primary" size="x-small"
        >Przypomnij hasło
        <v-dialog activator="parent" width="500">
          <v-card>
            <v-card-title class="text-center">Zresetuj hasło</v-card-title>
            <v-card-subtitle class="text-wrap text-center font-weight-medium"
              >Aby zresetować hasło, podaj adres email swojego konta, zostanie na niego wysłany link
              resetujący hasło.</v-card-subtitle
            >
            <v-card-text>
              <v-alert v-if="resetErrorMsg" class="mt-6 mb-2" type="error" variant="tonal">{{
                resetErrorMsg
              }}</v-alert>
              <vee-form @submit="onPasswordReset" :validation-schema="resetSchema">
                <vee-field name="email" v-slot="{ field, errors }">
                  <v-text-field
                    class="mb-6"
                    label="Email"
                    prepend-inner-icon="mdi-at"
                    variant="underlined"
                    v-bind="field"
                    :error-messages="errors"
                  />
                </vee-field>
                <v-btn
                  class="mx-auto d-block"
                  type="submit"
                  color="primary"
                  :loading="isResetLoading"
                  :disabled="isResetLoading"
                  >Wyślij</v-btn
                >
              </vee-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-btn
        class="mt-6 d-block mx-auto"
        variant="elevated"
        color="primary"
        type="submit"
        :loading="isLoginLoading"
        :disabled="isLoginLoading"
        >Zaloguj się</v-btn
      >
    </vee-form>
    <v-divider class="my-6" />
    <v-btn
      @click="$router.push('rejestracja')"
      class="d-block mx-auto"
      variant="outlined"
      color="primary"
      >Załóż konto</v-btn
    >
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'
import type { LoginForm, ResetPasswordForm } from '@/types'
import { FirebaseError } from '@firebase/util'
import { firebaseErrors } from '@/includes/firebase'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6',
      },
      resetSchema: {
        email: 'required|email',
      },
      isLoginLoading: false,
      isResetLoading: false,
      loginErrorMsg: '',
      resetErrorMsg: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signInWithEmail', 'resetPassword']),
    async onLogin(values: LoginForm) {
      this.isLoginLoading = true
      this.loginErrorMsg = ''
      try {
        await this.signInWithEmail(values)
        this.$router.replace('/')
      } catch (err) {
        this.isLoginLoading = false
        if (err instanceof FirebaseError)
          this.loginErrorMsg =
            firebaseErrors[err.code as keyof typeof firebaseErrors] || err.message
      } finally {
        this.isLoginLoading = false
      }
    },
    async onPasswordReset(values: ResetPasswordForm) {
      this.isResetLoading = true
      this.resetErrorMsg = ''
      try {
        await this.resetPassword(values)
        this.isResetLoading = false
      } catch (err) {
        if (err instanceof FirebaseError)
          this.resetErrorMsg =
            firebaseErrors[err.code as keyof typeof firebaseErrors] || err.message
        this.isResetLoading = false
      } finally {
        this.isResetLoading = false
      }
    },
  },
})
</script>
