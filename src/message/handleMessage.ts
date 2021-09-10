import { Platform } from 'react-native'
import { Dispatch } from 'redux'

import { AnalyticsMessage } from '../types/analytics'

import { messageHandlers as analytics } from './handlers/analytics'
import { messageHandlers as android } from './handlers/android'
import { messageHandlers as audio } from './handlers/audio'
import { messageHandlers as cast } from './handlers/cast'
import { messageHandlers as haptics } from './handlers/haptics'
import { messageHandlers as lifecycle } from './handlers/lifecycle'
import { messageHandlers as linking } from './handlers/linking'
import { messageHandlers as logging } from './handlers/logging'
import { messageHandlers as notification } from './handlers/notification'
import { messageHandlers as oauth } from './handlers/oauth'
import { messageHandlers as search } from './handlers/search'
import { messageHandlers as theme } from './handlers/theme'
import { messageHandlers as version } from './handlers/version'
import { Message, MessageHandlers } from './types'

const isIos = Platform.OS === 'ios'

const messageHandlers: Partial<MessageHandlers> = {
  ...analytics,
  ...(isIos ? {} : android),
  ...audio,
  ...cast,
  ...haptics,
  ...lifecycle,
  ...linking,
  ...logging,
  ...notification,
  ...oauth,
  ...search,
  ...theme,
  ...version
}

export const handleMessage = async (
  message: Message | AnalyticsMessage,
  dispatch: Dispatch,
  postMessage: (message: Message) => void,
  reload: () => void
) => {
  messageHandlers[message.type]?.(message, dispatch, postMessage, reload)
}
