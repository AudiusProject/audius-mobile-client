import React from 'react'

import { push } from 'connected-react-router'

import { getMobileOverflowModal } from 'audius-client/src/common/store/ui/mobile-overflow-menu/selectors'

import { CommonState } from 'audius-client/src/common/store'
import { ID } from 'audius-client/src/common/models/Identifiers'
import { publishPlaylist } from 'audius-client/src/common/store/cache/collections/actions'
import { getCollection } from 'audius-client/src/common/store/cache/collections/selectors'
import { getUser } from 'audius-client/src/common/store/cache/users/selectors'
import {
  FavoriteSource,
  RepostSource,
  ShareSource
} from 'audius-client/src/common/models/Analytics'
import {
  OverflowAction,
  OverflowActionCallbacks
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'

// Importing directly from audius-client for now, this will be removed
// when the profile page is implemented in RN
import {
  profilePage,
  playlistPage,
  albumPage
} from 'audius-client/src/utils/route'
import {
  repostCollection,
  undoRepostCollection,
  saveCollection,
  unsaveCollection,
  shareCollection
} from 'audius-client/src/common/store/social/collections/actions'
import { open as openEditPlaylist } from 'audius-client/src/common/store/ui/createPlaylistModal/actions'
import { setOpen as openDeletePlaylist } from 'audius-client/src/common/store/ui/delete-playlist-confirmation-modal/actions'
import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'

type Props = {
  render: (callbacks: OverflowActionCallbacks) => React.ReactNode
}

const CollectionOverflowMenuDrawer = ({ render }: Props) => {
  const dispatchWeb = useDispatchWeb()
  const { id } = useSelectorWeb(getMobileOverflowModal)
  const {
    playlist_owner_id,
    playlist_name,
    is_album
  } = useSelectorWeb((state: CommonState) => getCollection(state, { id }))

  const { handle } = useSelectorWeb((state: CommonState) =>
    getUser(state, { id: playlist_owner_id })
  )

  if (!id || !handle || !playlist_name || is_album === undefined) {
    return <></>
  }

  const callbacks = {
    [OverflowAction.REPOST]: () =>
      dispatchWeb(
        repostCollection(id as ID, { source: RepostSource.OVERFLOW })
      ),
    [OverflowAction.UNREPOST]: () =>
      dispatchWeb(
        undoRepostCollection(id as ID, { source: RepostSource.OVERFLOW })
      ),
    [OverflowAction.FAVORITE]: () =>
      dispatchWeb(saveCollection(id as ID, FavoriteSource.OVERFLOW)),
    [OverflowAction.UNFAVORITE]: () =>
      dispatchWeb(unsaveCollection(id as ID, FavoriteSource.OVERFLOW)),
    [OverflowAction.SHARE]: () =>
      dispatchWeb(shareCollection(id as ID, ShareSource.OVERFLOW)),
    [OverflowAction.VIEW_ALBUM_PAGE]: () =>
      dispatchWeb(
        push((is_album ? albumPage : playlistPage)(handle, playlist_name, id))
      ),
    [OverflowAction.VIEW_ARTIST_PAGE]: () =>
      dispatchWeb(push(profilePage(handle))),
    [OverflowAction.EDIT_PLAYLIST]: () => dispatchWeb(openEditPlaylist(id)),
    [OverflowAction.DELETE_PLAYLIST]: () => dispatchWeb(openDeletePlaylist(id)),
    [OverflowAction.PUBLISH_PLAYLIST]: () =>
      is_album ? () => {} : dispatchWeb(publishPlaylist(id))
  }

  return render(callbacks)
}

export default CollectionOverflowMenuDrawer
