import React, { memo, useState, useEffect, useRef, useCallback } from 'react'

import LottieView from 'lottie-react-native'
import { TouchableHighlight, View, ViewStyle } from 'react-native'

import { useColor } from 'app/utils/theme'

export type BaseAnimatedButtonProps = {
  onPress: () => void
  uniqueKey: string
  isActive: boolean
  isDisabled?: boolean
  style: ViewStyle
  wrapperStyle: ViewStyle
}

type IconJSON = any

type AnimatedButtonProps = {
  iconJSON: IconJSON
} & BaseAnimatedButtonProps

const AnimatedButton = ({
  iconJSON,
  onPress,
  isActive,
  isDisabled = false,
  style,
  wrapperStyle
}: AnimatedButtonProps) => {
  const underlayColor = useColor('neutralLight8')
  const animationRef = useRef<LottieView | null>()
  useEffect(() => {
    if (isActive) {
      const lastFrame = iconJSON.op
      animationRef.current?.play(lastFrame, lastFrame)
    } else {
      animationRef.current?.play(0, 0)
    }
  }, [isActive, iconJSON])

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return
    }

    if (!isActive) {
      animationRef.current?.play()
    }

    onPress()
  }, [isDisabled, onPress, isActive])

  return (
    <TouchableHighlight
      onPress={handleClick}
      style={style}
      underlayColor={underlayColor}
    >
      <View style={wrapperStyle}>
        <LottieView
          ref={animation => (animationRef.current = animation)}
          loop={false}
          source={iconJSON}
        />
      </View>
    </TouchableHighlight>
  )
}

export type AnimatedButtonProviderProps = {
  isDarkMode: boolean
  iconDarkJSON: any
  iconLightJSON: any
} & BaseAnimatedButtonProps

const AnimatedButtonProvider = ({
  isDarkMode,
  iconDarkJSON,
  iconLightJSON,
  ...buttonProps
}: AnimatedButtonProviderProps) => {
  const [iconJSON, setIconJSON] = useState<IconJSON | null>(null)
  const defaultAnimations = useRef<IconJSON | null>(null)
  const darkAnimations = useRef<IconJSON | null>(null)

  useEffect(() => {
    if (isDarkMode) {
      if (!darkAnimations.current) {
        darkAnimations.current = iconDarkJSON
      }
      setIconJSON({ ...darkAnimations.current })
    } else {
      if (!defaultAnimations.current) {
        defaultAnimations.current = iconLightJSON
      }
      setIconJSON({ ...defaultAnimations.current })
    }
  }, [isDarkMode, setIconJSON, iconDarkJSON, iconLightJSON])

  return iconJSON && <AnimatedButton iconJSON={iconJSON} {...buttonProps} />
}

export default memo(AnimatedButtonProvider)
