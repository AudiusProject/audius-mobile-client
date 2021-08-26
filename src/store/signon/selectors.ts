import { AppState } from '../'

const getBaseState = (state: AppState) => state.signin

export const getIsSigninError = (state: AppState) => getBaseState(state).isError