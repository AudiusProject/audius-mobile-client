import React from 'react'

import { StyleSheet, View } from 'react-native'

import IconKebabHorizontal from 'app/assets/images/iconKebabHorizontal.svg'
import IconShare from 'app/assets/images/iconShare.svg'
import FavoriteButton from 'app/components/favorite-button'
import IconButton from 'app/components/icon-button/IconButton'
import LoadingSpinner from 'app/components/loading-spinner'
import RepostButton from 'app/components/repost-button'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexRowCentered } from 'app/styles'
import { ThemeColors, useThemeColors } from 'app/utils/theme'

type ActionButtonRowProps = {
  isOwner: boolean
  hasReposted: boolean
  hasSaved: boolean
  isPublished?: boolean
  isPublishing?: boolean
  showRepost: boolean
  onToggleRepost?: () => void
  onToggleSave?: () => void
  onShare?: () => void
  onPressOverflow?: () => void
  showFavorite: boolean
  showShare: boolean
  showOverflow: boolean
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.neutralLight7,
      height: 60,
      paddingTop: 12,
      paddingBottom: 8
    },

    actionButton: {
      width: 40,
      height: '100%',
      ...flexRowCentered(),
      justifyContent: 'center',
      position: 'relative',
      bottom: 1,
      marginHorizontal: 12
    },

    icon: {
      height: 40,
      width: 40
    },

    iconWrapper: {
      width: 40,
      height: '100%',
      overflow: 'visible',
      ...flexRowCentered(),
      marginHorizontal: 12
    }
  })

/**
 * The action buttons on track and playlist screens
 */
export const TrackScreenActionButtons = ({
  showRepost,
  isOwner,
  hasSaved,
  hasReposted,
  isPublished = true,
  isPublishing = false,
  showFavorite,
  showShare,
  showOverflow,
  onToggleRepost = () => {},
  onToggleSave = () => {},
  onShare = () => {},
  onPressOverflow = () => {}
}: ActionButtonRowProps) => {
  const styles = useThemedStyles(createStyles)
  const { neutralLight4, neutralLight8 } = useThemeColors()

  const repostButton = (
    <RepostButton
      onPress={onToggleRepost ?? (() => {})}
      isActive={hasReposted}
      isDisabled={isOwner}
    />
  )

  const favoriteButton = (
    <FavoriteButton
      onPress={onToggleSave ?? (() => {})}
      isActive={hasSaved}
      isDisabled={isOwner}
    />
  )

  const shareButton = (
    <IconButton
      style={styles.actionButton}
      icon={() => (
        <IconShare fill={!isPublished ? neutralLight8 : neutralLight4} />
      )}
      onPress={isPublished ? onShare : () => {}}
    />
  )

  const spinner = <LoadingSpinner style={styles.actionButton} />

  const overflowMenu = (
    <IconButton
      style={styles.actionButton}
      icon={() => <IconKebabHorizontal />}
      onPress={onPressOverflow}
    />
  )

  return (
    <View style={styles.root}>
      {showRepost && repostButton}
      {showFavorite && favoriteButton}
      {showShare && (isPublishing ? spinner : shareButton)}
      {showOverflow && overflowMenu}
    </View>
  )
}
