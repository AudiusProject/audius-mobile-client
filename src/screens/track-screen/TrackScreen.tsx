import React, { useCallback } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { getUserId } from 'audius-client/src/common/store/account/selectors'
import { makeGetLineupMetadatas } from 'audius-client/src/common/store/lineup/selectors'
import { tracksActions } from 'audius-client/src/common/store/pages/track/lineup/actions'
import {
  getLineup,
  getTrack,
  getUser
} from 'audius-client/src/common/store/pages/track/selectors'
import { isEqual } from 'lodash'
import { StyleSheet, Text, View } from 'react-native'

import { BaseStackParamList } from 'app/components/app-navigator/types'
import Button from 'app/components/button'
import { Lineup } from 'app/components/lineup'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'

import { TrackScreenHeader } from './TrackScreenHeader'

// We might need to allow BaseStackParamList to be generic here
// to get all the relevant params
type Props = NativeStackScreenProps<BaseStackParamList, 'track'>

const getMoreByArtistLineup = makeGetLineupMetadatas(getLineup)

const styles = StyleSheet.create({
  root: {
    padding: 12
  }
})

const TrackScreen = ({ route, navigation }: Props) => {
  // const handlePress = useCallback(() => {
  //   navigation.navigate('profile', { id: 1 })
  // }, [navigation])

  const dispatchWeb = useDispatchWeb()
  const track = useSelectorWeb(getTrack)
  const user = useSelectorWeb(getUser)
  const currentUserId = useSelectorWeb(getUserId)
  const moreByArtistLineup = useSelectorWeb(getMoreByArtistLineup, isEqual)

  const playTrack = (uid?: string) => {
    dispatchWeb(tracksActions.play(uid))
  }

  const pauseTrack = () => {
    dispatchWeb(tracksActions.pause())
  }

  return (
    <View style={styles.root}>
      <Lineup
        actions={tracksActions}
        header={
          track &&
          user && (
            <TrackScreenHeader
              track={track}
              user={user}
              uid={moreByArtistLineup?.entries?.[0]?.uid}
              currentUserId={currentUserId}
            />
          )
        }
        lineup={moreByArtistLineup}
        pauseTrack={pauseTrack}
        playTrack={playTrack}
      />
    </View>
  )
}

export default TrackScreen
