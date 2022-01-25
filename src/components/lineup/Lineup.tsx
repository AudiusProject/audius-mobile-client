import React, { useCallback, useState } from 'react'

import { Name, PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import Kind from 'audius-client/src/common/models/Kind'
import { Lineup as LineupData } from 'audius-client/src/common/models/Lineup'
import { SectionList, SectionListProps, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import Text from 'app/components/text'
import { TrackTile } from 'app/components/track-tile'
import { getPlaying, getPlayingUid } from 'app/store/audio/selectors'
import { make, track } from 'app/utils/analytics'

import { delineateByTime } from './delineate'
import { LineupItem, LineupVariant } from './types'

type Props = {
  /**
   * Whether or not to delineate the lineup by time of the `activityTimestamp`
   */
  delineate?: boolean

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
   * A header to display at the top of the lineup,
   * will scroll with the rest of the content
   */
  header?: SectionListProps<any>['ListHeaderComponent']

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
  lineup: {},
  item: {
    padding: 12,
    paddingBottom: 0
  }
})

export const Lineup = ({
  delineate,
  isTrending,
  leadingElementId,
  lineup,
  header,
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
        track(
          make({
            eventName: Name.PLAYBACK_PLAY,
            id: `${trackId}`,
            source: source || PlaybackSource.TRACK_TILE
          })
        )
      } else if (uid === playingUid && playing) {
        pauseTrack()
        track(
          make({
            eventName: Name.PLAYBACK_PAUSE,
            id: `${trackId}`,
            source: source || PlaybackSource.TRACK_TILE
          })
        )
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
        <View style={styles.item}>
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
        </View>
      )
    } else {
      return <></>
      // TODO: Playlist tile
    }
  }

  const sections = delineate
    ? delineateByTime(lineup.entries)
    : [
        {
          title: '',
          data: lineup.entries
        }
      ]

  return (
    <View style={styles.lineup}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => String(item.id + index)}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) =>
          delineate ? <Text>{title}</Text> : null
        }
        ListHeaderComponent={header}
      />
    </View>
  )
}
