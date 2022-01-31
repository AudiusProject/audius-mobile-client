import { TextStyle } from 'react-native'

export const fontByWeight = {
  heavy: 'AvenirNextLTPro-Heavy',
  bold: 'AvenirNextLTPro-Bold',
  demiBold: 'AvenirNextLTPro-DemiBold',
  medium: 'AvenirNextLTPro-Medium',
  regular: 'AvenirNextLTPro-Regular',
  light: 'AvenirNextLTPro-Light',
  thin: 'AvenirNextLTPro-Thin',
  ultraLight: 'AvenirNextLTPro-UltLt'
}

export const font = (weight: keyof typeof fontByWeight): TextStyle => ({
  fontFamily: fontByWeight[weight]
})

export const typography: Record<'h1', TextStyle> = {
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fontByWeight.bold
  }
}
