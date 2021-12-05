import { Platform, Share } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

import { MessageType, MessageHandlers } from 'app/message/types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.DOWNLOAD_TRACK]: async ({ message }) => {
    const fileUrl = message.urls.find(url => url !== null && url !== undefined)
    const fileExtension = fileUrl.split('.').pop()

    if (Platform.OS === 'ios') {
      // On iOS fetch & cache the track, let user choose where to download it
      // with the share sheet, then delete the cached copy of the track
      try {
        const pathToSave =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/' +
          message.title +
          '.' +
          fileExtension

        const fetchRes = await RNFetchBlob.config({
          fileCache: true,
          path: pathToSave
        }).fetch('GET', fileUrl)

        await Share.share({
          url: fetchRes.path()
        })
        fetchRes.flush()
      } catch (err) {
        console.log(err)
      }
    } else {
      // On android save to FS and trigger notification that it is saved
      try {
        const pathToSave =
          RNFetchBlob.fs.dirs.DownloadDir +
          '/' +
          message.title +
          '.' +
          fileExtension

        await RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: message.title,
            description: message.title,
            path: pathToSave,
            mime: 'audio/mpeg'
          }
        }).fetch('GET', fileUrl)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
