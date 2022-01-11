import { StyleSheet } from 'react-native'

import { flexRowCentered } from 'app/styles'
import { ThemeColors } from 'app/utils/theme'

export const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    statItem: {
      ...flexRowCentered(),
      marginHorizontal: 10
    },
    statText: {
      fontSize: 12,
      letterSpacing: 0.2,
      color: themeColors.neutralLight4,
      fontFamily: 'AvenirNextLTPro-Medium'
    }
  })
