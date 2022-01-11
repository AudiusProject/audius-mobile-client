import React, { useCallback, useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { User } from 'audius-client/src/common/models/User'
import { Text, View } from 'react-native'

import { BaseStackParamList } from 'app/components/app-navigator/types'
import Button from 'app/components/button'
import TrackTile from 'app/components/track-tile'
import { TrackTileSize } from 'app/components/track-tile/types'

// We might need to allow BaseStackParamList to be generic here
// to get all the relevant params
type Props = NativeStackScreenProps<BaseStackParamList, 'track'>

const user: User = {
  album_count: 8,
  associated_wallets_balance: '0' as any,
  balance: '968000000000000000000' as any,
  bio: "Yes, I'm the best hahah asdfasdf",
  cover_photo: null,
  cover_photo_sizes: 'QmNayVd5SnJjBjSxGLGaHUmRn9kUYXxJbHchkqtEy5hSZn',
  created_at: '2020-04-24T14:10:40 Z',
  creator_node_endpoint:
    'https://creatornode9.staging.audius.co,https://creatornode7.staging.audius.co,https://creatornode11.staging.audius.co',
  current_user_followee_follow_count: 1,
  does_current_user_follow: false,
  followee_count: 24,
  follower_count: 65,
  handle: 'wateriswet',
  handle_lc: 'wateriswet',
  has_collectibles: false,
  is_creator: true,
  is_deactivated: false,
  is_verified: true,
  location: 'Longmeadow, MA',
  metadata_multihash: 'QmYE89vxCyoHsyBgVThceXKv9BJNg3fx8kMMuBtrRjBMET',
  name: 'Water is Wet',
  playlist_count: 6,
  playlist_library: {
    contents: [
      {
        playlist_id: 10,
        type: 'playlist'
      },
      {
        playlist_id: 35,
        type: 'playlist'
      },
      {
        playlist_id: 37,
        type: 'playlist'
      },
      {
        playlist_id: 130,
        type: 'playlist'
      },
      {
        playlist_id: 206,
        type: 'playlist'
      },
      {
        playlist_id: 230,
        type: 'playlist'
      },
      {
        playlist_id: 231,
        type: 'playlist'
      },
      {
        playlist_id: 300,
        type: 'playlist'
      },
      {
        playlist_id: 301,
        type: 'playlist'
      },
      {
        playlist_id: 590,
        type: 'playlist'
      },
      {
        playlist_id: 618,
        type: 'playlist'
      },
      {
        playlist_id: 661,
        type: 'playlist'
      },
      {
        playlist_id: 974,
        type: 'playlist'
      },
      {
        playlist_id: 975,
        type: 'playlist'
      },
      {
        playlist_id: 976,
        type: 'playlist'
      }
    ]
  },
  profile_picture: null,
  profile_picture_sizes: 'QmWBZ8FM8SYXfjzR6cHixfdCqkG2VgcZbgthyKNiZDtg32',
  repost_count: 62,
  track_count: 84,
  updated_at: '2022-01-07T16:12:45 Z',
  user_id: 2,
  wallet: '0x78b2443d008656ce227cb47a29f0da28ae5f2c33',
  _profile_picture_sizes: {},
  _cover_photo_sizes: {}
}

// Props for testing the track tile component,
// can be removed
const testTrackTileProps = {
  uid: 'kind:TRACKS-id:4343-source:DISCOVER_FEED-count:24',
  coSign: {
    user,
    has_remix_author_reposted: true,
    has_remix_author_saved: true
  },
  id: 4343,
  user,
  index: 1,
  showSkeleton: true,
  onLoad: () => console.log('loaded'),
  ordered: true,
  title: 'joeys song that has a really long name for some reason',
  repostCount: 2,
  saveCount: 3,
  followeeReposts: [],
  followeeSaves: [],
  hasCurrentUserReposted: false,
  hasCurrentUserSaved: false,
  duration: 3.537333,
  coverArtSizes: {
    '150x150':
      'https://creatornode9.staging.audius.co/ipfs/Qme28HimHoUEbdYypMb5onjmpw4L4ozegUsh1zkRWF5nZ1/150x150.jpg'
  },
  activityTimestamp: '2020-11-02T21:03:00 Z',
  size: TrackTileSize.LARGE,
  listenCount: 23,
  fieldVisibility: {
    genre: true,
    mood: true,
    play_count: true,
    remixes: true,
    share: true,
    tags: true
  },
  showArtistPick: true,
  isArtistPick: true,
  artistHandle: 'wateriswet',
  artistName: 'Water is Wet',
  artistIsVerified: false,
  togglePlay: () => console.log('toggle play'),
  isActive: true,
  isLoading: true,
  isPlaying: true,
  goToArtistPage: () => {},
  goToTrackPage: () => {},
  toggleSave: () => {},
  onShare: () => {},
  onClickOverflow: () => {},
  toggleRepost: () => {},
  makeGoToRepostsPage: () => () => {},
  makeGoToFavoritesPage: () => () => {},
  goToRoute: () => {},
  isOwner: false,
  darkMode: false,
  isMatrix: false,
  isTrending: true,
  isUnlisted: false,
  showRankIcon: false
}

const TrackScreen = ({ navigation }: Props) => {
  const [showSkeleton, setShowSkeleton] = useState(true)
  const handlePress = useCallback(() => {
    setShowSkeleton(!showSkeleton)
    // navigation.navigate('profile', { id: 1 })
  }, [showSkeleton])

  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>Example track screen</Text>
      <Button title='Go to profile screen' onPress={handlePress} />
      <View style={{ padding: 8 }}>
        <TrackTile {...testTrackTileProps} showSkeleton={showSkeleton} />
        <TrackTile
          {...testTrackTileProps}
          showSkeleton={showSkeleton}
          isArtistPick={false}
          isUnlisted
          isPlaying={false}
          isTrending={false}
          title='Another'
          coSign={undefined}
        />
        <TrackTile
          {...testTrackTileProps}
          showSkeleton={showSkeleton}
          isArtistPick={false}
          isPlaying={false}
          isTrending={false}
          title='Third'
          coSign={undefined}
        />
      </View>
    </View>
  )
}

export default TrackScreen
