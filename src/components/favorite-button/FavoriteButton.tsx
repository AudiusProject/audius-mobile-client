import React from 'react'

import { StyleProp, StyleSheet, ViewStyle, ImageStyle } from 'react-native'

import IconFavoriteOffDark from 'app/assets/animations/iconFavoriteTrackTileOffDark.json'
import IconFavoriteOffLight from 'app/assets/animations/iconFavoriteTrackTileOffLight.json'
import IconFavoriteOnDark from 'app/assets/animations/iconFavoriteTrackTileOnDark.json'
import IconFavoriteOnLight from 'app/assets/animations/iconFavoriteTrackTileOnLight.json'
import AnimatedButtonProvider from 'app/components/animated-button/AnimatedButtonProvider'
import { Theme, useThemeVariant } from 'app/utils/theme'

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22
  }
})

type FavoriteButtonProps = {
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
   * Style to apply to the icon
   */
  style?: StyleProp<ImageStyle>
  /**
   * Style to apply to the icon container
   */
  wrapperStyle?: StyleProp<ViewStyle>
}

const FavoriteButton = ({
  style,
  isActive = false,
  isDisabled = false,
  onPress = () => {},
  wrapperStyle
}: FavoriteButtonProps) => {
  const themeVariant = useThemeVariant()
  const isDarkMode = themeVariant === Theme.DARK

  return (
    <AnimatedButtonProvider
      isActive={isActive}
      isDisabled={isDisabled}
      isDarkMode={isDarkMode}
      iconLightJSON={[IconFavoriteOnLight, IconFavoriteOffLight]}
      iconDarkJSON={[IconFavoriteOnDark, IconFavoriteOffDark]}
      onPress={onPress}
      style={style}
      wrapperStyle={[styles.icon, wrapperStyle]}
    />
  )
}

export default FavoriteButton
