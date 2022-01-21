import React, { useCallback } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { tracksActions } from 'audius-client/src/common/store/pages/track/lineup/actions'
import { makeGetLineupMetadatas } from 'common/store/lineup/selectors'
import { getLineup } from 'common/store/pages/track/selectors'
import { Text, View } from 'react-native'

import { BaseStackParamList } from 'app/components/app-navigator/types'
import Button from 'app/components/button'
import { Lineup } from 'app/components/lineup'
import { LineupVariant } from 'app/components/lineup/types'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'

// We might need to allow BaseStackParamList to be generic here
// to get all the relevant params
type Props = NativeStackScreenProps<BaseStackParamList, 'track'>

const getMoreByArtistLineup = makeGetLineupMetadatas(getLineup)

const lineupProps = {
  leadingElementDelineator: <View />,
  leadingElementClassName: 'TrackPage_originalTrack__x11t9',
  showLeadingElementArtistPick: false,
  start: 1,
  count: 6,
  selfLoad: false,
  variant: LineupVariant.CONDENSED,
  playingSource: null,
  playingTrackId: null,
  buffering: false,
  playTrack: () => {},
  pauseTrack: () => {},
  actions: {
    setPage: () => {},
    prefix: 'TRACK_TRACKS',
    removeDeleted: false
  },
  delineate: false,
  loadMore: () => {},
  ordered: false
}

const TrackScreen = ({ route, navigation }: Props) => {
  const handlePress = useCallback(() => {
    navigation.navigate('profile', { id: 1 })
  }, [navigation])

  const dispatchWeb = useDispatchWeb()
  const moreByArtistLineup = useSelectorWeb(getMoreByArtistLineup)

  const playTrack = (uid?: string) => {
    dispatchWeb(tracksActions.play(uid))
  }

  const pauseTrack = () => {
    dispatchWeb(tracksActions.pause())
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>Example track screen</Text>
      <Button title='Go to profile screen' onPress={handlePress} />
      <Lineup
        {...lineupProps}
        lineup={moreByArtistLineup}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
      />
    </View>
  )
}

export default TrackScreen
