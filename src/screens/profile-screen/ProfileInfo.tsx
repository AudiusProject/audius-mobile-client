import { getAccountUser } from 'audius-client/src/common/store/account/selectors'
import { ProfileUser } from 'audius-client/src/common/store/pages/profile/types'
import { View, Text } from 'react-native'

import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { makeStyles } from 'app/styles'

import { FollowButton } from './FollowButton'

const useStyles = makeStyles(({ typography, palette, spacing }) => ({
  username: {
    ...typography.h1,
    color: palette.neutral
  },
  handle: {
    ...typography.h4,
    color: palette.neutralLight4,
    marginBottom: spacing(4)
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  actionButtons: {
    flexDirection: 'row'
  }
}))

type ProfileInfoProps = {
  profile: ProfileUser
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const styles = useStyles()
  const accountUser = useSelectorWeb(getAccountUser)
  const isOwner = accountUser?.user_id === profile.user_id

  return (
    <View style={styles.info}>
      <View>
        <Text accessibilityRole='header' style={styles.username}>
          {profile.name}
        </Text>
        <Text style={styles.handle}>@{profile.handle}</Text>
      </View>
      {isOwner ? null : (
        <View style={styles.actionButtons}>
          <FollowButton profile={profile} />
        </View>
      )}
    </View>
  )
}
