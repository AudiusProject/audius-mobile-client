import {
  SignonActions,
  SIGN_IN_FAILED,
  SIGN_IN_FAILED_RESET
} from './actions'

export type SigninState = {
  isError: boolean
}

const initialSigninState = {
  isError: false,
}

const reducer = (
  state: SigninState = initialSigninState,
  action: SignonActions
) => {
  switch (action.type) {
    case SIGN_IN_FAILED:
      return {
        ...state,
        isError: true
      }
    case SIGN_IN_FAILED_RESET:
      console.log("SIGN_IN_FAILED_RESET")
      return {
        ...state,
        isError: false
      }
    default:
      return state
  }
}

export default reducer
