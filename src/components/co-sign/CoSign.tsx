import React, { ReactNode } from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import IconCoSign from 'app/assets/images/iconCoSign.svg'

import { Size } from './types'

type CoSignProps =
  | {
      coSignName: string
      userId: ID
      hasFavorited: boolean
      hasReposted: boolean
      size: Size
      children: ReactNode
      style?: StyleProp<ViewStyle>
    }
  | {
      size: Size
      children: ReactNode
      style?: StyleProp<ViewStyle>
    }

const CoSign = ({ size, children, style }: CoSignProps) => {
  const styles = StyleSheet.create({
    children: {
      width: '100%',
      height: '100%'
    },
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
    },
    box: {
      ...{
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
    }
  })
  return (
    <View style={style}>
      <View style={styles.children}>{children}</View>
      <View style={styles.check}>
        <View style={styles.box}>
          <IconCoSign />
        </View>
      </View>
    </View>
  )
}

export default CoSign
