import React from 'react'

import { StyleSheet, View } from 'react-native'

import IconHidden from 'app/assets/images/iconHidden.svg'
import IconStar from 'app/assets/images/iconStar.svg'

const styles = StyleSheet.create({
  bannerIcon: {
    position: 'absolute',
    zIndex: 10,
    width: 80,
    height: 80
  },

  container: {
    // TODO: sk - box shadow
    // TODO: sk - linear gradient
    position: 'absolute',
    transform: [{ rotate: '45deg' }, { translateX: -64 }],
    width: 80,
    height: 80,
    overflow: 'hidden'
  }
})

export enum TrackBannerIconType {
  STAR = 'star',
  HIDDEN = 'hidden'
}

const TrackBannerIcon = ({ type }: { type: TrackBannerIconType }) => {
  const renderIcon = () => {
    switch (type) {
      case TrackBannerIconType.STAR:
        return <IconStar />
      case TrackBannerIconType.HIDDEN:
        return <IconHidden />
    }
  }

  return (
    <View style={styles.bannerIcon}>
      <View style={[styles.container]} />
      {renderIcon()}
    </View>
  )
}

export default TrackBannerIcon
