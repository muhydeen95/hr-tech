export interface LoginRequestDTO {
  email: string,
  password: string
}

export interface LoginResponseDTO {
  token: string
}

export interface RegisterRequestDTO {
  firstName: string,
  middleName: string,
  lastName: string,
  phoneNumber: string,
  alternatePhoneNumber: string,
  email: string,
  alternateEmail: string,
  organizationName: string,
  password: string
}

export interface ForgotPassswordDTO {
  email: string,
  token: string,
}

export interface ResetPasswordDTO {
  newPassword: string,
  confirmNewPassword: string,
  token: string
}

export interface ResendLink {
  email: string,
}

export interface confirmEmail {
  email: string,
  token: string
}
