import * as notificationsActions from '../../store/notifications/actions'
import PushNotifications from '../../notifications'
import { remindUserToTurnOnNotifications } from '../../components/notification-reminder/NotificationReminder'
import { Status } from '../../types/status'

import { MessageType, MessageHandlers } from '../types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.ENABLE_PUSH_NOTIFICATIONS]: async (message, _, postMessage) => {
    PushNotifications.requestPermission()
    const info = await PushNotifications.getToken()
    postMessage({
      type: message.type,
      id: message.id,
      ...info
    })
  },
  [MessageType.DISABLE_PUSH_NOTIFICATIONS]: async (message, _, postMessage) => {
    const info = await PushNotifications.getToken()
    PushNotifications.deregister()
    postMessage({
      type: message.type,
      id: message.id,
      ...info
    })
  },
  [MessageType.RESET_NOTIFICATIONS_BADGE_COUNT]: _ => {
    PushNotifications.setBadgeCount(0)
  },
  [MessageType.PROMPT_PUSH_NOTIFICATION_REMINDER]: (_, __, postMessage) => {
    remindUserToTurnOnNotifications(postMessage)
  },
  [MessageType.OPEN_NOTIFICATIONS]: (_, dispatch, postMessage) => {
    dispatch(notificationsActions.open())
    postMessage({
      type: MessageType.MARK_ALL_NOTIFICATIONS_AS_VIEWED,
      isAction: true
    })
  },
  [MessageType.FETCH_NOTIFICATIONS_SUCCESS]: message => {
    notificationsActions.append(Status.SUCCESS, message.notifications)
  },
  [MessageType.FETCH_NOTIFICATIONS_REPLACE]: message => {
    notificationsActions.replace(Status.SUCCESS, message.notifications)
  },
  [MessageType.FETCH_NOTIFICATIONS_FAILURE]: (_, dispatch) => {
    dispatch(notificationsActions.append(Status.FAILURE, []))
  }
}
