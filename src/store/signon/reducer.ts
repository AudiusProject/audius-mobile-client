import {
  SignonActions,
  SIGN_IN_FAILED,
  SIGN_IN_FAILED_RESET,
  VALIDATE_EMAIL_SUCEEDED,
  VALIDATE_EMAIL_FAILED,
  VALIDATE_HANDLE_SUCEEDED,
  VALIDATE_HANDLE_FAILED
} from './actions'

export type SigninState = {
  isError: boolean,
  emailIsAvailable: boolean,
  emailIsValid: boolean,
  handleIsValid: boolean,
  handleError: string
}

const initialSigninState = {
  isError: false,
  emailIsAvailable: true,
  emailIsValid: false,
  handleIsValid: false,
  handleError: ''
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
        emailIsValid: true
      }
    case VALIDATE_EMAIL_FAILED:
      console.log("VALIDATE_EMAIL_FAILED")
      return {
        ...state,
        emailIsAvailable: true,
        emailIsValid: false
      }
    case VALIDATE_HANDLE_SUCEEDED:
      console.log("VALIDATE_HANDLE_SUCEEDED")
      return {
        ...state,
        handleIsValid: true,
        handleError: ''
      }
    case VALIDATE_HANDLE_FAILED:
      console.log("VALIDATE_HANDLE_FAILED: " + action.error)
      return {
        ...state,
        handleIsValid: false,
        handleError: action.error
      }
    default:
      return state
  }
}

export default reducer
