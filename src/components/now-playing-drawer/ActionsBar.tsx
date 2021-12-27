import React from 'react'

import { View, StyleSheet } from 'react-native'

import IconKebabHorizontal from 'app/assets/images/iconKebabHorizontal.svg'
import IconShare from 'app/assets/images/iconShare.svg'
import IconButton from 'app/components/icon-button'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors } from 'app/utils/theme'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      height: 48,
      borderRadius: 10,
      backgroundColor: themeColors.neutralLight8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }
  })

const ActionsBar = () => {
  const styles = useThemedStyles(createStyles)
  const renderShareButton = () => {
    return <IconButton icon={IconShare} />
  }
  const renderOptionsButton = () => {
    return <IconButton icon={IconKebabHorizontal} />
  }
  return (
    <View style={styles.container}>
      {renderShareButton()}
      {renderShareButton()}
      {renderShareButton()}
      {renderOptionsButton()}
    </View>
  )
}

export default ActionsBar
