import React from 'react'

import { StyleSheet, View } from 'react-native'

import IconCrown from 'app/assets/images/iconCrown.svg'
import IconTrending from 'app/assets/images/iconTrending.svg'
import Text from 'app/components/text'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors } from 'app/utils/theme'

type Props = {
  /** Whether or not to show the crown icon */
  showCrown: boolean
  /** Index of this item in the lineup */
  index: number
  /** Whether or not the rank icon is visible */
  isVisible?: boolean
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 4,
      marginLeft: 6
    },
    text: {
      color: themeColors.secondary
    }
  })

const TrackTileRankIcon = ({ showCrown, index, isVisible = true }: Props) => {
  const styles = useThemedStyles(createStyles)
  return isVisible ? (
    <View style={styles.container}>
      {showCrown ? <IconCrown /> : <IconTrending />}
      <Text style={styles.text}>{index + 1}</Text>
    </View>
  ) : null
}

export default TrackTileRankIcon
