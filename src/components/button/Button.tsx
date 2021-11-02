import React, { useRef } from 'react'
import {
  TouchableHighlight,
  ViewStyle,
  StyleSheet,
  TextStyle,
  View,
  Animated
} from 'react-native'
import { useThemeColors } from '../../utils/theme'
import Text from '../../components/text'

import { ThemeColors, useThemedStyles } from '../../hooks/useThemedStyles'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    buttonContainer: {
      backgroundColor: themeColors.primary,
      borderRadius: 4
    },
    button: {
      padding: 16,
      borderRadius: 4
    },
    buttonContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: themeColors.staticWhite,
      fontSize: 16,
      fontWeight: 'bold'
    },
    icon: {
      marginLeft: 12
    }
  })

type ButtonProps = {
  title: string
  onPress: () => void
  icon?: React.ReactElement
  containerStyle?: ViewStyle
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const Button = ({
  title,
  onPress,
  icon,
  containerStyle,
  style,
  textStyle,
  disabled = false
}: ButtonProps) => {
  const styles = useThemedStyles(createStyles)
  const { primaryDark1 } = useThemeColors()
  const scale = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.97,
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
      <TouchableHighlight
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        underlayColor={primaryDark1}
        style={[styles.button, style]}
      >
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
        </View>
      </TouchableHighlight>
    </Animated.View>
  )
}

export default Button
