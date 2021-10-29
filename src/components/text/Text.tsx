import React from 'react'

import { Text as RNText } from 'react-native'

const FONT = 'AvenirNextLTPro'

type FontWeight =
  | 'Heavy'
  | 'Bold'
  | 'Medium'
  | 'Regular'
  | 'Light'
  | 'Thin'
  | 'UltLt'

type Props = {
  children: React.ReactNode
  weight?: FontWeight
} & ConstructorParameters<typeof RNText>[0]

/**
 * A custom Text component that applies the default font family
 * and accepts a weight prop
 */
const Text = ({ children, weight = 'Regular', style, ...props }: Props) => {
  const fontFamily = `${FONT}-${weight}`
  return (
    <RNText style={[{ fontFamily }, style]} {...props}>
      {children}
    </RNText>
  )
}

export default Text
