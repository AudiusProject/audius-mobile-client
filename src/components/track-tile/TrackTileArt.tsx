import React, { memo } from 'react'

import {
  useTrackCoverArt,
  useCollectionCoverArt,
  useLoadImageWithTimeout
} from 'audius-client/src/common/hooks/useImageSize'
import { ID } from 'audius-client/src/common/models/Identifiers'
import {
  CoverArtSizes,
  SquareSizes
} from 'audius-client/src/common/models/ImageSizes'
import { Remix } from 'audius-client/src/common/models/Track'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import CoSign, { Size } from 'app/components/co-sign'
import DynamicImage from 'app/components/dynamic-image'

type TrackTileArtProps = {
  isTrack: boolean
  id: ID
  coverArtSizes: CoverArtSizes
  style?: StyleProp<ViewStyle>
  showSkeleton?: boolean
  coSign?: Remix | null
  // Called when the image is done loading
  callback: () => void
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 4,
    height: 74,
    width: 74
  }
})

const TrackTileArt = ({
  id,
  isTrack,
  style,
  coverArtSizes,
  showSkeleton,
  coSign,
  callback
}: TrackTileArtProps) => {
  const useImage = isTrack ? useTrackCoverArt : useCollectionCoverArt
  const image = useImage(id, coverArtSizes, SquareSizes.SIZE_150_BY_150)

  useLoadImageWithTimeout(image, callback)

  const imageElement = (
    <DynamicImage
      image={showSkeleton ? null : { uri: image }}
      style={styles.image}
    />
  )

  return coSign ? (
    <CoSign
      size={Size.SMALL}
      style={style}
      hasFavorited={coSign.has_remix_author_saved}
      hasReposted={coSign.has_remix_author_reposted}
      coSignName={coSign.user.name}
      userId={coSign.user.user_id}
    >
      {imageElement}
    </CoSign>
  ) : (
    <View style={[style, styles.image]}>{imageElement}</View>
  )
}

export default memo(TrackTileArt)
