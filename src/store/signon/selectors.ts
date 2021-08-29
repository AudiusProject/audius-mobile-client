import { AppState } from '../'

const getBaseState = (state: AppState) => state.signin

export const getIsSigninError = (state: AppState) => getBaseState(state).isError
export const getEmailIsAvailable = (state: AppState) => getBaseState(state).emailIsAvailable
export const getEmailIsValid = (state: AppState) => getBaseState(state).emailIsValid