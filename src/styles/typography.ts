import { TextStyle } from 'react-native'

type FontWeight =
  | 'heavy'
  | 'bold'
  | 'demiBold'
  | 'medium'
  | 'regular'
  | 'light'
  | 'thin'
  | 'ultraLight'

export const fontByWeight: Record<FontWeight, string> = {
  heavy: 'AvenirNextLTPro-Heavy',
  bold: 'AvenirNextLTPro-Bold',
  demiBold: 'AvenirNextLTPro-DemiBold',
  medium: 'AvenirNextLTPro-Medium',
  regular: 'AvenirNextLTPro-Regular',
  light: 'AvenirNextLTPro-Light',
  thin: 'AvenirNextLTPro-Thin',
  ultraLight: 'AvenirNextLTPro-UltLt'
}

export const font = (weight: FontWeight): TextStyle => ({
  fontFamily: fontByWeight[weight]
})

export const typography = {
  h1: {
    fontSize: 18,
    fontFamily: fontByWeight.bold,
    marginBottom: 18 * 0.35
  },
  h2: {
    fontSize: 14,
    fontFamily: fontByWeight.medium,
    marginBottom: 14 * 0.35
  },
  body: {
    fontSize: 14,
    fontFamily: fontByWeight.medium,
    marginBottom: 14 * 0.35
  },
  fontByWeight
}
