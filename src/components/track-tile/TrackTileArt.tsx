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
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 74,
    height: 74
  },

  imageWrapper: {
    borderRadius: 4,
    overflow: 'hidden'
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

  return coSign ? (
    <CoSign
      size={Size.SMALL}
      style={[styles.container, style]}
      hasFavorited={coSign.has_remix_author_saved}
      hasReposted={coSign.has_remix_author_reposted}
      coSignName={coSign.user.name}
      userId={coSign.user.user_id}
    >
      <DynamicImage
        image={showSkeleton ? null : image}
        style={styles.imageWrapper}
      />
    </CoSign>
  ) : (
    <View style={style}>
      <DynamicImage
        image={showSkeleton ? '' : image}
        style={[styles.container, styles.imageWrapper]}
      />
    </View>
  )
}

export default memo(TrackTileArt)
