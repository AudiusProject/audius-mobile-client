import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import Kind from 'audius-client/src/common/models/Kind'
import { Maybe } from 'audius-client/src/common/utils/typeUtils'

export enum LineupVariant {
  MAIN = 'main',
  SECTION = 'section',
  CONDENSED = 'condensed',
  PLAYLIST = 'playlist'
}

export type LineupItem =
  | {
      _loading: false
      id: ID
      kind: Kind
      track_id?: ID
      uid: UID
      _marked_deleted?: boolean
      activityTimestamp?: Maybe<number | string>
    }
  | {
      _loading: true
    }
