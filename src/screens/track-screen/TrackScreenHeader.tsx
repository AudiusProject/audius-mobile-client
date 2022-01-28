import React, { useCallback } from 'react'

import IconPause from 'app/assets/images/iconPause.svg'
import IconPlay from 'app/assets/images/iconPlay.svg'
// import DownloadButtons from 'app/components/download-buttons'
import { useTrackCoverArt } from 'audius-client/src/common/hooks/useImageSize'
import { Name } from 'audius-client/src/common/models/Analytics'
import { CID, ID } from 'audius-client/src/common/models/Identifiers'
import {
  SquareSizes,
  CoverArtSizes
} from 'audius-client/src/common/models/ImageSizes'
import { FieldVisibility, Remix } from 'audius-client/src/common/models/Track'
import { OverflowAction } from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import { squashNewLines } from 'audius-client/src/common/utils/formatUtil'
import { getCannonicalName } from 'audius-client/src/common/utils/genres'
import {
  formatSeconds,
  formatDate
} from 'audius-client/src/common/utils/timeUtil'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import HyperLink from 'react-native-hyperlink'

import Button from 'app/components/button'
import CoSign from 'app/components/co-sign/CoSign'
import { Size } from 'app/components/co-sign/types'
import DynamicImage from 'app/components/dynamic-image'
import Text from 'app/components/text'
import UserBadges from 'app/components/user-badges'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { make, track } from 'app/utils/analytics'
import { moodMap } from 'app/utils/moods'

// import HiddenTrackHeader from '../HiddenTrackHeader'

import { ThemeColors } from 'app/utils/theme'

import { TrackScreenActions } from './TrackScreenActions'
import { TrackScreenStats } from './TrackScreenStats'

const messages = {
  track: 'TRACK',
  remix: 'REMIX',
  play: 'PLAY',
  pause: 'PAUSE'
}

type TrackHeaderProps = {
  isLoading: boolean
  isPlaying: boolean
  isOwner: boolean
  isSaved: boolean
  isReposted: boolean
  isFollowing: boolean
  title: string
  trackId: ID
  userId: ID
  coverArtSizes: CoverArtSizes | null
  artistName: string
  artistVerified: boolean
  description: string
  released: string
  genre: string
  mood: string
  credits: string
  tags: string
  listenCount: number
  duration: number
  saveCount: number
  repostCount: number
  isUnlisted: boolean
  isRemix: boolean
  fieldVisibility: FieldVisibility
  coSign: Remix | null
  onPressTag: (tag: string) => void
  onPressArtistName: () => void
  onPressMobileOverflow: (
    trackId: ID,
    overflowActions: OverflowAction[]
  ) => void
  onPlay: () => void
  onShare: () => void
  onSave: () => void
  onRepost: () => void
  onDownload: (
    trackId: ID,
    cid: CID,
    category?: string,
    parentTrackId?: ID
  ) => void
  goToFavoritesPage: (trackId: ID) => void
  goToRepostsPage: (trackId: ID) => void
}

const createStyles = (themeColors: ThemeColors) => StyleSheet.create({})

export const TrackHeader = ({
  title,
  trackId,
  userId,
  coverArtSizes,
  artistName,
  artistVerified,
  description,
  isOwner,
  isFollowing,
  released,
  duration,
  isLoading,
  isPlaying,
  isSaved,
  isReposted,
  isUnlisted,
  isRemix,
  fieldVisibility,
  coSign,
  saveCount,
  repostCount,
  listenCount,
  mood,
  credits,
  genre,
  tags,
  onPressArtistName,
  onPressTag,
  onPlay,
  onShare,
  onSave,
  onRepost,
  onDownload,
  onPressMobileOverflow,
  goToFavoritesPage,
  goToRepostsPage
}: TrackHeaderProps) => {
  const styles = useThemedStyles(createStyles)
  const image = useTrackCoverArt(
    trackId,
    coverArtSizes,
    SquareSizes.SIZE_480_BY_480
  )
  const onSaveHeroTrack = () => {
    if (!isOwner) onSave()
  }
  const filteredTags = (tags || '').split(',').filter(Boolean)

  const trackLabels: { value: any; label: string }[] = [
    { value: formatSeconds(duration), label: 'Duration' },
    { value: getCannonicalName(genre), label: 'Genre' },
    { value: formatDate(released), label: 'Released' },
    {
      // @ts-ignore
      value: mood && mood in moodMap ? moodMap[mood] : mood,
      label: 'Mood'
    },
    { value: credits, label: 'Credit' }
  ].filter(info => !!info.value)

  const record = useRecord()
  const onExternalLinkClick = useCallback(
    event => {
      record(
        make(Name.LINK_CLICKING, {
          url: event.target.href,
          source: 'track page' as const
        })
      )
    },
    [record]
  )

  const onPressOverflow = () => {
    const overflowActions = [
      isOwner || isUnlisted
        ? null
        : isReposted
        ? OverflowAction.UNREPOST
        : OverflowAction.REPOST,
      isOwner || isUnlisted
        ? null
        : isSaved
        ? OverflowAction.UNFAVORITE
        : OverflowAction.FAVORITE,
      OverflowAction.ADD_TO_PLAYLIST,
      isFollowing
        ? OverflowAction.UNFOLLOW_ARTIST
        : OverflowAction.FOLLOW_ARTIST,
      OverflowAction.VIEW_ARTIST_PAGE
    ].filter(Boolean) as OverflowAction[]

    onPressMobileOverflow(trackId, overflowActions)
  }

  const renderTags = () => {
    if (isUnlisted && !fieldVisibility.tags) return null
    return (
      <>
        {filteredTags.length > 0 ? (
          <View style={styles.tags}>
            {filteredTags.map(tag => (
              <h2 key={tag} onPress={() => onPressTag(tag)} style={styles.tag}>
                {tag}
              </h2>
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
      if (infoFact.label === 'Genre' && isUnlisted && !fieldVisibility.genre)
        return null
      if (infoFact.label === 'Released' && isUnlisted) return null
      if (infoFact.label === 'Mood' && isUnlisted && !fieldVisibility.mood)
        return null
      return (
        <View key={infoFact.label} style={styles.infoFact}>
          <h2 style={styles.infoLabel}>{infoFact.label}</h2>
          <h2 style={styles.infoValue}>{infoFact.value}</h2>
        </View>
      )
    })
  }

  const onPressFavorites = useCallback(() => {
    goToFavoritesPage(trackId)
  }, [goToFavoritesPage, trackId])

  const onPressReposts = useCallback(() => {
    goToRepostsPage(trackId)
  }, [goToRepostsPage, trackId])

  const imageElement = coSign ? (
    <CoSign
      size={Size.LARGE}
      hasFavorited={coSign.has_remix_author_saved}
      hasReposted={coSign.has_remix_author_reposted}
      coSignName={coSign.user.name}
      style={styles.coverArt}
      userId={coSign.user.user_id}
    >
      <DynamicImage image={image} style={styles.imageWrapper} />
    </CoSign>
  ) : (
    <DynamicImage
      image={image}
      style={[styles.coverArt, styles.imageWrapper]}
    />
  )

  return (
    <View style={styles.trackHeader}>
      {isUnlisted ? (
        <View style={styles.hiddenTrackHeaderWrapper}>
          {/* <HiddenTrackHeader /> */}
        </View>
      ) : (
        <View style={styles.typeLabel}>
          {isRemix ? messages.remix : messages.track}
        </View>
      )}
      {imageElement}
      <h1 style={styles.title}>{title}</h1>
      <TouchableHighlight style={styles.artist} onPress={onPressArtistName}>
        <Text>{artistName}</Text>
        <UserBadges style={styles.verified} badgeSize={16} user={user} />
      </TouchableHighlight>
      <View style={styles.buttonSection}>
        <Button
          style={[styles.playAllButton, styles.buttonFormatting]}
          title={messages.pause}
          renderIcon={() => (props.playing ? <IconPause /> : <IconPlay />)}
          onPress={props.onPlay}
        />
        <TrackScreenActions
          showRepost={!isUnlisted}
          showFavorite={!isUnlisted}
          showShare={!isUnlisted || fieldVisibility.share}
          showOverflow
          shareToastDisabled
          isOwner={isOwner}
          isReposted={isReposted}
          isSaved={isSaved}
          onPressOverflow={onPressOverflow}
          onRepost={onRepost}
          onFavorite={onSaveHeroTrack}
          onShare={onShare}
        />
      </View>
      <TrackScreenStats
        showListenCount={!isUnlisted || fieldVisibility.play_count}
        showFavoriteCount={!isUnlisted}
        showRepostCount={!isUnlisted}
        listenCount={listenCount}
        favoriteCount={saveCount}
        repostCount={repostCount}
        onPressFavorites={onPressFavorites}
        onPressReposts={onPressReposts}
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
          {
            [styles.noStats]: isUnlisted && !fieldVisibility.play_count
          }
        ]}
      >
        {renderTrackLabels()}
      </View>
      {renderDownloadButtons()}
      {renderTags()}
    </View>
  )
}
