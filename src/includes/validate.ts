import type { App } from 'vue'
import { Form as VeeForm, Field as VeeField, defineRule, configure } from 'vee-validate'
import { email, required, min } from '@vee-validate/rules'

defineRule('email', email)
defineRule('required', required)
defineRule('min', min)

configure({
  generateMessage: (ctx) => {
    const messages = {
      email: 'Nieprawidłowy adres email.',
      required: `Pole ${ctx.field} jest wymagane.`,
      min: `Pole ${ctx.field} jest za krótkie.`,
    }

    return messages[ctx.rule?.name as keyof typeof messages]
      ? messages[ctx.rule?.name as keyof typeof messages]
      : `Pole ${ctx.field} nie jest poprawne.`
  },
})

export default {
  install(app: App) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
  },
}
