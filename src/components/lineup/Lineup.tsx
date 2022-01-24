import React, { useCallback, useState } from 'react'

import { Name, PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import Kind from 'audius-client/src/common/models/Kind'
import { Lineup as LineupData } from 'audius-client/src/common/models/Lineup'
import { SectionList, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import Text from 'app/components/text'
import { TrackTile } from 'app/components/track-tile'
import { getPlaying, getPlayingUid } from 'app/store/audio/selectors'
import { make, track } from 'app/utils/analytics'

import { LineupVariant } from './types'

type LineupItem = {
  id: ID
  kind: Kind
  track_id?: ID
  uid: UID
  _marked_deleted?: boolean
}

type Props = {
  /** Are we in a trending lineup? Allows tiles to specialize their rendering */
  isTrending?: boolean

  /**
   * Indicator if a track should be displayed differently (ie. artist pick)
   * The leadingElementId is displayed at the top of the lineup
   */
  leadingElementId?: ID

  /**
   * The Lineup object containing entries
   */
  lineup: LineupData<LineupItem>

  /**
   * Function called to pause playback
   */
  pauseTrack: () => void

  /**
   * Function called to play a track
   */
  playTrack: (uid: UID) => void

  /** How many icons to show for top ranked entries in the lineup. Defaults to 0, showing none */
  rankIconCount?: number

  /**
   * Whether to show the artist pick on the leading element.
   * Defaults to true.
   */
  showLeadingElementArtistPick?: boolean

  /**
   * The variant of the Lineup
   */
  variant: LineupVariant
}

const styles = StyleSheet.create({
  lineup: {
    padding: 8
  }
})
export const Lineup = ({
  isTrending,
  leadingElementId,
  lineup,
  playTrack,
  pauseTrack,
  rankIconCount = 0,
  showLeadingElementArtistPick = true,
  variant
}: Props) => {
  const [loadedTiles, setLoadedTiles] = useState<boolean[]>([])

  const playing = useSelector(getPlaying)
  const playingUid = useSelector(getPlayingUid)

  const onLoad = useCallback(
    (index: number) => {
      if (!loadedTiles[index]) {
        loadedTiles[index] = true
        setLoadedTiles(loadedTiles)
      }
    },
    [loadedTiles, setLoadedTiles]
  )

  const togglePlay = useCallback(
    (uid: UID, trackId: ID, source?: PlaybackSource) => {
      if (uid !== playingUid || (uid === playingUid && !playing)) {
        playTrack(uid)
        // TODO: sk - analytics
        //   track(
        //     make(Name.PLAYBACK_PLAY, {
        //       id: `${trackId}`,
        //       source: source || PlaybackSource.TRACK_TILE
        //     })
        //   )
      } else if (uid === playingUid && playing) {
        pauseTrack()
        // TODO: sk - analytics
        //   track(
        //     make(Name.PLAYBACK_PAUSE, {
        //       id: `${trackId}`,
        //       source: source || PlaybackSource.TRACK_TILE
        //     })
        //   )
      }
    },
    [playTrack, pauseTrack, playing, playingUid]
  )

  const renderItem = ({ index, item }: { index: number; item: LineupItem }) => {
    if (item.kind === Kind.TRACKS || item.track_id) {
      // Render a track tile if the kind tracks or there's a track id present

      if (item._marked_deleted) {
        return null
      }
      return (
        <TrackTile
          {...item}
          index={index}
          isTrending={isTrending}
          onLoad={onLoad}
          showArtistPick={showLeadingElementArtistPick && !!leadingElementId}
          showRankIcon={index < rankIconCount}
          togglePlay={togglePlay}
          uid={item.uid}
        />
      )
    } else {
      return <></>
      // TODO: Playlist tile
    }
  }

  return (
    <View style={styles.lineup}>
      <SectionList
        sections={[
          {
            title: 'Test',
            data: lineup.entries
          }
        ]}
        keyExtractor={(item, index) => String(item.id + index)}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      />
    </View>
  )
}
