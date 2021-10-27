import { useMemo } from 'react'
import { StyleSheet } from 'react-native'

import { ThemeColors, useThemeColors } from '../utils/theme'

export { ThemeColors } from '../utils/theme'

/**
 * This hook will return the result of passing the currently selected theme colors
 * to the provided createStyles function
 * @param createStyles A function accepting ThemeColors and returning a StyleSheet
 * @returns StyleSheet
 *
 * Example:
 *
 * const unthemedStyles = (themeColors: ThemeColors) =>
 *   StyleSheet.create({
 *     view: {
 *       color: themeColors.neutralLight4,
 *     },
 *   })
 *
 *
 * const styles = useThemedStyles(unthemedStyles)
 */
export const useThemedStyles = <T>(
  createStyles: (themeColors: ThemeColors) => StyleSheet.NamedStyles<T>
) => {
  const theme = useThemeColors()
  return useMemo(() => createStyles(theme), [createStyles, theme])
}
