import { combineReducers } from 'redux'

import audio, { AudioState } from './audio/reducer'
import clientStore from './clientStore/slice'
import googleCast, { GoogleCastState } from './googleCast/reducer'
import lifecycle, { LifecycleState } from './lifecycle/reducer'
import notifications, { NotificationsState } from './notifications/reducer'
import oauth, { OAuthState } from './oauth/reducer'
import search, { SearchState } from './search/reducer'
import theme, { ThemeState } from './theme/reducer'
import web, { WebState } from './web/reducer'

export type AppState = {
  audio: AudioState
  web: WebState
  oauth: OAuthState
  lifecycle: LifecycleState
  googleCast: GoogleCastState
  notifications: NotificationsState
  theme: ThemeState
  search: SearchState
  clientStore: any
}

const createRootReducer = () =>
  combineReducers({
    clientStore,
    audio,
    web,
    oauth,
    lifecycle,
    googleCast,
    notifications,
    theme,
    search
  })

export default createRootReducer
