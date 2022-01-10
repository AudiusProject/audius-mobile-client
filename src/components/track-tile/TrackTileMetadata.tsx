import React from 'react'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { CoverArtSizes } from 'audius-client/src/common/models/ImageSizes'
import { Remix } from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View
} from 'react-native'

import IconVolume from 'app/assets/images/iconVolume.svg'
import Skeleton from 'app/components/skeleton'
import Text, { AnimatedText } from 'app/components/text'
import UserBadges from 'app/components/user-badges/UserBadges'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { flexCol, flexRow, flexRowCentered } from 'app/styles'
import { ThemeColors } from 'app/utils/theme'

import TrackTileArt from './TrackTileArt'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    metadata: {
      ...flexRow()
    },
    albumArtContainer: {
      marginTop: 10,
      marginRight: 12,
      marginLeft: 10
    },
    titles: {
      ...flexCol(),
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',

      /* Text truncation */
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: '65%',
      overflow: 'hidden',
      marginRight: 12,
      marginTop: 10
    },
    titlesActive: {
      color: themeColors.primary
    },
    titlesSkeleton: {
      width: '100%'
    },
    title: {
      ...flexRowCentered(),
      marginTop: 'auto',
      paddingRight: 5,
      marginBottom: 2,
      minHeight: 20,
      width: '100%'
    },
    titleText: {
      fontSize: 16
    },
    artist: {
      ...flexRowCentered(),
      flexWrap: 'nowrap',
      marginBottom: 'auto',
      paddingRight: 5,
      maxWidth: '100%',
      minHeight: 20
    },
    skeleton: {
      position: 'absolute',
      top: 0
    },
    iconVerified: {
      marginLeft: 4
    },
    coSignLabel: {
      position: 'absolute',
      bottom: -3,
      left: 96,
      color: themeColors.primary,
      fontSize: 12,
      letterSpacing: 1,
      lineHeight: 15,
      textTransform: 'uppercase'
    }
  })

const messages = {
  coSign: 'Co-Sign'
}

type Props = {
  artistName: string
  coSign?: Remix | null
  coverArtSizes: CoverArtSizes
  fadeIn: { opacity: Animated.Value }
  goToArtistPage: (e: GestureResponderEvent) => void
  goToTrackPage: (e: GestureResponderEvent) => void
  id: ID
  isLoaded: boolean
  isPlaying: boolean
  setArtworkLoaded: (loaded: boolean) => void
  showSkeleton: boolean
  title: string
  user: User
}

const TrackTileMetadata = ({
  artistName,
  coSign,
  coverArtSizes,
  fadeIn,
  goToArtistPage,
  goToTrackPage,
  id,
  isLoaded,
  isPlaying,
  setArtworkLoaded,
  showSkeleton,
  title,
  user
}: Props) => {
  const styles = useThemedStyles(createStyles)
  return (
    <View style={styles.metadata}>
      <TrackTileArt
        id={id}
        isTrack={true}
        callback={() => setArtworkLoaded(true)}
        showSkeleton={showSkeleton}
        coverArtSizes={coverArtSizes}
        coSign={coSign}
        style={styles.albumArtContainer}
      />
      <View
        style={[
          styles.titles,
          isPlaying ? styles.titlesActive : {},
          showSkeleton ? styles.titlesSkeleton : {}
        ]}
      >
        <Pressable style={styles.title} onPress={goToTrackPage}>
          <AnimatedText style={[fadeIn, styles.titleText]} weight='bold'>
            {title}
          </AnimatedText>
          {isPlaying && <IconVolume />}
          {!isLoaded && (
            <Skeleton style={styles.skeleton} width='80%' height='80%' />
          )}
        </Pressable>
        <Pressable style={styles.artist} onPress={goToArtistPage}>
          <AnimatedText style={[fadeIn, styles.titleText]} weight='medium'>
            {artistName}
          </AnimatedText>
          <Animated.View style={fadeIn}>
            <UserBadges
              user={user}
              badgeSize={12}
              style={styles.iconVerified}
              hideName
            />
          </Animated.View>
          {!isLoaded && (
            <Skeleton style={styles.skeleton} width='60%' height='80%' />
          )}
        </Pressable>
      </View>
      {coSign && (
        <Text style={styles.coSignLabel} weight='heavy'>
          {messages.coSign}
        </Text>
      )}
    </View>
  )
}

export default TrackTileMetadata
