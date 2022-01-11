import { PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { Favorite } from 'audius-client/src/common/models/Favorite'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import { CoverArtSizes } from 'audius-client/src/common/models/ImageSizes'
import { Repost } from 'audius-client/src/common/models/Repost'
import { FieldVisibility, Remix } from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'

export enum TrackTileSize {
  LARGE = 'LARGE',
  SMALL = 'SMALL'
}

export type TileProps = {
  /** Object containing image sizes */
  coverArtSizes: CoverArtSizes

  /** Track's duration in seconds displayed in the top right */
  duration: number

  /** Array of reposts from followees */
  followeeReposts: Repost[]

  /** Array of saves from followees */
  followeeSaves: Favorite[]

  /** If the current user has reposted */
  hasCurrentUserReposted: boolean

  /** If the current user has saved */
  hasCurrentUserSaved: boolean

  /** ID of the track */
  id: ID

  /** Index of track in lineup */
  index: number

  /** If track metadata is loading in */
  isLoading: boolean

  /** If track is playing */
  isPlaying: boolean

  /** Are we in a trending lineup? Allows tiles to specialize their rendering */
  isTrending: boolean

  /** If the track is unlisted/hidden */
  isUnlisted?: boolean

  /** Function to call when track & art has loaded */
  onLoad: (index: number) => void

  /** Number of reposts */
  repostCount: number

  /** Whether to show an icon indicating rank in lineup */
  showRankIcon: boolean

  /** Size of the tile */
  size?: TrackTileSize

  /** Function to call when play is toggled */
  togglePlay: (uid: UID, trackId: ID, source?: PlaybackSource) => void

  /** id of the current user */
  uid: UID

  /** Artist who uploaded the track  */
  user: User
}

export type TrackTileProps = TileProps & {
  /** Name of the artist who uploaded the track */
  artistName: string

  /** Optional object containing coSign info */
  coSign?: Remix | null

  /** Optional object containing which fields are visible */
  fieldVisibility?: FieldVisibility

  /** If the track is the artist pick */
  isArtistPick?: boolean

  /** Number of listens */
  listenCount?: number

  /** Function to call when overflow icon is clicked */
  onClickOverflow?: (trackId: ID) => void

  /** Number of saves */
  saveCount: number

  /** Whether or not to show the artist pick indicators */
  showArtistPick?: boolean

  /** Whether or not to show the loading skeleton */
  showSkeleton?: boolean

  /** Title of the track */
  title: string
}
