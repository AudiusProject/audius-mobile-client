import React, { useRef } from 'react'

import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    buttonContainer: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      height: 24,
      width: 24
    }
  })

export type IconButtonProps = {
  onPress?: () => void
  icon: React.FC<
    SvgProps & {
      fillSecondary?: string
    }
  >
  containerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

/**
 * A button with touchable feedback that is only an
 * icon. Different from a Button in that it has no
 * container.
 */
const IconButton = ({
  onPress,
  icon: Icon,
  containerStyle,
  style,
  disabled
}: IconButtonProps) => {
  const styles = useThemedStyles(createStyles)
  const scale = useRef(new Animated.Value(1)).current
  const { neutral } = useThemeColors()

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 100,
      delay: 0,
      useNativeDriver: true
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      delay: 0,
      useNativeDriver: true
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { transform: [{ scale }] },
        containerStyle
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.95}
        style={[styles.button, style]}
      >
        <Icon fill={neutral} height='100%' width='100%' />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default IconButton
