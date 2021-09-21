import React from 'react'

import { StyleSheet } from 'react-native'

import AnimatedButtonProvider, {
  AnimatedButtonProviderProps
} from '../../animated-button/AnimatedButtonProvider'

const styles = StyleSheet.create({
  animatedButton: {
    width: '20%',
    height: 49,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconWrapper: {
    width: 28,
    height: 28
  }
})

// .animatedButton path {
//   fill: var(--neutral);
// }

// .activeButton path {
//   fill: var(--primary);
// }

const AnimatedBottomButton = (props: AnimatedButtonProviderProps) => {
  return (
    <AnimatedButtonProvider
      {...props}
      style={styles.animatedButton}
      wrapperStyle={styles.iconWrapper}
    />
  )
}

export default AnimatedBottomButton
