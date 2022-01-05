import React from 'react'

import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: 46
  }
})

type PlayBarProps = {
  onPress: () => void
  /**
   * Opacity animation to fade out play bar as
   * the new playing drawer is dragged open.
   */
  opacityAnim: Animated.Value
}

const PlayBar = ({ onPress, opacityAnim }: PlayBarProps) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim.interpolate({
            // Interpolate the animation such that the play bar fades out
            // at 25% up the screen.
            inputRange: [0, 0.75, 1],
            outputRange: [0, 0, 1]
          })
        }
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Text>Something is playing</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default PlayBar
