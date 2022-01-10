import React from 'react'

import { title } from 'process'

import { ID } from 'audius-client/src/common/models/Identifiers'
import { CoverArtSizes } from 'audius-client/src/common/models/ImageSizes'
import { Remix } from 'audius-client/src/common/models/Track'
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
import { ThemeColors } from 'app/utils/theme'

import TrackTileArt from './TrackTileArt'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    metadata: {
      display: 'flex',
      flexDirection: 'row'
    },
    albumArtContainer: {
      marginTop: 10,
      marginRight: 12,
      marginLeft: 10
    },
    titles: {
      display: 'flex',
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
      marginTop: 'auto',
      paddingRight: 5,
      marginBottom: 2,
      display: 'flex',
      flexDirection: 'row',
      minHeight: 20,
      alignItems: 'center',
      width: '100%'
    },
    titleText: {
      fontSize: 16
    },
    artist: {
      marginBottom: 'auto',
      paddingRight: 5,
      maxWidth: '100%',
      minHeight: 20,
      flexWrap: 'nowrap',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row'
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
      // TODO: font weight
      //   fontWeight: var(--font-heavy);
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
  userId: ID
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
  userId
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
        </Pressable>
        {!isLoaded && (
          <Skeleton style={styles.skeleton} width='80%' height='80%' />
        )}
        <Pressable style={styles.artist} onPress={goToArtistPage}>
          <AnimatedText style={[fadeIn, styles.titleText]} weight='demiBold'>
            {artistName}
          </AnimatedText>
          <UserBadges
            user={userId as any}
            badgeSize={12}
            style={styles.iconVerified}
          />
          {!isLoaded && (
            <Skeleton style={styles.skeleton} width='60%' height='80%' />
          )}
        </Pressable>
      </View>
      {coSign && <Text style={styles.coSignLabel}>{messages.coSign}</Text>}
    </View>
  )
}

export default TrackTileMetadata
