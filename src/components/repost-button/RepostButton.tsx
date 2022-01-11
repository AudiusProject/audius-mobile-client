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

type RepostButtonProps = {
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
   * Style to apply
   */
  styles?: {
    image?: StyleProp<ImageStyle>
    wrapper?: StyleProp<ViewStyle>
  }
}

const RepostButton = ({
  isActive = false,
  isDisabled = false,
  onPress = () => {},
  styles: stylesProp = {}
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
      style={[stylesProp.image]}
      wrapperStyle={[styles.icon, stylesProp.wrapper]}
    />
  )
}

export default RepostButton
