import { Platform } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import { MobileOS } from './models/OS'

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false
}

export const light = () => {
  if (Platform.OS === MobileOS.ANDROID) {
    // @ts-ignore
    ReactNativeHapticFeedback.trigger('keyboardPress', options)
  } else {
    ReactNativeHapticFeedback.trigger('impactLight', options)
  }
}
