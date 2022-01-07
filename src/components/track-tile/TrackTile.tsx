import React, { useCallback, useState, useEffect, useRef } from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { formatCount } from 'audius-client/src/common/utils/formatUtil'
import { formatSeconds } from 'audius-client/src/common/utils/timeUtil'
import {
  Animated,
  Easing,
  GestureResponderEvent,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

import IconCrown from 'app/assets/images/iconCrown.svg'
import IconHidden from 'app/assets/images/iconHidden.svg'
import IconStar from 'app/assets/images/iconStar.svg'
import IconTrending from 'app/assets/images/iconTrending.svg'
import IconVolume from 'app/assets/images/iconVolume.svg'
import FavoriteButton from 'app/components/favorite-button'
import RepostButton from 'app/components/repost-button'
import Skeleton from 'app/components/skeleton'
import Text, { AnimatedText } from 'app/components/text'
import { TrackTileProps } from 'app/components/track-tile/types'
import UserBadges from 'app/components/user-badges/UserBadges'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors } from 'app/utils/theme'

import TrackBannerIcon, { TrackBannerIconType } from './TrackBannerIcon'
// import BottomButtons from './BottomButtons'
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

const createRankIconStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    rankContainer: {
      color: themeColors.secondary,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 6
    }
  })

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
  const styles = useThemedStyles(createRankIconStyles)
  return isVisible ? (
    <View style={[styles.rankContainer, style]}>
      {showCrown ? <IconCrown /> : <IconTrending />}
      {index + 1}
    </View>
  ) : null
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
      marginBottom: 12
      // TODO: box shadow
      //   box-shadow: 0 0 1px 0 var(--tile-shadow-1), 0 1px 0 0 var(--tile-shadow-2), 0 2px 5px -2px var(--tile-shadow-3);
    },
    mainContent: {
      display: 'flex',
      flex: 1
    },
    rightContent: {
      display: 'flex',
      flexDirection: 'row'
    },
    metadata: {
      display: 'flex',
      flexDirection: 'row'
    },
    albumArtContainer: {
      marginTop: 10,
      marginRight: 12,
      marginLeft: 10
    },

    titles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',

      /* Text truncation */
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: '65%',
      overflow: 'hidden',
      marginRight: 12,
      marginTop: 10
    },
    titlesActive: {
      color: themeColors.primary
    },
    titlesSkeleton: {
      width: '100%'
    },
    title: {
      marginTop: 'auto',
      paddingRight: 5,
      marginBottom: 2,
      display: 'flex',
      flexDirection: 'row',
      minHeight: 20,
      alignItems: 'center',
      width: '100%'
    },
    titleText: {
      fontSize: 16
    },
    artist: {
      marginBottom: 'auto',
      paddingRight: 5,
      maxWidth: '100%',
      minHeight: 20,
      flexWrap: 'nowrap',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row'
    },
    topRight: {
      position: 'absolute',
      right: 10,
      left: 0,
      top: 10,
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    disabledStatItem: {
      opacity: 0.5
    },
    listenCount: {
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bottomButtons: {
      marginHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight8,
      height: 38,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    skeleton: {
      position: 'absolute',
      top: 0
    },
    coSignLabel: {
      position: 'absolute',
      bottom: -3,
      left: 96,
      color: themeColors.primary,
      fontSize: 12,
      // TODO: font weight
      //   fontWeight: var(--font-heavy);
      letterSpacing: 1,
      lineHeight: 15,
      textTransform: 'uppercase'
    },
    coSignText: {
      color: themeColors.neutralLight4,
      fontSize: 12,
      // TODO: font weight
      //   font-weight: var(--font-medium);
      letterSpacing: 0.2,
      lineHeight: 14,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 10,
      marginTop: 8
    },
    coSignName: {
      marginRight: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    coSignIcon: {
      marginLeft: 4
    },
    stats: {
      display: 'flex',
      flexDirection: 'row',
      flex: 0,
      flexBasis: 26,
      alignItems: 'stretch',
      paddingVertical: 2,
      marginRight: 10,
      height: 30
    },
    statItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10
      // TODO: transitions
    },
    statText: {
      // TODO: font weight
      //   font-weight: 500;
      fontSize: 12,
      letterSpacing: 0.2,
      color: themeColors.neutralLight4
    },
    iconVerified: {
      marginLeft: 4
    },
    topRightIcon: {
      marginRight: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',

      color: themeColors.neutralLight4,
      fontSize: 12,
      // TODO: font weight
      //   font-weight: var(--font-medium);
      letterSpacing: 0.2
    },
    rankIconContainer: {
      marginRight: 4
    },

    favoriteButton: {
      height: 14,
      width: 14,
      marginLeft: 4
    },

    repostButton: {
      height: 16,
      width: 16,
      marginLeft: 4
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
      Animated.timing(opacity, {
        toValue: 1,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }, [artworkLoaded, hasLoaded, index, showSkeleton, opacity])

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
          <AnimatedText style={fadeIn}>
            {duration && formatSeconds(duration)}
          </AnimatedText>
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
              isPlaying ? styles.titlesActive : {},
              showSkeleton ? styles.titlesSkeleton : {}
            ]}
          >
            <Pressable style={styles.title} onPress={goToTrackPage}>
              <AnimatedText style={[fadeIn, styles.titleText]} weight='bold'>
                {title}
              </AnimatedText>
              {isPlaying && <IconVolume />}
            </Pressable>
            {(!artworkLoaded || showSkeleton) && (
              <Skeleton style={styles.skeleton} width='80%' height='80%' />
            )}
            <Pressable style={styles.artist} onPress={goToArtistPage}>
              <AnimatedText
                style={[fadeIn, styles.titleText]}
                weight='demibold'
              >
                {artistName}
              </AnimatedText>
              <UserBadges
                user={userId as any}
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
            <View style={styles.coSignName}>
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
                <Text>{formatCount(repostCount)}</Text>
                <RepostButton
                  wrapperStyle={styles.repostButton as ImageStyle}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.statItem,
                  !saveCount ? styles.disabledStatItem : {}
                ]}
                onPress={e => saveCount && makeGoToFavoritesPage(id)(e)}
              >
                <Text>{formatCount(saveCount)}</Text>
                <FavoriteButton
                  wrapperStyle={styles.favoriteButton as ImageStyle}
                />
              </Pressable>
            </Animated.View>
          )}
          {!hidePlays && (
            <AnimatedText style={[styles.listenCount, fadeIn]}>
              {formatListenCount(listenCount)}
            </AnimatedText>
          )}
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
