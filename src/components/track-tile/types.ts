import { PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { Favorite } from 'audius-client/src/common/models/Favorite'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import { CoverArtSizes } from 'audius-client/src/common/models/ImageSizes'
import { Repost } from 'audius-client/src/common/models/Repost'
import {
  FieldVisibility,
  LineupTrack,
  Remix
} from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'
import { StyleProp, ViewStyle } from 'react-native'

export enum TrackTileSize {
  LARGE = 'LARGE',
  SMALL = 'SMALL'
}

// TODO: sk - add comments

export type TileProps = {
  activityTimestamp?: string
  containerStyle?: StyleProp<ViewStyle>
  coverArtSizes: CoverArtSizes
  duration: number
  followeeReposts: Repost[]
  followeeSaves: Favorite[]
  goToRoute: (route: string) => void
  hasCurrentUserReposted: boolean
  hasCurrentUserSaved: boolean
  id: ID
  index: number
  isActive: boolean
  isLoading: boolean
  isPlaying: boolean
  isTrending: boolean
  isUnlisted?: boolean
  onLoad: (index: number) => void
  repostCount: number
  showRankIcon: boolean
  /** Size of the track Tile Large or Small */
  size?: TrackTileSize
  togglePlay: (uid: UID, trackId: ID, source?: PlaybackSource) => void
  trackTileStyles?: StyleProp<ViewStyle>
  uid: UID
  user: User
}

export type TrackTileProps = TileProps & {
  artistHandle: string
  artistIsVerified: boolean
  artistName: string
  coSign?: Remix | null
  disableActions?: boolean
  fieldVisibility?: FieldVisibility
  isArtistPick?: boolean
  listenCount?: number
  onClickOverflow?: (trackId: ID) => void
  ordered?: boolean
  saveCount: number
  showArtistPick?: boolean
  showArtworkIcon?: boolean
  showListens?: boolean
  showSkeleton?: boolean
  title: string
  uploadError?: boolean
  uploading?: boolean
  uploadPercent?: number
  uploadText?: string
  userSignedIn?: boolean
}

export type PlaylistTileProps = TileProps & {
  activeTrackUid: UID | null
  artistHandle: string
  artistIsVerified: boolean
  artistName: string
  contentTitle: string
  disableActions?: boolean
  isAlbum: boolean
  isPublic: boolean
  numLoadingSkeletonRows?: number
  /** Number of rows to show when in loading state, if any */
  ordered?: boolean
  ownerId: ID
  pauseTrack: () => void
  playingTrackId?: ID | null
  playingUid?: UID | null
  playlistTitle: string
  playTrack: (uid: UID) => void
  // TODO: remove when making all playlist tiles functional components
  record?: (event: any) => void
  saveCount: number
  showArtworkIcon?: boolean
  showSkeleton?: boolean
  trackCount: number
  tracks: LineupTrack[]
  uploading?: boolean
  uploadPercent?: number
}

export type SkeletonTileProps = {
  index?: number
  key: number
  tileSize: TrackTileSize
  ordered?: boolean
}
