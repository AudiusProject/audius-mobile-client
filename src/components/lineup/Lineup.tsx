import React, { useCallback, useMemo, useState } from 'react'

import { Name, PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import Kind from 'audius-client/src/common/models/Kind'
import { Lineup as LineupData } from 'audius-client/src/common/models/Lineup'
import { LineupActions } from 'audius-client/src/common/store/lineup/actions'
import { range } from 'lodash'
import {
  Dimensions,
  SectionList,
  SectionListProps,
  StyleSheet,
  View
} from 'react-native'
import { useSelector } from 'react-redux'

import Text from 'app/components/text'
import { TrackTile, TrackTileSkeleton } from 'app/components/track-tile'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { getPlaying, getPlayingUid } from 'app/store/audio/selectors'
import { make, track } from 'app/utils/analytics'

import { delineateByTime } from './delineate'
import { LineupItem, LineupVariant } from './types'

// The max number of tiles to load
const MAX_TILES_COUNT = 1000

// The max number of loading tiles to display if count prop passes
const MAX_COUNT_LOADING_TILES = 18

// The inital multiplier for number of tracks to fetch on lineup load
// multiplied by the number of tracks that fit the browser height
export const INITIAL_LOAD_TRACKS_MULTIPLIER = 1.75
export const INITIAL_PLAYLISTS_MULTIPLER = 1

// A multiplier for the number of tiles to fill a page to be
// loaded in on each call (after the intial call)
const TRACKS_AHEAD_MULTIPLIER = 0.75

// Threshold for how far away from the bottom (of the list) the user has to be
// before fetching more tracks as a percentage of the list height
const LOAD_MORE_THRESHOLD = 0.5

// The minimum inital multiplier for tracks to fetch on lineup load
// use so that multiple lineups on the same page can switch w/out a reload
const MINIMUM_INITIAL_LOAD_TRACKS_MULTIPLIER = 1

// tile height + margin
const totalTileHeight = {
  main: 152 + 16,
  section: 124 + 16,
  condensed: 124 + 8,
  playlist: 350
}

// Load TRACKS_AHEAD x the number of tiles to be displayed on the screen
export const getLoadMoreTrackCount = (
  variant: LineupVariant,
  multiplier: number | (() => number)
) =>
  Math.ceil(
    (Dimensions.get('window').height / totalTileHeight[variant]) *
      (typeof multiplier === 'function' ? multiplier() : multiplier)
  )

const useItemCounts = (variant: LineupVariant) =>
  useMemo(
    () => ({
      minimum: getLoadMoreTrackCount(
        variant === LineupVariant.PLAYLIST
          ? LineupVariant.PLAYLIST
          : LineupVariant.MAIN,
        MINIMUM_INITIAL_LOAD_TRACKS_MULTIPLIER
      ),
      initial: getLoadMoreTrackCount(variant, () =>
        variant === LineupVariant.PLAYLIST
          ? INITIAL_PLAYLISTS_MULTIPLER
          : INITIAL_LOAD_TRACKS_MULTIPLIER
      ),
      loadMore: getLoadMoreTrackCount(variant, TRACKS_AHEAD_MULTIPLIER)
    }),
    [variant]
  )

type Props = {
  /** Object containing lineup actions such as setPage */
  actions: LineupActions

  /** The maximum number of total tracks to fetch */
  count?: number

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

  /** The number of tracks to fetch in each request */
  limit?: number

  /**
   * The Lineup object containing entries
   */
  lineup: LineupData<LineupItem>

  /**
   * Function called to load more entries
   */
  loadMore?: (offset: number, limit: number, overwrite: boolean) => void

  /**
   * A header to display at the top of the lineup,
   * will scroll with the rest of the content
   */
  header?: SectionListProps<any>['ListHeaderComponent']

  /**
   * Function called on refresh
   */
  refresh?: () => void

  /**
   * Boolean indicating if currently fetching data for a refresh
   * Must be provided if `refresh` is provided
   */
  refreshing?: boolean

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
   * Is the lineup responsible for initially fetching it's own data
   */
  selfLoad?: boolean

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
  actions,
  count,
  delineate,
  isTrending,
  leadingElementId,
  limit,
  lineup,
  loadMore,
  header,
  playTrack,
  pauseTrack,
  rankIconCount = 0,
  refresh,
  refreshing,
  showLeadingElementArtistPick = true,
  variant
}: Props) => {
  const dispatchWeb = useDispatchWeb()
  const [loadedTiles, setLoadedTiles] = useState<boolean[]>([])

  const playing = useSelector(getPlaying)
  const playingUid = useSelector(getPlayingUid)
  const itemCounts = useItemCounts(variant)

  const pageItemCount = useMemo(() => {
    return itemCounts.initial + (lineup.page - 1) * itemCounts.loadMore
  }, [itemCounts, lineup])

  const countOrDefault = useMemo(
    () => (count !== undefined ? count : MAX_TILES_COUNT),
    [count]
  )

  const onLoad = useCallback(
    (index: number) => {
      if (!loadedTiles[index]) {
        loadedTiles[index] = true
        setLoadedTiles(loadedTiles)
      }
    },
    [loadedTiles, setLoadedTiles]
  )

  const onEndReached = useCallback(() => {
    const { hasMore, page } = lineup

    if (!hasMore) {
      return
    }

    const lineupLength = lineup.entries.length
    const offset = lineupLength + lineup.deleted

    if (
      (!limit || lineupLength !== limit) &&
      loadMore &&
      lineupLength < countOrDefault &&
      (page === 0 || pageItemCount <= offset)
    ) {
      const trackLoadCount = itemCounts.initial + page * itemCounts.loadMore

      dispatchWeb(actions.setPage(page + 1))

      const limit =
        Math.min(trackLoadCount, Math.max(countOrDefault, itemCounts.minimum)) -
        offset

      loadMore(offset, limit, page === 0)
    }
  }, [
    actions,
    countOrDefault,
    dispatchWeb,
    itemCounts,
    limit,
    lineup,
    loadMore,
    pageItemCount
  ])

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
    if (item._loading) {
      return (
        <View style={styles.item}>
          <TrackTileSkeleton />
        </View>
      )
    }

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
      return null
      // TODO: Playlist tile
    }
  }

  const sections = useMemo(() => {
    const { entries, hasMore, isMetadataLoading, page } = lineup
    const itemDisplayCount = page <= 1 ? itemCounts.initial : pageItemCount

    const getSkeletonCount = () => {
      if (
        isMetadataLoading &&
        hasMore &&
        entries.length < countOrDefault &&
        (!limit || entries.length !== limit)
      ) {
        // Calculate the number of skeletons to display: total # requested - # rendered - # deleted
        // If the `count` prop is provided, render the count - # loaded tiles
        const loadingSkeletonDifferential = Math.max(
          itemDisplayCount - entries.length - lineup.deleted,
          0
        )
        return count
          ? Math.min(count - entries.length, MAX_COUNT_LOADING_TILES)
          : loadingSkeletonDifferential
      }
      return 0
    }

    // Append loading items to the array of already loaded items
    const items = [
      ...entries,
      ...range(getSkeletonCount()).map(() => ({ _loading: true } as LineupItem))
    ]

    // If delineate=true, create sections of items based on time.
    // Otherwise return one section
    return delineate
      ? delineateByTime(items)
      : [
          {
            title: '',
            data: items
          }
        ]
  }, [
    count,
    countOrDefault,
    delineate,
    itemCounts,
    limit,
    lineup,
    pageItemCount
  ])

  return (
    <View style={styles.lineup}>
      <SectionList
        ListHeaderComponent={header}
        ListFooterComponent={<View style={{ height: 160 }} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={LOAD_MORE_THRESHOLD}
        // TODO: Either style the refreshing indicator or
        // roll our own
        onRefresh={refresh}
        refreshing={refreshing}
        sections={sections}
        // TODO: figure out why this is causing duplicate ids
        // keyExtractor={(item, index) => String(item.id + index)}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) =>
          delineate ? <Text>{title}</Text> : null
        }
      />
    </View>
  )
}
