import React, { ReactNode } from 'react'

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import IconCoSign from 'app/assets/images/iconCoSign.svg'
import { useThemeColors } from 'app/utils/theme'

import { Size } from './types'

type CoSignProps = {
  size: Size
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const CoSign = ({ size, children, style }: CoSignProps) => {
  const { primary, staticWhite } = useThemeColors()
  const styles = StyleSheet.create({
    check: {
      position: 'absolute',
      ...{
        [Size.TINY]: {
          bottom: 2,
          right: -2
        },
        [Size.SMALL]: {
          bottom: -4,
          right: -5
        },
        [Size.MEDIUM]: {
          bottom: -3,
          right: -3
        },
        [Size.LARGE]: {
          bottom: -8,
          right: -8
        },
        [Size.XLARGE]: {
          bottom: -7,
          right: -7
        }
      }[size]
    }
  })

  const iconSize = {
    [Size.TINY]: {
      height: 10,
      width: 10
    },
    [Size.SMALL]: {
      height: 16,
      width: 16
    },
    [Size.MEDIUM]: {
      height: 24,
      width: 24
    },
    [Size.LARGE]: {
      height: 32,
      width: 32
    },
    [Size.XLARGE]: {
      height: 44,
      width: 44
    }
  }[size]

  return (
    <View style={style}>
      <View>{children}</View>
      <View style={styles.check}>
        <IconCoSign fill={primary} fillSecondary={staticWhite} {...iconSize} />
      </View>
    </View>
  )
}

export default CoSign
