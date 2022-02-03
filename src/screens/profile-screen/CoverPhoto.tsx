import { WidthSizes } from 'audius-client/src/common/models/ImageSizes'
import { ProfileUser } from 'audius-client/src/pages/profile-page/store/types'

import BadgeArtist from 'app/assets/images/badgeArtist.svg'
import { DynamicImage } from 'app/components/core'
import { useUserCoverPhoto } from 'app/hooks/useUserCoverPhoto'
import { makeStyles } from 'app/styles/makeStyles'

const useStyles = makeStyles(({ palette, typography, spacing }) => ({
  artistBadge: {
    position: 'absolute',
    top: spacing(5),
    right: spacing(3)
  }
}))

type CoverPhotoProps = {
  profile: ProfileUser
}

export const CoverPhoto = ({ profile }: CoverPhotoProps) => {
  const styles = useStyles()

  const coverPhoto = useUserCoverPhoto(
    profile?.user_id ?? null,
    profile?._cover_photo_sizes ?? null,
    WidthSizes.SIZE_2000
  )

  return (
    <DynamicImage source={{ uri: coverPhoto }} style={{ height: 96 }}>
      <BadgeArtist style={styles.artistBadge} />
    </DynamicImage>
  )
}
