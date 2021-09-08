import { NativeModules } from 'react-native'

import { showCastPicker } from '../../store/googleCast/controller'

import { MessageType, MessageHandlers } from '../types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.GOOGLE_CAST]: _ => {
    showCastPicker()
  },
  [MessageType.AIRPLAY]: _ => {
    const airplay = NativeModules.AirplayViewManager
    airplay.click()
  }
}
