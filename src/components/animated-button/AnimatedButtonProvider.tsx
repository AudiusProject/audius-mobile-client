import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'

import LottieView from 'lottie-react-native'

import AnimatedLottieView from 'lottie-react-native'

export type BaseAnimatedButtonProps = {
  onClick: () => void
  uniqueKey: string
  isActive: boolean
  isDisabled?: boolean
  stopPropagation?: boolean
  isMatrix: boolean
  style: ViewStyle
  wrapperStyle: ViewStyle
}

type IconJSON = any

type AnimatedButtonProps = {
  iconJSON: IconJSON
} & BaseAnimatedButtonProps

const AnimatedButton = ({
  iconJSON,
  onClick,
  isActive,
  isMatrix,
  isDisabled = false,
  stopPropagation = false,
  style,
  wrapperStyle
}: AnimatedButtonProps) => {
  const animationRef = useRef<AnimatedLottieView | null>()
  useEffect(() => {
    if (isActive) {
      const lastFrame = iconJSON.op
      animationRef.current?.play(lastFrame, lastFrame)
    } else {
      animationRef.current?.play(0, 0)
    }
  }, [isActive])

  const handleClick = useCallback(() => {
    if (isDisabled) return
    animationRef.current?.play()

    onClick()
  }, [isDisabled, onClick, stopPropagation])

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={style}>
        <View style={wrapperStyle}>
          <LottieView
            ref={animation => (animationRef.current = animation)}
            source={iconJSON}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export type AnimatedButtonProviderProps = {
  darkMode: boolean
  isMatrix: boolean
  iconDarkJSON: () => any
  iconLightJSON: () => any
} & BaseAnimatedButtonProps

const AnimatedButtonProvider = ({
  darkMode,
  iconDarkJSON,
  iconLightJSON,
  ...buttonProps
}: AnimatedButtonProviderProps) => {
  const [iconJSON, setIconJSON] = useState<IconJSON | null>(null)
  const defaultAnimations = useRef<IconJSON | null>(null)
  const darkAnimations = useRef<IconJSON | null>(null)

  useEffect(() => {
    if (darkMode) {
      if (!darkAnimations.current) {
        darkAnimations.current = iconDarkJSON()
      }
      setIconJSON({ ...darkAnimations.current })
    } else {
      if (!defaultAnimations.current) {
        defaultAnimations.current = iconLightJSON()
      }
      setIconJSON({ ...defaultAnimations.current })
    }
  }, [darkMode, setIconJSON, iconDarkJSON, iconLightJSON])

  return iconJSON && <AnimatedButton iconJSON={iconJSON} {...buttonProps} />
}

export default memo(AnimatedButtonProvider)
