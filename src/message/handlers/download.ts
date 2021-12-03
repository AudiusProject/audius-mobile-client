import RNFetchBlob from 'rn-fetch-blob'

import { MessageType, MessageHandlers } from 'app/message/types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.DOWNLOAD_TRACK]: async ({ message }) => {
    const fileUrl = message.urls.find(url => url !== null && url !== undefined)
    const fileExtension = fileUrl.split('.').pop()

    // TODO (milind): Figure out why it won't save in the MusicDir
    console.log(RNFetchBlob.fs.dirs)
    const dirToSave = RNFetchBlob.fs.dirs.DocumentDir

    RNFetchBlob.config({
      fileCache: true,
      path: dirToSave + '/' + message.title + '.' + fileExtension
    })
      .fetch('GET', fileUrl)
      .then(res => {
        // TODO: Show some kind of toast suggesting the file was downloaded
        console.log('The file saved to ', res.path())
      })
      // TODO: How do we do error handling?
      .catch(err => console.log('error', err))
  }
}
