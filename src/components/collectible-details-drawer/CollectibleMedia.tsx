import React, { useCallback, useState } from 'react'

import {
  Collectible,
  CollectibleMediaType
} from 'audius-client/src/common/models/Collectible'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Video from 'react-native-video'
import AutoSizeImage from '../image/AutoSizeImage'

const styles = StyleSheet.create({
  detailsMediaWrapper: {
    //   margin: 48px 24px 0;
    //   max-width: none;
    //   max-height: none;
    //   height: auto;
  },
  image: {
    borderRadius: 8
  }
})

export const CollectibleMedia: React.FC<{
  collectible: Collectible
}> = ({ collectible }) => {
  const { mediaType, imageUrl, videoUrl, gifUrl, threeDUrl } = collectible

  const [isMuted, setIsMuted] = useState<boolean>(true)
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted)
  }, [isMuted, setIsMuted])

  return mediaType === CollectibleMediaType.THREE_D ? (
    <View style={styles.detailsMediaWrapper}>
      <AutoSizeImage source={gifUrl!} />
    </View>
  ) : mediaType === CollectibleMediaType.GIF ? (
    <View style={styles.detailsMediaWrapper}>
      <AutoSizeImage source={{ uri: gifUrl }} />
    </View>
  ) : mediaType === CollectibleMediaType.VIDEO ? (
    <TouchableWithoutFeedback
      style={styles.detailsMediaWrapper}
      onPress={toggleMute}
    >
      <Video muted={isMuted} source={videoUrl!} />
      {/* {isMuted ? (
        <IconMute className={styles.volumeIcon} />
      ) : (
        <IconVolume className={styles.volumeIcon} />
      )} */}
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.detailsMediaWrapper}>
      <AutoSizeImage source={{ uri: imageUrl }} style={styles.image} />
    </View>
  )
}
