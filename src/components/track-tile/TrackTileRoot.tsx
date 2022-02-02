import { StyleSheet } from 'react-native'

import { Tile, TileProps } from '../core'

const styles = StyleSheet.create({
  root: {
    minHeight: 152,
    maxWidth: 400
  }
})

type TrackTileRootProps = TileProps

export const TrackTileRoot = (props: TrackTileRootProps) => {
  return <Tile {...props} style={styles.root} />
}
