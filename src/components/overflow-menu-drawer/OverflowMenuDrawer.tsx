import React, { useCallback } from 'react'

import { getMobileOverflowModal } from 'audius-client/src/common/store/ui/mobile-overflow-menu/selectors'
import {
  OverflowAction,
  OverflowSource
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import { close } from 'audius-client/src/common/store/ui/mobile-overflow-menu/actions'

import { useSelectorWeb } from '../../hooks/useSelectorWeb'
import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import TrackOverflowMenuDrawer from './TrackOverflowMenuDrawer'
import ActionDrawer from '../action-drawer/ActionDrawer'

const rowMessageMap = {
  [OverflowAction.REPOST]: 'Repost',
  [OverflowAction.UNREPOST]: 'Unrepost',
  [OverflowAction.FAVORITE]: 'Favorite',
  [OverflowAction.UNFAVORITE]: 'Unfavorite',
  [OverflowAction.SHARE]: 'Share',
  [OverflowAction.SHARE_TO_TIKTOK]: 'Share To TikTok',
  [OverflowAction.ADD_TO_PLAYLIST]: 'Add To Playlist',
  [OverflowAction.EDIT_PLAYLIST]: 'Edit Playlist',
  [OverflowAction.DELETE_PLAYLIST]: 'Delete Playlist',
  [OverflowAction.PUBLISH_PLAYLIST]: 'Publish Playlist',
  [OverflowAction.VIEW_TRACK_PAGE]: 'View Track Page',
  [OverflowAction.VIEW_ARTIST_PAGE]: 'View Artist Page',
  [OverflowAction.VIEW_PLAYLIST_PAGE]: 'View Playlist Page',
  [OverflowAction.VIEW_ALBUM_PAGE]: 'View Album Page',
  [OverflowAction.UNSUBSCRIBER_USER]: 'Unsubscribe',
  [OverflowAction.HIDE_NOTIFICATION]: 'Hide',
  [OverflowAction.FOLLOW_ARTIST]: 'Follow Artist',
  [OverflowAction.UNFOLLOW_ARTIST]: 'Unfollow Artist',
  [OverflowAction.FOLLOW]: 'Follow',
  [OverflowAction.UNFOLLOW]: 'Unfollow'
}

const OverflowMenuDrawer = () => {
  const dispatchWeb = useDispatchWeb()

  const onClose = useCallback(() => dispatchWeb(close()), [dispatchWeb])

  const overflowMenu = useSelectorWeb(getMobileOverflowModal)

  if (!overflowMenu?.id) {
    return <></>
  }

  const { source, overflowActions, isOpen } = overflowMenu

  const OverflowDrawerComponent =
    {
      [OverflowSource.TRACKS]: TrackOverflowMenuDrawer
    }[source] ?? TrackOverflowMenuDrawer

  const rows = (overflowActions ?? []).map(action => ({
    text: rowMessageMap[action],
    action
  }))

  return (
    <OverflowDrawerComponent
      render={callbacks => (
        <ActionDrawer
          rows={rows}
          callbacks={callbacks}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    />
  )
}

export default OverflowMenuDrawer
