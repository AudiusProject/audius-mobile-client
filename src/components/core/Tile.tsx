import { ReactNode } from 'react'

import { Pressable, View, ViewStyle } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { makeStyles } from 'app/styles/makeStyles'
import { GestureResponderHandler } from 'app/types/gesture'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    flexDirection: 'row',
    borderColor: palette.neutralLight8,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderRadius: 8
  }
}))

export type TileProps = {
  children: ReactNode
  onPress?: GestureResponderHandler
  style?: ViewStyle
}

export const Tile = ({ children, onPress, style }: TileProps) => {
  const styles = useStyles()
  return (
    <Shadow
      offset={[0, 2]}
      viewStyle={{ alignSelf: 'stretch' }}
      distance={4}
      startColor='rgba(133,129,153,0.05)'
    >
      <View style={[style, styles.root]}>
        <Pressable onPress={onPress}>{children}</Pressable>
      </View>
    </Shadow>
  )
}
