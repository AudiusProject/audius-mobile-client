import React, { useRef, useEffect } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

import createRootReducer from 'app/store'
import WebApp from 'app/components/web/WebApp'
import Audio from 'app/components/audio/Audio'
import GoogleCast from 'app/components/audio/GoogleCast'
import OAuth from 'app/components/oauth/OAuth'
import PushNotifications from 'app/notifications'
import { setup as setupAnalytics } from 'app/utils/analytics'
import useConnectivity from 'app/components/web/useConnectivity'
import { incrementSessionCount } from 'app/hooks/useSessionCount'
import Notifications from 'app/components/notifications/Notifications'
import Search from 'app/components/search/Search'
import { WebRefContextProvider } from 'app/components/web/WebRef'
import BottomBar from 'app/components/bottom-bar'

const store = createStore(
  createRootReducer(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const dispatch = store.dispatch

const Airplay = Platform.select({
  ios: () => require('./components/audio/Airplay').default,
  android: () => () => null
})()

// Increment the session count when the App.tsx code is first run
incrementSessionCount()

const App = () => {
  // Track the web view as a top-level ref so that any children can use it
  // to send messages to the dapp
  const webRef = useRef<WebView>(null)

  // Broadcast connectivity to the wrapped dapp
  useConnectivity({ webRef })

  // Configure push notifications so that it has access to the web view
  // and can message pass to it
  useEffect(() => {
    PushNotifications.setWebRef(webRef)
  }, [webRef])

  useEffect(() => {
    setupAnalytics()
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <WebRefContextProvider>
          <GoogleCast webRef={webRef} />
          <WebApp webRef={webRef} />
          <Search />
          {/*
        Note: it is very important that Notifications is rendered after WebApp.
        On Android, regardless of position: absolute, WebApp will steal all of Notifications
        touch targets and onPress will not work.
      */}
          <Notifications webRef={webRef} />

          {/*
            Commenting out BottomBar until the drawers and overlays are migrated to RN
          */}
          {/* <BottomBar /> */}
          <Audio webRef={webRef} />
          <OAuth webRef={webRef} />
          <Airplay webRef={webRef} />
        </WebRefContextProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
