import React from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { formatCount } from 'audius-client/src/common/utils/formatUtil'
import {
  View,
  Animated,
  Pressable,
  StyleSheet,
  GestureResponderEvent
} from 'react-native'

import IconHeart from 'app/assets/images/iconHeart.svg'
import IconRepost from 'app/assets/images/iconRepost.svg'
import Text, { AnimatedText } from 'app/components/text'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRow, flexRowCentered } from 'app/styles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

import TrackTileRankIcon from './TrackTileRankIcon'
import { createStyles as createTrackTileStyles } from './styles'

const formatListenCount = (listenCount?: number) => {
  if (!listenCount) return null
  const suffix = listenCount === 1 ? 'Play' : 'Plays'
  return `${formatCount(listenCount)} ${suffix}`
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    listenCount: {
      ...flexRowCentered(),
      justifyContent: 'center',
      marginLeft: 'auto'
    },
    bottomButtons: {
      ...flexRowCentered(),
      marginHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight8,
      height: 38
    },
    stats: {
      ...flexRow(),
      flex: 0,
      flexBasis: 26,
      alignItems: 'stretch',
      paddingVertical: 2,
      marginRight: 10,
      height: 30
    },
    statItem: {
      ...flexRowCentered(),
      paddingHorizontal: 10
    },
    disabledStatItem: {
      opacity: 0.5
    },
    statIcon: {
      marginLeft: 4
    },
    favoriteStat: {
      height: 14,
      width: 14
    },
    repostStat: {
      height: 16,
      width: 16
    }
  })

type Props = {
  fadeIn: { opacity: Animated.Value }
  hidePlays: boolean
  id: ID
  index: number
  isLoaded: boolean
  isTrending: boolean
  isUnlisted: boolean
  listenCount: number
  makeGoToFavoritesPage: (trackId: ID) => (e: GestureResponderEvent) => void
  makeGoToRepostsPage: (trackId: ID) => (e: GestureResponderEvent) => void
  repostCount: number
  saveCount: number
  showRankIcon: boolean
}

const TrackTileStats = ({
  fadeIn,
  hidePlays,
  id,
  index,
  isLoaded,
  isTrending,
  isUnlisted,
  listenCount,
  makeGoToFavoritesPage,
  makeGoToRepostsPage,
  repostCount,
  saveCount,
  showRankIcon
}: Props) => {
  const styles = useThemedStyles(createStyles)
  const trackTileStyles = useThemedStyles(createTrackTileStyles)
  const { neutralLight4 } = useThemeColors()

  return (
    <View style={styles.stats}>
      {isTrending && isLoaded && (
        <TrackTileRankIcon showCrown={showRankIcon} index={index} />
      )}
      {!!(repostCount || saveCount) && !isUnlisted && (
        <Animated.View
          style={[fadeIn, { display: 'flex', flexDirection: 'row' }]}
        >
          <Pressable
            style={[
              styles.statItem,
              !repostCount ? styles.disabledStatItem : {}
            ]}
            onPress={repostCount ? makeGoToRepostsPage(id) : undefined}
          >
            <Text style={trackTileStyles.statText}>
              {formatCount(repostCount)}
            </Text>
            <IconRepost
              height={16}
              width={16}
              fill={neutralLight4}
              style={[styles.statIcon, styles.repostStat]}
            />
          </Pressable>
          <Pressable
            style={[styles.statItem, !saveCount ? styles.disabledStatItem : {}]}
            onPress={e => saveCount && makeGoToFavoritesPage(id)(e)}
          >
            <Text style={trackTileStyles.statText}>
              {formatCount(saveCount)}
            </Text>
            <IconHeart
              style={[styles.statIcon, styles.favoriteStat]}
              height={14}
              width={14}
              fill={neutralLight4}
            />
          </Pressable>
        </Animated.View>
      )}
      {!hidePlays && (
        <AnimatedText
          style={[fadeIn, trackTileStyles.statText, styles.listenCount]}
        >
          {formatListenCount(listenCount)}
        </AnimatedText>
      )}
    </View>
  )
}

export default TrackTileStats
