import Share from 'react-native-share'

import { MessageType, MessageHandlers } from 'app/message/types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.DOWNLOAD_TRACK]: async ({ message }) => {
    console.log('inside downloadFile handler', message)
    const url = message.urls[0]

    Share.open({
      message: message.title,
      url: url,
      saveToFiles: message.saveToFiles
    })
      .then(res => console.log('success: ', res))
      .catch(err => console.log('error: ', err))
  }
}
