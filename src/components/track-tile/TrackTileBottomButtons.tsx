import React, { useContext } from 'react'

import { ImageStyle, Pressable, StyleSheet, View } from 'react-native'

import IconKebabHorizontal from 'app/assets/images/iconKebabHorizontal.svg'
import IconShare from 'app/assets/images/iconShare.svg'
import FavoriteButton from 'app/components/favorite-button'
import RepostButton from 'app/components/repost-button'
import {
  ToastContext,
  SHARE_TOAST_TIMEOUT
} from 'app/components/toast/ToastContext'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRowCentered } from 'app/styles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

type Props = {
  hasReposted: boolean
  hasSaved: boolean
  isOwner: boolean
  isShareHidden?: boolean
  isUnlisted?: boolean
  onPressOverflow: () => void
  onPressShare: () => void
  onToggleRepost: () => void
  onToggleSave: () => void
}

const messages = {
  copiedToast: 'Copied To Clipboard'
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    bottomButtons: {
      ...flexRowCentered(),
      justifyContent: 'space-between',
      marginVertical: 2,
      marginHorizontal: 12,
      height: 36,
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight8
    },
    button: {
      marginHorizontal: 16
    },
    firstButton: {
      marginLeft: 0
    },
    leftButtons: {
      ...flexRowCentered()
    },
    lastButton: {
      marginRight: 0
    }
  })

export const TrackTileBottomButtons = ({
  hasReposted,
  hasSaved,
  isOwner,
  isShareHidden,
  isUnlisted,
  onPressOverflow,
  onPressShare,
  onToggleRepost,
  onToggleSave
}: Props) => {
  const { toast } = useContext(ToastContext)
  const { neutralLight4 } = useThemeColors()
  const styles = useThemedStyles(createStyles)

  const repostButton = (
    <RepostButton
      onPress={onToggleRepost}
      isActive={hasReposted}
      isDisabled={isOwner}
      style={[styles.button, styles.firstButton] as ImageStyle}
    />
  )

  const favoriteButton = (
    <FavoriteButton
      onPress={onToggleSave}
      isActive={hasSaved}
      isDisabled={isOwner}
      style={styles.button as ImageStyle}
    />
  )

  const shareButton = (
    <Pressable
      onPress={() => {
        toast({
          content: messages.copiedToast,
          timeout: SHARE_TOAST_TIMEOUT
        })
        onPressShare()
      }}
    >
      <IconShare
        height={18}
        width={18}
        fill={neutralLight4}
        style={styles.button}
      />
    </Pressable>
  )

  const moreButton = (
    <Pressable onPress={onPressOverflow}>
      <IconKebabHorizontal
        height={22}
        width={22}
        fill={neutralLight4}
        style={[styles.button, styles.lastButton]}
      />
    </Pressable>
  )

  return (
    <View style={styles.bottomButtons}>
      <View style={styles.leftButtons}>
        {!isUnlisted && (
          <>
            {repostButton}
            {favoriteButton}
            {!isShareHidden && shareButton}
          </>
        )}
      </View>
      {moreButton}
    </View>
  )
}
