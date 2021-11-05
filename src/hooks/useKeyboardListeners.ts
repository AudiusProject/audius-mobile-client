import React, { useEffect } from 'react'
import { Keyboard } from 'react-native'
import { WebView } from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { MessageType } from '../message'
import { postMessage } from '../utils/postMessage'
import * as signonActions from '../store/signon/actions'

export const useKeyboardListeners = (webRef: React.Ref<WebView>) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const didShowListener = Keyboard.addListener('keyboardDidShow', () => {
      dispatch(signonActions.setKeyboardVisible(true))
      if (webRef.current) {
        postMessage(webRef.current, {
          type: MessageType.KEYBOARD_VISIBLE,
          isAction: true
        })
      }
    })

    const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
      dispatch(signonActions.setKeyboardVisible(false))
      if (webRef.current) {
        postMessage(webRef.current, {
          type: MessageType.KEYBOARD_HIDDEN,
          isAction: true
        })
      }
    })

    return () => {
      didShowListener.remove()
      didHideListener.remove()
    }
  }, [webRef])
}

export default useKeyboardListeners
