declare module 'react-native-static-server'

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<
    SvgProps & {
      fillSecondary?: string
    }
  >
  export default content
}

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native'
  const value: ImageSourcePropType
  export default value
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native'
  const value: ImageSourcePropType
  export default value
}
