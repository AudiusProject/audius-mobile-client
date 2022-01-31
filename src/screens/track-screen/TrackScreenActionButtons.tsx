import React from 'react'

import {
  FavoriteSource,
  RepostSource,
  ShareSource
} from 'audius-client/src/common/models/Analytics'
import { ID } from 'audius-client/src/common/models/Identifiers'
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
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

import IconKebabHorizontal from 'app/assets/images/iconKebabHorizontal.svg'
import IconShare from 'app/assets/images/iconShare.svg'
import FavoriteButton from 'app/components/favorite-button'
import IconButton from 'app/components/icon-button/IconButton'
import LoadingSpinner from 'app/components/loading-spinner'
import RepostButton from 'app/components/repost-button'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRowCentered } from 'app/styles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

type ActionButtonRowProps = {
  hasReposted: boolean
  hasSaved: boolean
  isFollowing: boolean
  isOwner: boolean
  isPublished?: boolean
  isPublishing?: boolean
  isUnlisted: boolean
  showFavorite: boolean
  showOverflow: boolean
  showRepost: boolean
  showShare: boolean
  trackId: ID
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.neutralLight7,
      height: 60,
      paddingTop: 12,
      paddingBottom: 8
    },

    actionButton: {
      width: 40,
      height: '100%',
      ...flexRowCentered(),
      justifyContent: 'center',
      position: 'relative',
      bottom: 1,
      marginHorizontal: 12
    },

    icon: {
      height: 40,
      width: 40
    },

    iconWrapper: {
      width: 40,
      height: '100%',
      overflow: 'visible',
      ...flexRowCentered(),
      marginHorizontal: 12
    }
  })

/**
 * The action buttons on track and playlist screens
 */
export const TrackScreenActionButtons = ({
  hasReposted,
  hasSaved,
  isFollowing,
  isOwner,
  isPublished = true,
  isPublishing = false,
  isUnlisted,
  showFavorite,
  showOverflow,
  showRepost,
  showShare,
  trackId
}: ActionButtonRowProps) => {
  const styles = useThemedStyles(createStyles)
  const { neutralLight4, neutralLight8 } = useThemeColors()
  const dispatch = useDispatch()
  const dispatchWeb = useDispatchWeb()

  const onToggleSave = () => {
    if (!isOwner) {
      if (hasSaved) {
        dispatchWeb(unsaveTrack(trackId, FavoriteSource.TRACK_PAGE))
      } else {
        dispatchWeb(saveTrack(trackId, FavoriteSource.TRACK_PAGE))
      }
    }
  }

  const onToggleRepost = () => {
    if (!isOwner) {
      if (hasReposted) {
        dispatchWeb(undoRepostTrack(trackId, RepostSource.TRACK_PAGE))
      } else {
        dispatchWeb(repostTrack(trackId, RepostSource.TRACK_PAGE))
      }
    }
  }

  const onShare = () => {
    dispatch(
      requestOpenShareModal({
        type: 'track',
        trackId,
        source: ShareSource.PAGE
      })
    )
  }
  const onPressOverflow = () => {
    const overflowActions = [
      isOwner || isUnlisted
        ? null
        : hasReposted
        ? OverflowAction.UNREPOST
        : OverflowAction.REPOST,
      isOwner || isUnlisted
        ? null
        : hasSaved
        ? OverflowAction.UNFAVORITE
        : OverflowAction.FAVORITE,
      OverflowAction.ADD_TO_PLAYLIST,
      isFollowing
        ? OverflowAction.UNFOLLOW_ARTIST
        : OverflowAction.FOLLOW_ARTIST,
      OverflowAction.VIEW_ARTIST_PAGE
    ].filter(Boolean) as OverflowAction[]

    dispatchWeb(
      openOverflowMenu({
        source: OverflowSource.TRACKS,
        id: trackId,
        overflowActions
      })
    )
  }

  const repostButton = (
    <RepostButton
      onPress={onToggleRepost ?? (() => {})}
      isActive={hasReposted}
      isDisabled={isOwner}
    />
  )

  const favoriteButton = (
    <FavoriteButton
      onPress={onToggleSave ?? (() => {})}
      isActive={hasSaved}
      isDisabled={isOwner}
    />
  )

  const shareButton = (
    <IconButton
      style={styles.actionButton}
      icon={() => (
        <IconShare fill={!isPublished ? neutralLight8 : neutralLight4} />
      )}
      onPress={isPublished ? onShare : () => {}}
    />
  )

  const spinner = <LoadingSpinner style={styles.actionButton} />

  const overflowMenu = (
    <IconButton
      style={styles.actionButton}
      icon={() => <IconKebabHorizontal />}
      onPress={onPressOverflow}
    />
  )

  return (
    <View style={styles.root}>
      {showRepost && repostButton}
      {showFavorite && favoriteButton}
      {showShare && (isPublishing ? spinner : shareButton)}
      {showOverflow && overflowMenu}
    </View>
  )
}
