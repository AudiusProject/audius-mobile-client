import VersionNumber from 'react-native-version-number'

import * as themeActions from '../../store/theme/actions'
import * as haptics from '../../haptics'
import {
  getInitialDarkModePreference,
  getPrefersDarkModeChange
} from '../../theme'
import { handleWebAppLog } from '../../utils/logging'
import { handleThemeChange } from '../../utils/theme'

let sentInitialTheme = false

import { MessageType, MessageHandlers } from '../types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.LOGGING]: message => {
    handleWebAppLog(message.level, message.message)
  },
  [MessageType.THEME_CHANGE]: (message, dispatch) => {
    dispatch(themeActions.set(message.theme))
    handleThemeChange(message.theme)
  },
  [MessageType.PREFERS_COLOR_SCHEME]: async (message, _, postMessage) => {
    let prefers
    if (!sentInitialTheme) {
      prefers = getInitialDarkModePreference()
      sentInitialTheme = true
    } else {
      prefers = await getPrefersDarkModeChange()
    }
    postMessage({
      type: message.type,
      id: message.id,
      prefersDarkMode: prefers
    })
  },
  [MessageType.GET_VERSION]: (message, _, postMessage) => {
    const version = VersionNumber.appVersion
    postMessage({
      type: message.type,
      id: message.id,
      version
    })
  },
  [MessageType.HAPTIC_FEEDBACK]: _ => {
    haptics.light()
  }
}
