import { take, put } from 'redux-saga/effects'

import {
  REQUEST_NATIVE_OPEN_POPUP,
  nativeOpenPopup,
  SET_CREDENTIALS,
  SetCredentialsAction,
  RequestNativeOpenPopupAction
} from './actions'
import { Credentials } from './types'

let resolve: (c: Credentials) => void
let reject: (e: Error) => void

function* watchRequestNativeOpenPopup() {
  const action: RequestNativeOpenPopupAction = yield take(
    REQUEST_NATIVE_OPEN_POPUP
  )
  resolve = action.resolve
  reject = action.reject
  yield put(nativeOpenPopup(action.url, action.provider))
}

function* watchSetCredentials() {
  const action: SetCredentialsAction = yield take(SET_CREDENTIALS)

  if (!action.credentials.error) {
    if (resolve) {
      resolve(action.credentials)
    }
  } else {
    if (reject) {
      reject(action.credentials.error)
    }
  }

  resolve = null
  reject = null
}

const sagas = () => {
  return [watchRequestNativeOpenPopup, watchSetCredentials]
}

export default sagas
