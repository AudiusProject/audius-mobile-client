import React from 'react'

import { StyleProp, StyleSheet, ViewStyle, ImageStyle } from 'react-native'

import IconRepostOffDark from 'app/assets/animations/iconRepostTrackTileOffDark.json'
import IconRepostOffLight from 'app/assets/animations/iconRepostTrackTileOffLight.json'
import IconRepostOnDark from 'app/assets/animations/iconRepostTrackTileOnDark.json'
import IconRepostOnLight from 'app/assets/animations/iconRepostTrackTileOnLight.json'
import AnimatedButtonProvider from 'app/components/animated-button/AnimatedButtonProvider'
import { Theme, useThemeVariant } from 'app/utils/theme'

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22
  }
})

// TODO: sk - convert to styles prop
type RepostButtonProps = {
  /**
   * Style to apply to the icon
   */
  style?: StyleProp<ImageStyle>
  /**
   *  Whether or not the icon is active (filled)
   */
  isActive?: boolean
  /**
   * Whether or not the icon is disabled
   */
  isDisabled?: boolean
  /**
   * Callback when the icon is pressed
   */
  onPress?: () => void
  /**
   * Style to apply to the icon container
   */
  wrapperStyle?: StyleProp<ViewStyle>
}

const RepostButton = ({
  style,
  isActive = false,
  isDisabled = false,
  onPress = () => {},
  wrapperStyle
}: RepostButtonProps) => {
  const themeVariant = useThemeVariant()
  const isDarkMode = themeVariant === Theme.DARK

  return (
    <AnimatedButtonProvider
      isActive={isActive}
      isDisabled={isDisabled}
      isDarkMode={isDarkMode}
      iconLightJSON={[IconRepostOnLight, IconRepostOffLight]}
      iconDarkJSON={[IconRepostOnDark, IconRepostOffDark]}
      onPress={onPress}
      style={[style]}
      wrapperStyle={[styles.icon, wrapperStyle]}
    />
  )
}

export default RepostButton
