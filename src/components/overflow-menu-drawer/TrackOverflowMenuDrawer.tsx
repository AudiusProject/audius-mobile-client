import React from 'react'

import { push } from 'connected-react-router'

import { getMobileOverflowModal } from 'audius-client/src/common/store/ui/mobile-overflow-menu/selectors'

import { CommonState } from 'audius-client/src/common/store'
import { ID } from 'audius-client/src/common/models/Identifiers'
import { getTrack } from 'audius-client/src/common/store/cache/tracks/selectors'
import { getUser } from 'audius-client/src/common/store/cache/users/selectors'
import {
  FavoriteSource,
  FollowSource,
  RepostSource,
  ShareSource
} from 'audius-client/src/common/models/Analytics'
import {
  OverflowAction,
  OverflowActionCallbacks
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'

// Importing directly from audius-client for now, this will be removed
// when the profile page is implemented in RN
import { profilePage } from 'audius-client/src/utils/route'
import {
  repostTrack,
  undoRepostTrack,
  saveTrack,
  unsaveTrack,
  shareTrack
} from 'audius-client/src/common/store/social/tracks/actions'
import {
  followUser,
  unfollowUser
} from 'audius-client/src/common/store/social/users/actions'
import { requestOpen as openTikTokModal } from 'audius-client/src/common/store/ui/share-sound-to-tiktok-modal/slice'
import { requestOpen as openAddToPlaylistModal } from 'audius-client/src/common/store/ui/add-to-playlist/actions'
import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'

type Props = {
  render: (callbacks: OverflowActionCallbacks) => React.ReactNode
}

const TrackOverflowMenuDrawer = ({ render }: Props) => {
  const dispatchWeb = useDispatchWeb()
  const { id } = useSelectorWeb(getMobileOverflowModal)
  const { owner_id, title, permalink } = useSelectorWeb((state: CommonState) =>
    getTrack(state, { id })
  )

  const { handle } = useSelectorWeb((state: CommonState) =>
    getUser(state, { id: owner_id })
  )

  if (!id || !owner_id || !handle || !title) {
    console.log('returning')
    return <></>
  }

  const callbacks = {
    [OverflowAction.REPOST]: () =>
      dispatchWeb(repostTrack(id as ID, RepostSource.OVERFLOW)),
    [OverflowAction.UNREPOST]: () =>
      dispatchWeb(undoRepostTrack(id as ID, RepostSource.OVERFLOW)),
    [OverflowAction.FAVORITE]: () =>
      dispatchWeb(saveTrack(id as ID, FavoriteSource.OVERFLOW)),
    [OverflowAction.UNFAVORITE]: () =>
      dispatchWeb(unsaveTrack(id as ID, FavoriteSource.OVERFLOW)),
    [OverflowAction.SHARE]: () =>
      dispatchWeb(shareTrack(id as ID, ShareSource.OVERFLOW)),
    [OverflowAction.SHARE_TO_TIKTOK]: () =>
      dispatchWeb(openTikTokModal({ id })),
    [OverflowAction.ADD_TO_PLAYLIST]: () =>
      dispatchWeb(openAddToPlaylistModal(id as ID, title)),
    [OverflowAction.VIEW_TRACK_PAGE]: () =>
      permalink === undefined
        ? console.error(`Permalink missing for track ${id}`)
        : dispatchWeb(push(permalink)),
    [OverflowAction.VIEW_ARTIST_PAGE]: () =>
      dispatchWeb(push(profilePage(handle))),
    [OverflowAction.FOLLOW_ARTIST]: () =>
      dispatchWeb(followUser(owner_id, FollowSource.OVERFLOW)),
    [OverflowAction.FOLLOW_ARTIST]: () =>
      dispatchWeb(unfollowUser(owner_id, FollowSource.OVERFLOW))
  }

  return render(callbacks)
}

export default TrackOverflowMenuDrawer
