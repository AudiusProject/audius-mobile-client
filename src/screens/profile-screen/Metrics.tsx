import { ProfileUser } from 'audius-client/src/pages/profile-page/store/types'
import { Text, View } from 'react-native'

import { makeStyles } from 'app/styles/makeStyles'

const useStyles = makeStyles(({ typography, palette, spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing(2)
  },
  metric: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing(4)
  },
  value: {
    fontSize: 14,
    fontFamily: typography.fontByWeight.heavy,
    color: palette.neutral,
    marginRight: spacing(1)
  },
  label: {
    fontSize: 14,
    fontFamily: typography.fontByWeight.demiBold,
    color: palette.neutralLight4
  }
}))

type ProfileMetricsProps = {
  profile: ProfileUser
}

export const ProfileMetrics = ({ profile }: ProfileMetricsProps) => {
  const styles = useStyles()

  return (
    <View style={styles.root}>
      <View style={styles.metric}>
        <Text style={styles.value}>{profile.track_count}</Text>
        <Text style={styles.label}>Tracks</Text>
      </View>
      <View style={styles.metric}>
        <Text style={styles.value}>{profile.follower_count}</Text>
        <Text style={styles.label}>Followers</Text>
      </View>
      <View style={styles.metric}>
        <Text style={styles.value}>{profile.followee_count}</Text>
        <Text style={styles.label}>Following</Text>
      </View>
    </View>
  )
}
