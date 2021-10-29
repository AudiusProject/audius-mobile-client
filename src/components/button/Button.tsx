import React from 'react'
import { Text, TouchableHighlight, ViewStyle, StyleSheet } from 'react-native'
import { useColor, useThemeColors } from '../../utils/theme'

import { ThemeColors, useThemedStyles } from '../../hooks/useThemedStyles'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    button: {
      backgroundColor: themeColors.primary,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      padding: 16
    },
    text: {
      color: themeColors.white,
      fontFamily: 'AvenirNextLTPro-Bold',
      fontSize: 16
    }
  })

type ButtonProps = {
  onPress: () => void
  title: string
  style?: ViewStyle
}

const Button = ({ style, onPress, title }: ButtonProps) => {
  const styles = useThemedStyles(createStyles)
  const { primaryDark1 } = useThemeColors()
  return (
    <TouchableHighlight
      style={[styles.button, style]}
      onPress={onPress}
      underlayColor={primaryDark1}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  )
}

export default Button