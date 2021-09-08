import * as lifecycleActions from '../../store/lifecycle/actions'
import { checkConnectivity, Connectivity } from '../../utils/connectivity'

import { MessageType, MessageHandlers } from '../types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.BACKEND_SETUP]: (_, dispatch) => {
    dispatch(lifecycleActions.backendLoaded())
  },
  [MessageType.RELOAD]: (_, dispatch, __, reload) => {
    dispatch(lifecycleActions.backendTearDown())
    reload()
  },
  [MessageType.SIGNED_IN]: (message, dispatch) => {
    dispatch(lifecycleActions.signedIn(message.account))
  },
  [MessageType.REQUEST_NETWORK_CONNECTED]: (_, __, postMessage) => {
    const isConnected = checkConnectivity(Connectivity.netInfo)
    postMessage({
      type: MessageType.IS_NETWORK_CONNECTED,
      isConnected,
      isAction: true
    })
  },
  [MessageType.ON_FIRST_PAGE]: (_, dispatch) => {
    dispatch(lifecycleActions.onFirstPage())
  },
  [MessageType.NOT_ON_FIRST_PAGE]: (_, dispatch) => {
    dispatch(lifecycleActions.notOnFirstPage())
  },
  [MessageType.CHANGED_PAGE]: (message, dispatch) => {
    dispatch(lifecycleActions.changedPage(message.location))
  }
}
