import { ShareModalContent } from 'audius-client/src/common/store/ui/share-modal/types'

import {
  getCollectionRoute,
  getTrackRoute,
  getUserRoute
} from 'app/utils/routes'
import { getTwitterLink } from 'app/utils/twitter'

export const getContentUrl = content => {
  switch (content.type) {
    case 'track': {
      const { track } = content
      return getTrackRoute(track, true)
    }
    case 'profile': {
      const { profile } = content
      return getUserRoute(profile)
    }
    case 'album': {
      const { album, artist } = content
      return getCollectionRoute({ ...album, user: artist }, true)
    }
    case 'playlist': {
      const { playlist, creator } = content
      return getCollectionRoute({ ...playlist, user: creator }, true)
    }
  }
}

export const getTwitterShareText = content => {
  switch (content.type) {
    case 'track': {
      const {
        track: { title },
        artist: { handle }
      } = content
      return `Check out ${title} by ${handle} on @AudiusProject #Audius`
    }
    case 'profile': {
      const {
        profile: { handle }
      } = content
      return `Check out ${handle} on @AudiusProject #Audius`
    }
    case 'album': {
      const {
        album: { playlist_name },
        artist: { handle }
      } = content
      return `Check out ${playlist_name} by ${handle} @AudiusProject #Audius`
    }
    case 'playlist': {
      const {
        playlist: { playlist_name },
        creator: { handle }
      } = content
      return `Check out ${playlist_name} by ${handle} @AudiusProject #Audius`
    }
  }
}

export const getTwitterShareUrl = (content: ShareModalContent) => {
  const url = getContentUrl(content)
  const shareText = getTwitterShareText(content)
  return getTwitterLink(url, shareText)
}
