import React from 'react'

import { getMobileOverflowModal } from 'audius-client/src/common/store/ui/mobile-overflow-menu/selectors'

import { CommonState } from 'audius-client/src/common/store'
import { ID } from 'audius-client/src/common/models/Identifiers'
import { getUser } from 'audius-client/src/common/store/cache/users/selectors'
import {
  OverflowAction,
  OverflowActionCallbacks
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import {
  FollowSource,
  ShareSource
} from 'audius-client/src/common/models/Analytics'
import {
  followUser,
  unfollowUser,
  shareUser
} from 'audius-client/src/common/store/social/users/actions'

import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'

type Props = {
  render: (callbacks: OverflowActionCallbacks) => React.ReactNode
}

const ProfileOverflowMenuDrawer = ({ render }: Props) => {
  const dispatchWeb = useDispatchWeb()
  const { id } = useSelectorWeb(getMobileOverflowModal)
  const { handle, name } = useSelectorWeb((state: CommonState) =>
    getUser(state, { id })
  )

  if (!id || !handle || !name) {
    return <></>
  }

  const callbacks = {
    [OverflowAction.FOLLOW]: () =>
      dispatchWeb(followUser(id, FollowSource.OVERFLOW)),
    [OverflowAction.UNFOLLOW]: () =>
      dispatchWeb(unfollowUser(id, FollowSource.OVERFLOW)),
    [OverflowAction.SHARE]: () =>
      dispatchWeb(shareUser(id as ID, ShareSource.OVERFLOW))
  }

  return render(callbacks)
}

export default ProfileOverflowMenuDrawer
