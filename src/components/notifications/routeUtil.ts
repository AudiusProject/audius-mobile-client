import { UserCollection } from 'audius-client/src/common/models/Collection'
import { Track } from 'audius-client/src/common/models/Track'
import { Nullable } from 'audius-client/src/common/utils/typeUtils'
import Config from 'react-native-config'

import {
  Achievement,
  Entity,
  Notification,
  NotificationType
} from 'app/store/notifications/types'
import {
  getTrackRoute,
  getUserRoute,
  getCollectionRoute,
  getAudioPageRoute,
  TrackRoute,
  UserHandle
} from 'app/utils/routes'

const AUDIUS_URL = Config.AUDIUS_URL

export const getUserListRoute = (
  notification: Notification,
  fullUrl = false
) => {
  const route = `/notification/${notification.id}/users`
  return fullUrl ? `${AUDIUS_URL}${route}` : route
}

export const getEntityRoute = (
  entity: Nullable<TrackRoute | UserHandle | UserCollection>,
  entityType: Entity,
  fullUrl = false
) => {
  switch (entityType) {
    case Entity.Track:
      return getTrackRoute(entity as Nullable<TrackRoute>, fullUrl)
    case Entity.User:
      return getUserRoute(entity as Nullable<UserHandle>, fullUrl)
    case Entity.Album:
    case Entity.Playlist:
      return getCollectionRoute(entity as Nullable<UserCollection>, fullUrl)
  }
}

export const getNotificationRoute = (notification: Notification) => {
  switch (notification.type) {
    case NotificationType.Announcement:
      return null
    case NotificationType.Follow: {
      const users = notification.users
      const isMultiUser = !!users && users.length > 1
      if (isMultiUser) {
        return getUserListRoute(notification)
      }
      const firstUser = notification.users[0]
      return getUserRoute(firstUser)
    }
    case NotificationType.UserSubscription:
      return getEntityRoute(notification.entities[0], notification.entityType)
    case NotificationType.Favorite:
      return getEntityRoute(notification.entity, notification.entityType)
    case NotificationType.Repost:
      return getEntityRoute(notification.entity, notification.entityType)
    case NotificationType.Milestone:
      if (notification.achievement === Achievement.Followers) {
        return getUserRoute(notification.user)
      }
      return getEntityRoute(notification.entity, notification.entityType)
    case NotificationType.RemixCosign: {
      const original = notification.entities.find(
        (track: Track) => track.owner_id === notification.parentTrackUserId
      )
      return getEntityRoute(original, Entity.Track)
    }
    case NotificationType.RemixCreate: {
      const remix = notification.entities.find(
        (track: Track) => track.track_id === notification.childTrackId
      )
      return getEntityRoute(remix, Entity.Track)
    }
    case NotificationType.TrendingTrack:
      return getEntityRoute(notification.entity, notification.entityType)
    case NotificationType.ChallengeReward:
    case NotificationType.TierChange:
      return getAudioPageRoute()
  }
}
