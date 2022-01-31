import { useContext } from 'react'

import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native'

import { ThemeContext } from '../components/theme/ThemeContext'
import { ThemeColors, useThemeColors } from '../utils/theme'

import { typography } from './typography'

type Theme = { palette: ThemeColors; typography: typeof typography }

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

type Styles<T extends NamedStyles<T>> = (theme: Theme) => T

export const makeStyles = <T extends NamedStyles<T>>(styles: Styles<T>) => {
  const useStyles = () => {
    const { getTheme } = useContext(ThemeContext)
    const themeMode = getTheme()
    const themeColors = useThemeColors()
    const palette = { mode: themeMode, ...themeColors }
    const theme: Theme = { palette, typography }
    const styleProps = styles(theme)
    return StyleSheet.create(styleProps)
  }
  return useStyles
}
