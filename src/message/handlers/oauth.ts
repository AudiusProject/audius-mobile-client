import * as oauthActions from 'app/store/oauth/actions'
import { Provider } from 'app/store/oauth/reducer'

import { MessageType, MessageHandlers } from '../types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.REQUEST_TWITTER_AUTH]: ({ message, dispatch }) => {
    return dispatch(oauthActions.openPopup(message, Provider.TWITTER))
  },
  [MessageType.REQUEST_INSTAGRAM_AUTH]: ({ message, dispatch }) => {
    return dispatch(oauthActions.openPopup(message, Provider.INSTAGRAM))
  },
  [MessageType.REQUEST_TIKTOK_AUTH]: ({ message, dispatch }) => {
    return dispatch(oauthActions.openPopup(message, Provider.TIKTOK))
  }
}
