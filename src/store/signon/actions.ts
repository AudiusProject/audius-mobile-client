export const SIGN_IN_FAILED = 'SIGN_ON/SIGN_IN_FAILED'
export const SIGN_IN_FAILED_RESET = 'SIGN_ON/SIGN_IN_FAILED_RESET'
export const VALIDATE_EMAIL_FAILED = 'SIGN_ON/VALIDATE_EMAIL_FAILED'
export const VALIDATE_EMAIL_SUCEEDED = 'SIGN_ON/VALIDATE_EMAIL_SUCCEEDED'
export const VALIDATE_HANDLE_FAILED = 'SIGN_ON/VALIDATE_HANDLE_FAILED'
export const VALIDATE_HANDLE_SUCEEDED = 'SIGN_ON/VALIDATE_HANDLE_SUCCEEDED'

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

type SignupValidateHandleFailedAction = {
  type: typeof VALIDATE_HANDLE_FAILED
  error: any
}

type SignupValidateHandleSuceededAction = {
  type: typeof VALIDATE_HANDLE_SUCEEDED
}

export type SignonActions =
  | SigninFailedAction
  | SigninFailedResetAction
  | SignupValidateEmailFailedAction
  | SignupValidateEmailSuceededAction
  | SignupValidateHandleFailedAction
  | SignupValidateHandleSuceededAction

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
export const signupValidateHandleFailed = (error: string): SignupValidateHandleFailedAction => ({
  type: VALIDATE_HANDLE_FAILED,
  error
})
export const signupValidateHandleSuceeded = (): SignupValidateHandleSuceededAction => ({
  type: VALIDATE_HANDLE_SUCEEDED
})