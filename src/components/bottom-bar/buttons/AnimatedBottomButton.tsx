import React from 'react'

import AnimatedButtonProvider, {
  AnimatedButtonProviderProps
} from 'app/animated-button/AnimatedButtonProvider'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  animatedButton: {
    width: '20%',
    display: 'flex',
    alignItems: 'center'
  },

  iconWrapper: {
    width: 28,
    height: 49
  }
})

const AnimatedBottomButton = (
  props: Omit<AnimatedButtonProviderProps, 'style' | 'wrapperStyle'>
) => {
  return (
    <AnimatedButtonProvider
      {...props}
      style={styles.animatedButton}
      wrapperStyle={styles.iconWrapper}
    />
  )
}

export default AnimatedBottomButton
