import { StyleSheet } from 'react-native'

import { ThemeColors } from 'app/utils/theme'

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    statText: {
      fontSize: 12,
      letterSpacing: 0.2,
      color: themeColors.neutralLight4,
      fontFamily: 'AvenirNextLTPro-Medium'
    }
  })
