import React from 'react'

import { formatSeconds } from 'audius-client/src/common/utils/timeUtil'
import { Animated, StyleSheet, View, ViewStyle } from 'react-native'

import IconHidden from 'app/assets/images/iconHidden.svg'
import IconStar from 'app/assets/images/iconStar.svg'
import Text, { AnimatedText } from 'app/components/text'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRowCentered } from 'app/styles'

import { createStyles as createTrackTileStyles } from './styles'

const messages = {
  artistPick: "Artist's Pick",
  hiddenTrack: 'Hidden Track'
}

const flexRowEnd = (): ViewStyle => ({
  ...flexRowCentered(),
  justifyContent: 'flex-end'
})

const styles = StyleSheet.create({
  topRight: {
    ...flexRowEnd(),
    position: 'absolute',
    top: 10,
    right: 10,
    left: 0,
    textAlign: 'right'
  },
  topRightIcon: {
    ...flexRowEnd(),
    marginRight: 8
  }
})

type Props = {
  /**
   * The duration of the track
   */
  duration: number
  /**
   * Fade in animation style
   */
  fadeIn: { opacity: Animated.Value }
  /**
   * Whether or not the track is the artist pick
   */
  isArtistPick: boolean
  /**
   * Whether or not the track is unlisted (hidden)
   */
  isUnlisted: boolean
  /**
   * Whether or not to show the artist pick icon
   */
  showArtistPick: boolean
}

const TrackTileTopRight = ({
  duration,
  fadeIn,
  isArtistPick,
  isUnlisted,
  showArtistPick
}: Props) => {
  const trackTileStyles = useThemedStyles(createTrackTileStyles)
  return (
    <View style={styles.topRight}>
      {showArtistPick && isArtistPick && (
        <View style={styles.topRightIcon}>
          <IconStar />
          <Text style={trackTileStyles.statText}>{messages.artistPick}</Text>
        </View>
      )}
      {isUnlisted && (
        <View style={styles.topRightIcon}>
          <IconHidden />
          <Text>{messages.hiddenTrack}</Text>
        </View>
      )}
      <AnimatedText style={[fadeIn, trackTileStyles.statText]}>
        {duration && formatSeconds(duration)}
      </AnimatedText>
    </View>
  )
}

export default TrackTileTopRight
