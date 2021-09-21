import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { TouchableWithoutFeedback, View, ViewStyle } from 'react-native'

import LottieView from 'lottie-react-native'

import useInstanceVar from 'audius-client/src/common/hooks/useInstanceVar'

export type BaseAnimatedButtonProps = {
  onClick: () => void
  uniqueKey: string
  isActive: boolean
  isDisabled?: boolean
  className?: string
  stopPropagation?: boolean
  isMatrix: boolean
  style: ViewStyle
  wrapperStyle: ViewStyle

  // If we mount in the active state,
  // should we animate that transition or not?
  disableAnimationOnMount?: boolean
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
  uniqueKey,
  isDisabled = false,
  className = '',
  stopPropagation = false,
  disableAnimationOnMount = true,
  style,
  wrapperStyle
}: AnimatedButtonProps) => {
  const [isPaused, setIsPaused] = useState(true)
  // The key suffix is used to reset the animation (i.e. time = 0)
  const [keySuffix, setKeySuffix] = useState(0)

  const [getDidMount, setDidMount] = useInstanceVar(false)

  useEffect(() => {
    if (isActive) {
      if (!disableAnimationOnMount || getDidMount()) {
        setIsPaused(false)
      }
    } else {
      setKeySuffix(keySuffix => keySuffix + 1)
      setIsPaused(true)
    }
  }, [isActive, disableAnimationOnMount, getDidMount])

  useEffect(() => {
    setDidMount(true)
  }, [setDidMount])

  const handleClick = useCallback(() => {
    if (isDisabled) return

    onClick()
  }, [isDisabled, onClick, stopPropagation])

  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={wrapperStyle}>
          <LottieView
            // We construct a unique here with a suffix that changes each time
            // isActive is changed to false. This allows the parent of this component
            // to reset the state of other animated buttons.
            key={`${uniqueKey}-${keySuffix}`}
            loop={false}
            autoPlay={false}
            source={iconJSON}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
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
