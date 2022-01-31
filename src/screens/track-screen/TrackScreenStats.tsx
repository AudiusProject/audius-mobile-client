import React, { useCallback } from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { formatCount } from 'audius-client/src/common/utils/formatUtil'
import { Pressable, StyleSheet, View } from 'react-native'

import IconFavorite from 'app/assets/images/iconHeart.svg'
import IconRepost from 'app/assets/images/iconRepost.svg'
import Text from 'app/components/text'
import { usePressScaleAnimation } from 'app/hooks/usePressScaleAnimation'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRowCentered } from 'app/styles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

const messages = {
  plays: 'Plays'
}

type StatsButtonRowProps = {
  showListenCount: boolean
  showFavoriteCount: boolean
  showRepostCount: boolean
  playCount?: number
  favoriteCount: number
  repostCount: number
  trackId: ID
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    countContainer: {
      ...flexRowCentered(),
      justifyContent: 'center',
      width: '100%',
      marginHorizontal: 24,
      paddingVertical: 4,
      paddingHorizontal: 8
    },

    count: {
      color: themeColors.neutral,
      textAlign: 'center',
      marginRight: 3
    },

    countLabel: {
      color: themeColors.neutralLight4,
      textAlign: 'center'
    },

    icon: {
      height: 16,
      width: 16
    },

    statsContainer: {
      ...flexRowCentered(),
      justifyContent: 'center',
      marginBottom: 12
    }
  })

/**
 * The stats displayed on track and playlist screens
 */
export const TrackScreenStats = ({
  showListenCount,
  showFavoriteCount,
  showRepostCount,
  favoriteCount,
  repostCount,
  trackId,
  playCount = 0
}: StatsButtonRowProps) => {
  const styles = useThemedStyles(createStyles)
  const { neutralLight4 } = useThemeColors()
  const favoriteScale = usePressScaleAnimation()
  const repostScale = usePressScaleAnimation()

  const onPressFavorites = useCallback(() => {
    // TODO: navigate to favorites
    // goToFavoritesPage(trackId)
  }, [trackId])

  const onPressReposts = useCallback(() => {
    // TODO: navigate to reposts
    // goToRepostsPage(trackId)
  }, [trackId])

  const listenCountDisplay = (
    <View style={styles.countContainer}>
      <Text style={styles.count}>{formatCount(listenCount)}</Text>
      <Text style={styles.countLabel}>{messages.plays}</Text>
    </View>
  )

  const favoriteCountDisplay = (
    <Pressable
      style={styles.countContainer}
      onPressIn={favoriteScale.handlePressIn}
      onPressOut={favoriteScale.handlePressOut}
      onPress={onPressFavorites}
    >
      <Text style={styles.count} weight='bold'>
        {formatCount(favoriteCount)}
      </Text>
      <View style={styles.countLabel}>
        <IconFavorite fill={neutralLight4} />
      </View>
    </Pressable>
  )

  const repostCountDisplay = (
    <Pressable
      style={styles.countContainer}
      onPressIn={repostScale.handlePressIn}
      onPressOut={repostScale.handlePressOut}
      onPress={onPressReposts}
    >
      <Text style={styles.count} weight='bold'>
        {formatCount(repostCount)}
      </Text>
      <View style={styles.countLabel}>
        <IconRepost fill={neutralLight4} />
      </View>
    </Pressable>
  )

  return (
    <>
      {(showListenCount || showFavoriteCount || showRepostCount) && (
        <View style={styles.statsContainer}>
          {showListenCount && listenCountDisplay}
          {showFavoriteCount && favoriteCountDisplay}
          {showRepostCount && repostCountDisplay}
        </View>
      )}
    </>
  )
}
