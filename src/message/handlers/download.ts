import 'react-native-url-polyfill/auto'

import { Platform, Share } from 'react-native'
import RNFetchBlob, { FetchBlobResponse } from 'rn-fetch-blob'

import { MessageType, MessageHandlers } from 'app/message/types'

export const messageHandlers: Partial<MessageHandlers> = {
  [MessageType.DOWNLOAD_TRACK]: async ({ message }) => {
    try {
      const fileUrl = message.urls.find(
        url => url !== null && url !== undefined
      )
      const fileExtension = fileUrl.split('.').pop()
      const url = new URL(fileUrl)
      const fileName = url.searchParams.get('filename')

      if (Platform.OS === 'ios') {
        // On iOS fetch & cache the track, then share with react-native's share
        // to trigger the share sheet

        const dirToSave = RNFetchBlob.fs.dirs.DocumentDir
        const res: FetchBlobResponse = await new Promise((resolve, reject) => {
          RNFetchBlob.config({
            fileCache: true,
            path: dirToSave + '/' + message.title + '.' + fileExtension
          })
            .fetch('GET', fileUrl)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
        await Share.share({
          message: fileName,
          url: res.path()
        })
        res.flush()
      } else {
        // On android save to FS and trigger notification that it is saved
        const dirToSave = RNFetchBlob.fs.dirs.DownloadDir

        await new Promise((resolve, reject) => {
          RNFetchBlob.config({
            addAndroidDownloads: {
              notification: true,
              title: fileName,
              useDownloadManager: true,
              description: fileName,
              path: dirToSave + '/' + message.title + '.' + fileExtension,
              mime: 'audio/mpeg',
              mediaScannable: true
            }
          })
            .fetch('GET', fileUrl)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
        console.log('here')
      }
    } catch (e) {
      // TODO: How do we do error handling?
      console.error(e)
    }
  }
}
