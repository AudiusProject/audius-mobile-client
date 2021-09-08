import { Dispatch } from 'redux'
import { Platform } from 'react-native'
import { AnalyticsMessage } from '../types/analytics'

import { Message, MessageHandlers } from './types'
import { messageHandlers as audio } from './handlers/audio'
import { messageHandlers as cast } from './handlers/cast'
import { messageHandlers as notification } from './handlers/notification'
import { messageHandlers as search } from './handlers/search'
import { messageHandlers as lifecycle } from './handlers/lifecycle'
import { messageHandlers as oauth } from './handlers/oauth'
import { messageHandlers as android } from './handlers/android'
import { messageHandlers as global } from './handlers/global'
import { messageHandlers as linking } from './handlers/linking'

const isIos = Platform.OS === 'ios'

const messageHandlers: Partial<MessageHandlers> = {
  ...audio,
  ...cast,
  ...notification,
  ...search,
  ...lifecycle,
  ...oauth,
  ...global,
  ...linking,
  ...(isIos ? {} : android)
}

export const handleMessage = async (
  message: Message | AnalyticsMessage,
  dispatch: Dispatch,
  postMessage: (message: Message) => void,
  reload: () => void
) => {
  messageHandlers[message.type]?.(message, dispatch, postMessage, reload)
}
