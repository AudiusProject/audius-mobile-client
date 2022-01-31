import React, { ReactNode } from 'react'

import IconPause from 'app/assets/images/iconPause.svg'
import IconPlay from 'app/assets/images/iconPlay.svg'
// import DownloadButtons from 'app/components/download-buttons'
import { useTrackCoverArt } from 'audius-client/src/common/hooks/useImageSize'
import { Name, PlaybackSource } from 'audius-client/src/common/models/Analytics'
import { ID, UID } from 'audius-client/src/common/models/Identifiers'
import { SquareSizes } from 'audius-client/src/common/models/ImageSizes'
import { Track } from 'audius-client/src/common/models/Track'
import { User } from 'audius-client/src/common/models/User'
import { squashNewLines } from 'audius-client/src/common/utils/formatUtil'
import { getCannonicalName } from 'audius-client/src/common/utils/genres'
import {
  formatSeconds,
  formatDate
} from 'audius-client/src/common/utils/timeUtil'
import { Nullable } from 'audius-client/src/common/utils/typeUtils'
import { tracksActions } from 'common/store/pages/track/lineup/actions'
import {
  ImageStyle,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import HyperLink from 'react-native-hyperlink'
import { useSelector } from 'react-redux'

import Button from 'app/components/button'
import CoSign from 'app/components/co-sign/CoSign'
import { Size } from 'app/components/co-sign/types'
import DynamicImage from 'app/components/dynamic-image'
import Text from 'app/components/text'
import UserBadges from 'app/components/user-badges'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { getPlaying, getPlayingUid, getTrack } from 'app/store/audio/selectors'
import { flexRowCentered } from 'app/styles'
import { make, track } from 'app/utils/analytics'
import { moodMap } from 'app/utils/moods'

// import HiddenTrackHeader from '../HiddenTrackHeader'

import { ThemeColors } from 'app/utils/theme'

import { TrackScreenActionButtons } from './TrackScreenActionButtons'
import { TrackScreenStats } from './TrackScreenStats'

const messages = {
  track: 'TRACK',
  remix: 'REMIX',
  play: 'PLAY',
  pause: 'PAUSE'
}

type TrackHeaderProps = {
  currentUserId: Nullable<ID>
  track: Track
  uid: UID
  user: User
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    root: {
      paddingTop: 16,
      paddingHorizontal: 24,
      width: '100%',
      alignItems: 'center',
      background: themeColors.white,
      borderWidth: 1,
      borderColor: themeColors.neutralLight8,
      borderRadius: 6,
      overflow: 'hidden'
      // TODO: shadow
    },

    hiddenTrackHeaderWrapper: {
      marginBottom: 12
    },

    typeLabel: {
      marginBottom: 15,
      height: 18,
      color: themeColors.neutralLight4,
      fontSize: 12,
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    coverArt: {
      height: 195,
      width: 195,
      marginBottom: 23
    },

    title: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 8
    },

    artist: {
      color: themeColors.secondary,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
      ...flexRowCentered()
    },

    verified: {
      marginLeft: 8
    },

    description: {
      fontSize: 14,
      textAlign: 'left',
      whiteSpace: 'pre-line',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '100%',
      marginBottom: 24
    },

    buttonSection: {
      width: '100%',
      marginBottom: 12
    },

    playAllButton: {
      width: '100%',
      ...flexRowCentered(),
      height: 40
    },
    tags: {
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight7,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      paddingVertical: 16
    },

    tag: {
      margin: 4,
      borderRadius: 2,
      backgroundColor: themeColors.neutralLight4,
      paddingVertical: 4,
      paddingHorizontal: 8,
      color: themeColors.white,
      fontSize: 10,
      textTransform: 'uppercase'
    },

    infoSection: {
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight7,
      flexWrap: 'wrap',
      width: '100%',
      paddingTop: 24,
      paddingBottom: 8
    },

    noStats: {
      borderWidth: 0
    },

    infoFact: {
      flex: 1,
      textAlign: 'left',
      marginBottom: 16,
      width: '50%'
    },

    infoLabel: {
      color: themeColors.neutralLight5,
      fontSize: 12,
      textTransform: 'uppercase',
      marginRight: 8,
      ...flexRowCentered()
    },

    infoValue: {
      color: themeColors.neutral,
      fontSize: 12,
      ...flexRowCentered()
    },

    imageWrapper: {
      borderWidth: 1,
      borderColor: themeColors.neutralLight8,
      borderRadius: 4,
      overflow: 'hidden'
    }
  })

export const TrackScreenHeader = ({
  currentUserId,
  track: {
    _co_sign,
    _cover_art_sizes,
    created_at,
    credits_splits,
    description,
    duration,
    field_visibility,
    genre,
    has_current_user_reposted,
    has_current_user_saved,
    is_unlisted,
    mood,
    owner_id,
    play_count,
    release_date,
    remix_of,
    repost_count,
    save_count,
    tags,
    title,
    track_id
  },
  uid,
  user
}: TrackHeaderProps) => {
  const dispatchWeb = useDispatchWeb()
  const styles = useThemedStyles(createStyles)
  const image = useTrackCoverArt(
    track_id,
    _cover_art_sizes,
    SquareSizes.SIZE_480_BY_480
  )

  const isPlaying = useSelector(getPlaying)
  const playingUid = useSelector(getPlayingUid)
  const queueTrack = useSelector(getTrack)

  const remixParentTrackId = remix_of?.tracks?.[0]?.parent_track_id
  const isRemix = !!remixParentTrackId

  const isOwner = owner_id === currentUserId

  const onPlay = () => {
    const trackPlay = () =>
      track(
        make({
          eventName: Name.PLAYBACK_PLAY,
          id: String(track_id),
          source: PlaybackSource.TRACK_PAGE
        })
      )

    if (isPlaying) {
      dispatchWeb(tracksActions.pause())
      track(
        make({
          eventName: Name.PLAYBACK_PAUSE,
          id: String(track_id),
          source: PlaybackSource.TRACK_PAGE
        })
      )
    } else if (
      playingUid !== uid &&
      queueTrack &&
      queueTrack?.trackId === track_id
    ) {
      dispatchWeb(tracksActions.play())
      trackPlay()
    } else {
      dispatchWeb(tracksActions.play(uid))
      trackPlay()
    }
  }

  const onPressArtistName = () => {
    // TODO: navigate to profile screen
    // goToProfilePage(user ? user.handle : '')
  }

  const onPressTag = (tag: string) => {
    // TODO: navigate to search screen
    // goToSearchResultsPage(`#${tag}`)
  }

  const onExternalLinkClick = event => {
    track(
      make({
        eventName: Name.LINK_CLICKING,
        url: event.target.href,
        source: 'track page' as const
      })
    )
  }

  const filteredTags = (tags || '').split(',').filter(Boolean)

  const trackLabels: { value: ReactNode; label: string }[] = [
    { value: formatSeconds(duration), label: 'Duration' },
    { value: getCannonicalName(genre), label: 'Genre' },
    { value: formatDate(release_date || created_at), label: 'Released' },
    {
      value: mood && mood in moodMap ? moodMap[mood] : mood,
      label: 'Mood'
    },
    { value: credits_splits, label: 'Credit' }
  ].filter(info => !!info.value)

  const renderTags = () => {
    if (is_unlisted && !field_visibility?.tags) return null
    return (
      <>
        {filteredTags.length > 0 ? (
          <View style={styles.tags}>
            {filteredTags.map(tag => (
              <Pressable key={tag} onPress={() => onPressTag(tag)}>
                <Text style={styles.tag}>{tag}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </>
    )
  }

  const renderDownloadButtons = () => {
    // return (
    //   <DownloadButtons
    //     style={styles.downloadButtonsContainer}
    //     trackId={trackId}
    //     isOwner={isOwner}
    //     following={isFollowing}
    //     onDownload={onDownload}
    //   />
    // )
    // TODO
    return null
  }

  const renderTrackLabels = () => {
    return trackLabels.map(infoFact => {
      if (infoFact.label === 'Genre' && is_unlisted && !field_visibility?.genre)
        return null
      if (infoFact.label === 'Released' && is_unlisted) return null
      if (infoFact.label === 'Mood' && is_unlisted && !field_visibility?.mood)
        return null
      return (
        <View key={infoFact.label} style={styles.infoFact}>
          <Text style={styles.infoLabel}>{infoFact.label}</Text>
          <Text style={styles.infoValue}>{infoFact.value}</Text>
        </View>
      )
    })
  }

  const imageElement = _co_sign ? (
    <CoSign
      size={Size.LARGE}
      // hasFavorited={coSign.has_remix_author_saved}
      // hasReposted={coSign.has_remix_author_reposted}
      // coSignName={coSign.user.name}
      style={styles.coverArt}
      // userId={coSign.user.user_id}
    >
      <DynamicImage image={image} style={styles.imageWrapper as ImageStyle} />
    </CoSign>
  ) : (
    <DynamicImage
      image={image}
      style={[styles.coverArt, styles.imageWrapper] as ImageStyle[]}
    />
  )

  return (
    <View style={styles.root}>
      {is_unlisted ? (
        <View style={styles.hiddenTrackHeaderWrapper}>
          {/* <HiddenTrackHeader /> */}
        </View>
      ) : (
        <View style={styles.typeLabel}>
          {isRemix ? messages.remix : messages.track}
        </View>
      )}
      {imageElement}
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight style={styles.artist} onPress={onPressArtistName}>
        <Text>{user.name}</Text>
        <UserBadges style={styles.verified} badgeSize={16} user={user} />
      </TouchableHighlight>
      <View style={styles.buttonSection}>
        <Button
          style={styles.playAllButton}
          title={messages.pause}
          renderIcon={() => (isPlaying ? <IconPause /> : <IconPlay />)}
          onPress={onPlay}
        />
        <TrackScreenActionButtons
          hasReposted={has_current_user_reposted}
          hasSaved={has_current_user_saved}
          isFollowing={user.does_current_user_follow}
          isOwner={isOwner}
          isUnlisted={is_unlisted}
          showFavorite={!is_unlisted}
          showOverflow
          showRepost={!is_unlisted}
          showShare={!is_unlisted || !!field_visibility?.share}
          trackId={track_id}
        />
      </View>
      <TrackScreenStats
        favoriteCount={save_count}
        playCount={play_count}
        repostCount={repost_count}
        showFavoriteCount={!is_unlisted}
        showListenCount={!is_unlisted || !field_visibility?.play_count}
        showRepostCount={!is_unlisted}
        trackId={track_id}
      />
      {description ? (
        // https://github.com/Soapbox/linkifyjs/issues/292
        // @ts-ignore
        <HyperLink options={{ attributes: { onPress: onExternalLinkClick } }}>
          <Text style={styles.description}>{squashNewLines(description)}</Text>
        </HyperLink>
      ) : null}
      <View
        style={[
          styles.infoSection,
          is_unlisted && !field_visibility?.play_count && styles.noStats
        ]}
      >
        {renderTrackLabels()}
      </View>
      {renderDownloadButtons()}
      {renderTags()}
    </View>
  )
}
