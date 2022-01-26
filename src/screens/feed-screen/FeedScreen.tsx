import React, { useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Name } from 'audius-client/src/common/models/Analytics'
import { makeGetLineupMetadatas } from 'audius-client/src/common/store/lineup/selectors'
import { feedActions } from 'audius-client/src/common/store/pages/feed/lineup/actions'
import { getDiscoverFeedLineup } from 'audius-client/src/common/store/pages/feed/selectors'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FeedStackParamList } from 'app/components/app-navigator/types'
import Button from 'app/components/button'
import { Lineup } from 'app/components/lineup'
import { LineupVariant } from 'app/components/lineup/types'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { make, track } from 'app/utils/analytics'

type Props = NativeStackScreenProps<FeedStackParamList, 'feed-stack'>

const getFeedLineup = makeGetLineupMetadatas(getDiscoverFeedLineup)

const FeedScreen = ({ navigation }: Props) => {
  const dispatchWeb = useDispatchWeb()
  const feedLineup = useSelectorWeb(getFeedLineup)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadMore = (offset: number, limit: number, overwrite: boolean) => {
    dispatchWeb(feedActions.fetchLineupMetadatas(offset, limit, overwrite))
    track(make({ eventName: Name.FEED_PAGINATE, offset, limit }))
  }

  useEffect(() => {
    if (!feedLineup.isMetadataLoading) {
      setIsRefreshing(false)
    }
  }, [feedLineup])

  const refresh = () => {
    setIsRefreshing(true)
    dispatchWeb(feedActions.refreshInView(true))
  }

  const playTrack = (uid?: string) => {
    dispatchWeb(feedActions.play(uid))
  }

  const pauseTrack = () => {
    dispatchWeb(feedActions.pause())
  }

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Lineup
        actions={feedActions}
        delineate
        lineup={feedLineup}
        loadMore={loadMore}
        refresh={refresh}
        refreshing={isRefreshing && feedLineup.isMetadataLoading}
        pauseTrack={pauseTrack}
        playTrack={playTrack}
        selfLoad
        variant={LineupVariant.CONDENSED}
      />
    </View>
  )
}

export default FeedScreen
