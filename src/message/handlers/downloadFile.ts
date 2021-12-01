import Share from 'react-native-share'

import { MessageType, MessageHandlers } from 'app/message/types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.SHARE]: async ({ message }) => {
    console.log('inside downloadFile handler', message.url)
    await Share.open({
      message: message.message,
      url: message.url,
      saveToFiles: true
    })
  }
}
