import React from 'react'

import { Animated, Text as RNText } from 'react-native'

import { useThemeColors } from 'app/utils/theme'

const fontByWeight = {
  heavy: 'AvenirNextLTPro-Heavy',
  bold: 'AvenirNextLTPro-Bold',
  demiBold: 'AvenirNextLTPro-DemiBold',
  medium: 'AvenirNextLTPro-Medium',
  regular: 'AvenirNextLTPro-Regular',
  light: 'AvenirNextLTPro-Light',
  thin: 'AvenirNextLTPro-Thin',
  ultraLight: 'AvenirNextLTPro-UltLt'
}

type Props = {
  children: React.ReactNode
  weight?: keyof typeof fontByWeight
} & ConstructorParameters<typeof RNText>[0]

/**
 * A custom Text component that applies the default font family and color
 */
const Text = ({ children, weight = 'regular', style, ...props }: Props) => {
  const { neutral } = useThemeColors()
  return (
    <RNText
      style={[{ color: neutral, fontFamily: fontByWeight[weight] }, style]}
      {...props}
    >
      {children}
    </RNText>
  )
}

type AnimatedProps = {
  children: React.ReactNode
  weight?: keyof typeof fontByWeight
} & Parameters<typeof Animated.Text>[0]

/**
 * A custom Animated.Text component that applies the default font family and color
 */
export const AnimatedText = ({
  children,
  weight = 'regular',
  style,
  ...props
}: AnimatedProps) => {
  const { neutral } = useThemeColors()
  return (
    <Animated.Text
      style={[{ color: neutral, fontFamily: fontByWeight[weight] }, style]}
      {...props}
    >
      {children}
    </Animated.Text>
  )
}

export default Text
