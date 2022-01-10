import React from 'react'

import { Remix } from 'audius-client/src/common/models/Track'
import { StyleSheet, View } from 'react-native'

import Text from 'app/components/text'
import UserBadges from 'app/components/user-badges/UserBadges'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors } from 'app/utils/theme'

const messages = {
  coSign: 'Co-Sign',
  reposted: 'Reposted',
  favorited: 'Favorited',
  repostedAndFavorited: 'Reposted & Favorited'
}

const formatCoSign = ({
  hasReposted,
  hasFavorited
}: {
  hasReposted: boolean
  hasFavorited: boolean
}) => {
  if (hasReposted && hasFavorited) {
    return messages.repostedAndFavorited
  } else if (hasFavorited) {
    return messages.favorited
  }
  return messages.reposted
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    coSignText: {
      color: themeColors.neutralLight4,
      fontSize: 12,
      letterSpacing: 0.2,
      lineHeight: 14,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: 10,
      marginTop: 8
    },
    coSignName: {
      marginRight: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    coSignIcon: {
      marginLeft: 4
    }
  })

type Props = {
  coSign: Remix
}

const TrackTileCoSign = ({ coSign }: Props) => {
  const styles = useThemedStyles(createStyles)
  return (
    <View style={styles.coSignText}>
      <View style={styles.coSignName}>
        <Text>{coSign.user.name}</Text>
        <UserBadges
          user={coSign.user}
          style={styles.coSignIcon}
          badgeSize={8}
        />
      </View>
      {formatCoSign({
        hasReposted: coSign.has_remix_author_reposted,
        hasFavorited: coSign.has_remix_author_saved
      })}
    </View>
  )
}

export default TrackTileCoSign
