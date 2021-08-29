export const SIGN_IN_FAILED = 'SIGN_ON/SIGN_IN_FAILED'
export const SIGN_IN_FAILED_RESET = 'SIGN_ON/SIGN_IN_FAILED_RESET'
export const VALIDATE_EMAIL_FAILED = 'SIGN_ON/VALIDATE_EMAIL_FAILED'
export const VALIDATE_EMAIL_SUCEEDED = 'SIGN_ON/VALIDATE_EMAIL_SUCCEEDED'

type SigninFailedAction = {
  type: typeof SIGN_IN_FAILED
  error: string
}

type SigninFailedResetAction = {
  type: typeof SIGN_IN_FAILED_RESET
}

type SignupValidateEmailFailedAction = {
  type: typeof VALIDATE_EMAIL_FAILED
  error: any
}

type SignupValidateEmailSuceededAction = {
  type: typeof VALIDATE_EMAIL_SUCEEDED
  available: boolean
}

export type SignonActions =
  | SigninFailedAction
  | SigninFailedResetAction
  | SignupValidateEmailFailedAction
  | SignupValidateEmailSuceededAction

export const signinFailed = (error: string): SigninFailedAction => ({
  type: SIGN_IN_FAILED,
  error
})

export const signinFailedReset = (): SigninFailedResetAction => ({
  type: SIGN_IN_FAILED_RESET
})

export const signupValidateEmailFailed = (error: string): SignupValidateEmailFailedAction => ({
  type: VALIDATE_EMAIL_FAILED,
  error
})
export const signupValidateEmailSuceeded = (available: boolean): SignupValidateEmailSuceededAction => ({
  type: VALIDATE_EMAIL_SUCEEDED,
  available
})