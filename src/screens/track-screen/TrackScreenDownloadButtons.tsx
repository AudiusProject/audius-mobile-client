import { useCallback } from 'react'

import {
  ButtonState,
  ButtonType as DownloadButtonType,
  useDownloadTrackButtons
} from 'audius-client/src/common/hooks/useDownloadTrackButtons'
import { Name } from 'audius-client/src/common/models/Analytics'
import { CID, ID } from 'audius-client/src/common/models/Identifiers'
import { User } from 'audius-client/src/common/models/User'
import { downloadTrack } from 'audius-client/src/common/store/social/tracks/actions'
import { StyleSheet, View } from 'react-native'
import { Color } from 'react-native-svg'
import { useSelector } from 'react-redux'

import IconDownload from 'app/assets/images/iconDownload.svg'
import Button, { ButtonType } from 'app/components/button'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { font } from 'app/styles'
import { makeStyles } from 'app/styles/makeStyles'
import { make, track } from 'app/utils/analytics'

export type DownloadButtonProps = {
  state: ButtonState
  type: DownloadButtonType
  label: string
  onClick?: () => void
}

export const messages = {
  downloadableTrack: 'Download this Track',
  downloadableStem: 'Download this source file',
  followToDownload: 'Must follow artist to download',
  processingTrack: 'Processing',
  processingStem: 'Uploading',
  addDownloadPrefix: (label: string) => `Download ${label}`
}

const useStyles = makeStyles(({ palette }) => ({
  button: {
    marginBottom: 6
  },
  label: {
    fontSize: 14,
    textTransform: 'uppercase',
    ...font('bold'),
    color: palette.neutralLight4
  }
}))

const DownloadButton = ({
  label,
  state,
  onClick = () => {}
}: DownloadButtonProps) => {
  const styles = useStyles()
  const isDisabled =
    state === ButtonState.PROCESSING || state === ButtonState.REQUIRES_FOLLOW
  console.log(isDisabled, state)
  return (
    <Button
      //   type={ButtonType.COMMON}
      renderIcon={fill => <IconDownload fill={fill as Color} />}
      iconPosition='left'
      disabled={isDisabled}
      title={messages.addDownloadPrefix(label)}
      textStyle={styles.label}
      containerStyle={styles.button}
      onPress={onClick}
    />
  )
}

type TrackScreenDownloadButtonsProps = {
  following: boolean
  isHidden?: boolean
  isOwner: boolean
  trackId: ID
  user: User
}

export const TrackScreenDownloadButtons = ({
  following,
  isOwner,
  trackId,
  user
}: TrackScreenDownloadButtonsProps) => {
  const dispatchWeb = useDispatchWeb()

  const onDownload = useCallback(
    (id: ID, cid: CID, category?: string, parentTrackId?: ID) => {
      const { creator_node_endpoint } = user
      if (!creator_node_endpoint) {
        return
      }
      dispatchWeb(downloadTrack(id, cid, creator_node_endpoint, category))
      track(
        make({
          eventName: Name.TRACK_PAGE_DOWNLOAD,
          id,
          category,
          parent_track_id: parentTrackId
        })
      )
    },
    [dispatchWeb, user]
  )
  const buttons = useDownloadTrackButtons({
    trackId,
    onDownload,
    isOwner,
    following,
    useSelector: useSelectorWeb as typeof useSelector
  })

  const shouldHide = buttons.length === 0
  if (shouldHide) {
    return null
  }

  return <View>{buttons.map(DownloadButton)}</View>
}
