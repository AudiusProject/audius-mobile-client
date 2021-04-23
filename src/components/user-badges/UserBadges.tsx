import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

import IconVerified from '../../assets/images/iconVerified.svg'

type UserBadgesProps = {
  name: string
  isVerified: boolean
  badgeSize?: number
  style?: Object
  nameStyle?: Object
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  badge: {
    marginLeft: 4
  }
})

const UserBadges: React.FC<UserBadgesProps> = ({
  name,
  isVerified,
  badgeSize = 14,
  style = {},
  nameStyle = {}
}) => {

  return (
    <View style={[styles.container, style]}>
      <Text style={nameStyle} numberOfLines={1}>{name}</Text>
      {isVerified && <IconVerified height={badgeSize} width={badgeSize} style={styles.badge}/>}
    </View>
  )
}

export default UserBadges
