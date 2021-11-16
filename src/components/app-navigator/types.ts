import { ID } from 'audius-client/src/common/models/Identifiers'

export type StackParamList = {
  track: { id: ID }
  profile: { id: ID }
}

export type FeedStackParamList = StackParamList & {
  feed: undefined
}
