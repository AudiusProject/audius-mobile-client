import React, { useCallback, useState, useEffect, useRef } from 'react'

import {
  FavoriteSource,
  RepostSource,
  ShareSource
} from 'audius-client/src/common/models/Analytics'
import { Track } from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'
import { getUserId } from 'audius-client/src/common/store/account/selectors'
import { getTrack } from 'audius-client/src/common/store/cache/tracks/selectors'
import { getUserFromTrack } from 'audius-client/src/common/store/cache/users/selectors'
import {
  repostTrack,
  saveTrack,
  undoRepostTrack,
  unsaveTrack
} from 'audius-client/src/common/store/social/tracks/actions'
import {
  OverflowAction,
  OverflowSource
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import { requestOpen as requestOpenShareModal } from 'audius-client/src/common/store/ui/share-modal/slice'
import { open as openOverflowMenu } from 'common/store/ui/mobile-overflow-menu/slice'
import { isEqual } from 'lodash'
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View
} from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import { useDispatch, useSelector } from 'react-redux'

import { TrackTileProps } from 'app/components/track-tile/types'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { usePushRouteWeb } from 'app/hooks/usePushRouteWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { getPlaying, getPlayingUid } from 'app/store/audio/selectors'
import { flexCol, flexRow } from 'app/styles'
import { ThemeColors } from 'app/utils/theme'

import { TrackBannerIcon, TrackBannerIconType } from './TrackBannerIcon'
import { TrackTileBottomButtons } from './TrackTileBottomButtons'
import { TrackTileCoSign } from './TrackTileCoSign'
import { TrackTileMetadata } from './TrackTileMetadata'
import { TrackTileStats } from './TrackTileStats'
import { TrackTileTopRight } from './TrackTileTopRight'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      ...flexRow(),
      minHeight: 152,
      borderColor: themeColors.neutralLight8,
      backgroundColor: themeColors.white,
      borderWidth: 1,
      borderRadius: 8,
      maxWidth: 400,
      marginHorizontal: 'auto'
    },
    mainContent: {
      ...flexCol(),
      flex: 1
    }
  })

export const TrackTile = (props: TrackTileProps) => {
  const { uid } = props
  // Using isEqual as the equality function to prevent rerenders due to object references
  // not being preserved when syncing redux state from client.
  // This can be removed when no longer dependent on web client
  const track = useSelectorWeb(state => getTrack(state, { uid }), isEqual)
  const user = useSelectorWeb(state => getUserFromTrack(state, { uid }))
  if (!track || !user) {
    console.warn('Track or user missing for TrackTile, preventing render')
    return null
  }

  return <TrackTileComponent {...props} track={track} user={user} />
}

const TrackTileComponent = ({
  index,
  isTrending,
  onLoad,
  showArtistPick,
  showRankIcon,
  showSkeleton,
  togglePlay,
  track,
  uid,
  user
}: TrackTileProps & { track: Track; user: User }) => {
  const {
    permalink,
    _co_sign,
    _cover_art_sizes,
    duration,
    field_visibility,
    has_current_user_reposted,
    has_current_user_saved,
    is_delete,
    is_unlisted,
    play_count,
    repost_count,
    save_count,
    title,
    track_id
  } = track
  const { _artist_pick, name, user_id } = user

  const dispatch = useDispatch()
  const dispatchWeb = useDispatchWeb()
  const pushRouteWeb = usePushRouteWeb()

  const playingUid = useSelector(getPlayingUid)
  const isPlaying = useSelector(getPlaying)
  const currentUserId = useSelectorWeb(getUserId)

  const [artworkLoaded, setArtworkLoaded] = useState(false)

  const styles = useThemedStyles(createStyles)
  const opacity = useRef(new Animated.Value(0)).current

  const isOwner = user_id === currentUserId
  const isLoaded = artworkLoaded && !showSkeleton
  const fadeIn = { opacity }

  const hideShare: boolean = field_visibility
    ? field_visibility.share === false
    : false
  const hidePlays = field_visibility
    ? field_visibility.play_count === false
    : false

  const goToTrackPage = (e: GestureResponderEvent) => {
    // navigate to track page
  }

  const goToArtistPage = (e: GestureResponderEvent) => {
    // navigate to artist page
  }

  const onPressReposts = (e: GestureResponderEvent) => {
    // navigate to reposts page
    // goToRoute(REPOSTING_USERS_ROUTE)
  }

  const onPressFavorites = (e: GestureResponderEvent) => {
    // navigate to favorites page
    // goToRoute(REPOSTING_USERS_ROUTE)
  }

  const onPressOverflowMenu = useCallback(() => {
    const overflowActions = [
      !isOwner
        ? has_current_user_reposted
          ? OverflowAction.UNREPOST
          : OverflowAction.REPOST
        : null,
      !isOwner
        ? has_current_user_saved
          ? OverflowAction.UNFAVORITE
          : OverflowAction.FAVORITE
        : null,
      OverflowAction.SHARE,
      OverflowAction.ADD_TO_PLAYLIST,
      OverflowAction.VIEW_TRACK_PAGE,
      OverflowAction.VIEW_ARTIST_PAGE
    ].filter(Boolean) as OverflowAction[]

    dispatchWeb(
      openOverflowMenu({
        source: OverflowSource.TRACKS,
        id: track_id,
        overflowActions
      })
    )
  }, [
    track_id,
    dispatchWeb,
    has_current_user_reposted,
    has_current_user_saved,
    isOwner
  ])

  const onPressShare = useCallback(() => {
    dispatch(
      requestOpenShareModal({
        type: 'track',
        trackId: track_id,
        source: ShareSource.TILE
      })
    )
  }, [dispatch, track_id])

  const onToggleSave = useCallback(() => {
    if (has_current_user_saved) {
      dispatchWeb(unsaveTrack(track_id, FavoriteSource.TILE))
    } else {
      dispatchWeb(saveTrack(track_id, FavoriteSource.TILE))
    }
  }, [track_id, dispatchWeb, has_current_user_saved])

  const onToggleRepost = useCallback(() => {
    if (has_current_user_reposted) {
      dispatchWeb(undoRepostTrack(track_id, RepostSource.TILE))
    } else {
      dispatchWeb(repostTrack(track_id, RepostSource.TILE))
    }
  }, [track_id, dispatchWeb, has_current_user_reposted])

  useEffect(() => {
    if (isLoaded) {
      onLoad?.(index)
      Animated.timing(opacity, {
        toValue: 1,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }, [onLoad, isLoaded, index, opacity])

  if (is_delete || user?.is_deactivated) {
    return null
  }

  return (
    <Shadow
      offset={[0, 2]}
      viewStyle={{ alignSelf: 'stretch' }}
      distance={4}
      startColor='rgba(133,129,153,0.05)'
    >
      <View style={styles.container}>
        {showArtistPick && _artist_pick === track_id && (
          <TrackBannerIcon type={TrackBannerIconType.STAR} />
        )}
        {is_unlisted && <TrackBannerIcon type={TrackBannerIconType.HIDDEN} />}
        <Pressable
          style={styles.mainContent}
          disabled={showSkeleton}
          onPress={() => togglePlay(uid, track_id)}
        >
          <TrackTileTopRight
            duration={duration}
            fadeIn={fadeIn}
            isArtistPick={_artist_pick === track_id}
            isUnlisted={is_unlisted}
            showArtistPick={showArtistPick}
          />
          <TrackTileMetadata
            artistName={name}
            coSign={_co_sign}
            coverArtSizes={_cover_art_sizes}
            fadeIn={fadeIn}
            goToArtistPage={goToArtistPage}
            goToTrackPage={goToTrackPage}
            id={track_id}
            isLoaded={isLoaded}
            isPlaying={uid === playingUid && isPlaying}
            setArtworkLoaded={setArtworkLoaded}
            showSkeleton={showSkeleton}
            title={title}
            user={user}
          />
          {_co_sign && (
            <Animated.View style={fadeIn}>
              <TrackTileCoSign coSign={_co_sign} />
            </Animated.View>
          )}
          <TrackTileStats
            fadeIn={fadeIn}
            hidePlays={hidePlays}
            index={index}
            isTrending={isTrending}
            isUnlisted={is_unlisted}
            listenCount={play_count}
            onPressFavorites={onPressFavorites}
            onPressReposts={onPressReposts}
            repostCount={repost_count}
            saveCount={save_count}
            showRankIcon={showRankIcon}
          />
          <TrackTileBottomButtons
            hasReposted={has_current_user_reposted}
            hasSaved={has_current_user_saved}
            isOwner={isOwner}
            isShareHidden={hideShare}
            isUnlisted={is_unlisted}
            onPressOverflow={onPressOverflowMenu}
            onPressShare={onPressShare}
            onToggleRepost={onToggleRepost}
            onToggleSave={onToggleSave}
          />
        </Pressable>
      </View>
    </Shadow>
  )
}
