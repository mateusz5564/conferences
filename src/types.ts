export interface ResetPasswordForm {
  email: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  username: string
}

export interface UserProfile {
  username: string
  user_id: string
}
