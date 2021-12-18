import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions, Text, View } from 'react-native'

import IconAlbum from 'app/assets/images/iconAlbum.svg'
import IconCollectibles from 'app/assets/images/iconCollectibles.svg'
import IconNote from 'app/assets/images/iconNote.svg'
import IconPlaylists from 'app/assets/images/iconPlaylists.svg'
import IconRepost from 'app/assets/images/iconRepost.svg'
import TopTabNavigator from 'app/components/app-navigator/TopTabNavigator'
import { BaseStackParamList } from 'app/components/app-navigator/types'

// We might need to allow BaseStackParamList to be generic here
// to get all the relevant params
type Props = NativeStackScreenProps<BaseStackParamList, 'track'>

const screenHeight = Dimensions.get('window').height

const TracksScreen = () => {
  return <Text>Tracks Screen</Text>
}
const RepostsScreen = () => {
  return <Text>Reposts Screen</Text>
}
const AlbumsScreen = () => {
  return <Text>Albums Screen</Text>
}
const PlaylistsScreen = () => {
  return <Text>Playlists Screen</Text>
}
const CollectiblesScreen = () => {
  return <Text>Collectibles Screen</Text>
}

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: screenHeight
      }}
    >
      <Text style={{ flex: 1 }}>Example profile screen</Text>
      <View style={{ flex: 10 }}>
        <TopTabNavigator
          initialScreen='tracks'
          screens={[
            {
              name: 'tracks',
              icon: IconNote,
              component: TracksScreen
            },
            {
              name: 'albums',
              icon: IconAlbum,
              component: AlbumsScreen
            },
            {
              name: 'playlists',
              icon: IconPlaylists,
              component: PlaylistsScreen
            },
            {
              name: 'reposts',
              icon: IconRepost,
              component: RepostsScreen
            },
            {
              name: 'collectibles',
              icon: IconCollectibles,
              component: CollectiblesScreen
            }
          ]}
        />
      </View>
    </View>
  )
}

export default ProfileScreen
