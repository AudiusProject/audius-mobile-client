export const SIGN_IN_FAILED = 'SIGN_ON/SIGN_IN_FAILED'
export const SIGN_IN_FAILED_RESET = 'SIGN_IN_FAILED_RESET'

type SigninFailedAction = {
  type: typeof SIGN_IN_FAILED
  error: string
}

type SigninFailedResetAction = {
  type: typeof SIGN_IN_FAILED_RESET
}

export type SignonActions =
  | SigninFailedAction
  | SigninFailedResetAction

export const signinFailed = (error: string): SigninFailedAction => ({
  type: SIGN_IN_FAILED,
  error
})

export const signinFailedReset = (): SigninFailedResetAction => ({
  type: SIGN_IN_FAILED_RESET
})