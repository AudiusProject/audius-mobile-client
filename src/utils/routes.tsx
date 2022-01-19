import { UserCollection } from 'audius-client/src/common/models/Collection'
import { Track } from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'
import { Nullable } from 'audius-client/src/common/utils/typeUtils'
import Config from 'react-native-config'

export type UserHandle = Pick<User, 'handle'>
export type TrackRoute = Pick<Track, 'permalink'>

/**
 * Formats a URL name for routing.
 *  Removes reserved URL characters
 *  Replaces white space with -
 *  Lower cases
 * @param name
 */
export const formatUrlName = (name: string) => {
  if (!name) {
    return ''
  }
  return (
    name
      .replace(/!|%|#|\$|&|'|\(|\)|&|\*|\+|,|\/|:|;|=|\?|@|\[|\]/g, '')
      .replace(/\s+/g, '-')
      // Reduce repeated `-` to a single `-`
      .replace(/-+/g, '-')
      .toLowerCase()
  )
}

/**
 * Encodes a formatted URL name for routing.
 * Using window.location will automatically decode
 * the encoded component, so using the above formatUrlName(string) can
 * be used to compare results with the window.location directly.
 * @param name
 */
export const encodeUrlName = (name: string) => {
  return encodeURIComponent(formatUrlName(name))
}

const AUDIUS_URL = Config.AUDIUS_URL

export const getTrackRoute = (track: Nullable<TrackRoute>, fullUrl = false) => {
  if (!track) {
    return null
  }
  const route = track.permalink
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getUserRoute = (user: Nullable<UserHandle>, fullUrl = false) => {
  if (!user) {
    return null
  }
  const route = `/${user.handle}`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getCollectionRoute = (
  collection: Nullable<UserCollection>,
  fullUrl = false
) => {
  if (!collection) {
    return null
  }
  const handle = collection.user.handle
  const title = collection.playlist_name
  const id = collection.playlist_id
  const route = collection.is_album
    ? `/${encodeUrlName(handle)}/album/${encodeUrlName(title)}-${id}`
    : `/${encodeUrlName(handle)}/playlist/${encodeUrlName(title)}-${id}`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getSearchRoute = (query: string, fullUrl = false) => {
  const route = `/search/${encodeUrlName(query)}`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getTagSearchRoute = (query: string, fullUrl = false) => {
  const route = `/search/#${encodeUrlName(query)}`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getEmptyPageRoute = (fullUrl = false) => {
  const route = `/empty_page`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getAudioPageRoute = () => {
  return '/audio'
}
