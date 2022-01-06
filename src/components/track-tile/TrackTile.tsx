import React, { useCallback, useState, useEffect } from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { formatCount } from 'audius-client/src/common/utils/formatUtil'
import { formatSeconds } from 'audius-client/src/common/utils/timeUtil'
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle
} from 'react-native'

import IconCrown from 'app/assets/images/iconCrown.svg'
import IconStar from 'app/assets/images/iconStar.svg'
import IconVolume from 'app/assets/images/iconVolume.svg'
import IconHidden from 'app/assets/images/iconHidden.svg'
import IconTrending from 'app/assets/images/iconTrending.svg'
import Skeleton from 'app/components/skeleton'
import FavoriteButton from 'app/components/favorite-button'
import RepostButton from 'app/components/repost-button'
import { TrackTileProps } from 'app/components/track-tile/types'
import UserBadges from 'app/components/user-badges/UserBadges'
import Text from 'app/components/text'

import TrackBannerIcon, { TrackBannerIconType } from './TrackBannerIcon'

// import BottomButtons from './BottomButtons'
import styles from './TrackTile.module.css'
import TrackTileArt from './TrackTileArt'

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

const formatListenCount = (listenCount?: number) => {
  if (!listenCount) return null
  const suffix = listenCount === 1 ? 'Play' : 'Plays'
  return `${formatCount(listenCount)} ${suffix}`
}

const formatCoSign = ({
  hasReposted,
  hasFavorited
}: {
  hasReposted: boolean
  hasFavorited: boolean
}) => {
  if (hasReposted && hasFavorited) {
    return messages.repostedAndFavorited
  } else if (hasFavorited) {
    return messages.favorited
  }
  return messages.reposted
}

export const RankIcon = ({
  showCrown,
  index,
  style,
  isVisible = true
}: {
  showCrown: boolean
  index: number
  isVisible?: boolean
  style?: StyleProp<ViewStyle>
}) => {
  return isVisible ? (
    <View style={[styles.rankContainer, style]}>
      {showCrown ? <IconCrown /> : <IconTrending />}
      {index + 1}
    </View>
  ) : null
}

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
  user,
  uid
}: TrackTileProps & ExtraProps) => {
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
  useEffect(() => {
    if (artworkLoaded && !showSkeleton) {
      hasLoaded(index)
    }
  }, [artworkLoaded, hasLoaded, index, showSkeleton])

  const fadeIn = {
    [styles.show]: artworkLoaded && !showSkeleton,
    [styles.hide]: !artworkLoaded || showSkeleton
  }

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
        <View style={[styles.topRight, styles.statText]}>
          {showArtistPick && isArtistPick && (
            <View style={styles.topRightIcon}>
              <IconStar />
              <Text>{messages.artistPick}</Text>
            </View>
          )}
          {isUnlisted && (
            <View style={styles.topRightIcon}>
              <IconHidden />
              <Text>{messages.hiddenTrack}</Text>
            </View>
          )}
          <Text style={[styles.duration, fadeIn]}>
            {duration && formatSeconds(duration)}
          </Text>
        </View>
        <View style={styles.metadata}>
          <TrackTileArt
            id={id}
            isTrack={true}
            callback={() => setArtworkLoaded(true)}
            showSkeleton={showSkeleton}
            coverArtSizes={coverArtSizes}
            coSign={coSign}
            style={styles.albumArtContainer}
          />
          <View
            style={[
              styles.titles,
              {
                [styles.titlesActive]: isPlaying,
                [styles.titlesSkeleton]: showSkeleton
              }
            ]}
          >
            <Pressable style={styles.title} onPress={goToTrackPage}>
              <Text style={fadeIn}>{title}</Text>
              {isPlaying && <IconVolume />}
              {(!artworkLoaded || showSkeleton) && (
                <Skeleton style={styles.skeleton} width='80%' height='80%' />
              )}
            </Pressable>
            <Pressable style={styles.artist} onPress={goToArtistPage}>
              <Text style={[fadeIn, styles.userName]}>{artistName}</Text>
              <UserBadges
                user={user}
                badgeSize={12}
                style={styles.iconVerified}
              />
              {(!artworkLoaded || showSkeleton) && (
                <Skeleton style={styles.skeleton} width='60%' height='80%' />
              )}
            </Pressable>
          </View>
          {coSign && <Text style={styles.coSignLabel}>{messages.coSign}</Text>}
        </View>
        {coSign && (
          <View style={styles.coSignText}>
            <View style={styles.name}>
              <Text>{coSign.user.name}</Text>
              <UserBadges
                user={coSign.user}
                style={styles.iconVerified}
                badgeSize={8}
              />
            </View>
            {formatCoSign({
              hasReposted: coSign.has_remix_author_reposted,
              hasFavorited: coSign.has_remix_author_saved
            })}
          </View>
        )}
        <View style={[styles.stats, styles.statText]}>
          <RankIcon
            showCrown={showRankIcon}
            index={index}
            isVisible={isTrending && artworkLoaded && !showSkeleton}
            style={styles.rankIconContainer}
          />
          {!!(repostCount || saveCount) && (
            <>
              <Pressable
                style={[
                  styles.statItem,
                  fadeIn,
                  {
                    [styles.disabledStatItem]: !repostCount,
                    [styles.isHidden]: isUnlisted
                  }
                ]}
                onPress={repostCount ? makeGoToRepostsPage(id) : undefined}
              >
                <Text>{formatCount(repostCount)}</Text>
                <RepostButton style={styles.repostButton} />
              </Pressable>
              {!isUnlisted && (
                <Pressable
                  style={[
                    styles.statItem,
                    fadeIn,
                    {
                      [styles.disabledStatItem]: !saveCount,
                      [styles.isHidden]: isUnlisted
                    }
                  ]}
                  onPress={e => saveCount && makeGoToFavoritesPage(id)(e)}
                >
                  <Text>{formatCount(saveCount)}</Text>
                  <FavoriteButton style={styles.favoriteButton} />
                </Pressable>
              )}
            </>
          )}
          <Text
            style={[
              styles.listenCount,
              fadeIn,
              {
                [styles.isHidden]: hidePlays
              }
            ]}
          >
            {formatListenCount(listenCount)}
          </Text>
        </View>
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
