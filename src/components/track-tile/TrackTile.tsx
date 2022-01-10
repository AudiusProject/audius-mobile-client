import React, { useCallback, useState, useEffect, useRef } from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View
} from 'react-native'

import { TrackTileProps } from 'app/components/track-tile/types'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

import TrackBannerIcon, { TrackBannerIconType } from './TrackBannerIcon'
// import BottomButtons from './BottomButtons'
import TrackTileCoSign from './TrackTileCoSign'
import TrackTileMetadata from './TrackTileMetadata'
import TrackTileStates from './TrackTileStats'
import TrackTileTopRight from './TrackTileTopRight'

const messages = {
  artistPick: "Artist's Pick",
  coSign: 'Co-Sign',
  reposted: 'Reposted',
  favorited: 'Favorited',
  hiddenTrack: 'Hidden Track',
  repostedAndFavorited: 'Reposted & Favorited'
}

type ExtraProps = {
  goToTrackPage: (e: GestureResponderEvent) => void
  goToArtistPage: (e: GestureResponderEvent) => void
  toggleSave: (trackId: ID) => void
  toggleRepost: (trackId: ID) => void
  onShare: (trackId: ID) => void
  makeGoToRepostsPage: (trackId: ID) => (e: GestureResponderEvent) => void
  makeGoToFavoritesPage: (trackId: ID) => (e: GestureResponderEvent) => void
  isOwner: boolean
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: 152,
      borderColor: themeColors.neutralLight8,
      backgroundColor: themeColors.white,
      borderWidth: 1,
      borderRadius: 8,
      maxWidth: 400,
      marginHorizontal: 'auto',
      marginBottom: 12,
      // TODO: android box shadow
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 3
    },
    mainContent: {
      display: 'flex',
      flex: 1
    },
    rightContent: {
      display: 'flex',
      flexDirection: 'row'
    }
  })

const TrackTile = ({
  artistName,
  coSign,
  coverArtSizes,
  duration,
  fieldVisibility,
  goToTrackPage,
  goToArtistPage,
  hasLoaded,
  id,
  index,
  isArtistPick,
  isPlaying,
  isTrending,
  isUnlisted,
  listenCount,
  makeGoToFavoritesPage,
  makeGoToRepostsPage,
  onClickOverflow,
  onShare,
  repostCount,
  saveCount,
  showArtistPick,
  showRankIcon,
  showSkeleton,
  title,
  togglePlay,
  toggleRepost,
  toggleSave,
  userId,
  uid
}: TrackTileProps & ExtraProps) => {
  const opacity = useRef(new Animated.Value(0)).current
  const fadeIn = { opacity }

  const styles = useThemedStyles(createStyles)
  const { neutralLight4 } = useThemeColors()
  const hideShare: boolean = fieldVisibility
    ? fieldVisibility.share === false
    : false
  const hidePlays = fieldVisibility
    ? fieldVisibility.play_count === false
    : false

  const onToggleSave = useCallback(() => toggleSave(id), [toggleSave, id])

  const onToggleRepost = useCallback(() => toggleRepost(id), [toggleRepost, id])

  const onClickShare = useCallback(() => onShare(id), [onShare, id])

  const onClickOverflowMenu = useCallback(
    () => onClickOverflow && onClickOverflow(id),
    [onClickOverflow, id]
  )

  const [artworkLoaded, setArtworkLoaded] = useState(false)

  const isLoaded = artworkLoaded && !showSkeleton

  useEffect(() => {
    if (isLoaded) {
      hasLoaded(index)
      Animated.timing(opacity, {
        toValue: 1,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }, [hasLoaded, isLoaded, index, opacity])

  return (
    <View style={styles.container}>
      {showArtistPick && isArtistPick && (
        <TrackBannerIcon type={TrackBannerIconType.STAR} />
      )}
      {isUnlisted && <TrackBannerIcon type={TrackBannerIconType.HIDDEN} />}
      <Pressable
        style={styles.mainContent}
        onPress={() => {
          if (showSkeleton) return
          togglePlay(uid, id)
        }}
      >
        <TrackTileTopRight
          duration={duration}
          fadeIn={fadeIn}
          isArtistPick={isArtistPick}
          isUnlisted={isUnlisted}
          showArtistPick={showArtistPick}
        />
        <TrackTileMetadata
          artistName={artistName}
          coSign={coSign}
          coverArtSizes={coverArtSizes}
          fadeIn={fadeIn}
          goToArtistPage={goToArtistPage}
          goToTrackPage={goToTrackPage}
          id={id}
          isLoaded={isLoaded}
          isPlaying={isPlaying}
          setArtworkLoaded={setArtworkLoaded}
          showSkeleton={showSkeleton}
          userId={userId}
        />
        {coSign && <TrackTileCoSign coSign={coSign} />}

        {/* <BottomButtons
          hasSaved={hasCurrentUserSaved}
          hasReposted={hasCurrentUserReposted}
          toggleRepost={onToggleRepost}
          toggleSave={onToggleSave}
          onShare={onClickShare}
          onClickOverflow={onClickOverflowMenu}
          isOwner={isOwner}
          isUnlisted={isUnlisted}
          isShareHidden={hideShare}
        /> */}
      </Pressable>
    </View>
  )
}

export default TrackTile
