import {
  SignonActions,
  SIGN_IN_FAILED,
  SIGN_IN_FAILED_RESET,
  VALIDATE_EMAIL_SUCEEDED,
  VALIDATE_EMAIL_FAILED
} from './actions'

export type SigninState = {
  isError: boolean,
  emailIsAvailable: boolean,
  emailIsValid: boolean
}

const initialSigninState = {
  isError: false,
  emailIsAvailable: true,
  emailIsValid: false
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
    case VALIDATE_EMAIL_SUCEEDED:
      console.log("VALIDATE_EMAIL_SUCEEDED available:" + action.available)
      return {
        ...state,
        emailIsAvailable: action.available,
        emailIsValid : true
      }
    case VALIDATE_EMAIL_FAILED:
      console.log("VALIDATE_EMAIL_FAILED")
      return {
        ...state,
        emailIsValid : false
      }
    default:
      return state
  }
}

export default reducer
