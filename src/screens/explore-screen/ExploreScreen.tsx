import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dimensions, Text, View } from 'react-native'

import IconForYou from 'app/assets/images/iconExploreForYou.svg'
import IconMoods from 'app/assets/images/iconExploreMoods.svg'
import IconNote from 'app/assets/images/iconNote.svg'
import IconUser from 'app/assets/images/iconUser.svg'
import TopTabNavigator from 'app/components/app-navigator/TopTabNavigator'
import { BaseStackParamList } from 'app/components/app-navigator/types'

// We might need to allow BaseStackParamList to be generic here
// to get all the relevant params
type Props = NativeStackScreenProps<BaseStackParamList, 'track'>

const screenHeight = Dimensions.get('window').height

const ForYouTab = () => {
  return <Text>For You Tab</Text>
}
const MoodsTab = () => {
  return <Text>Moods Tab</Text>
}
const PlaylistsTab = () => {
  return <Text>Playlists Tab</Text>
}
const ArtistsTab = () => {
  return <Text>Artists Tab</Text>
}

const ExploreScreen = ({ navigation }: Props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: screenHeight
      }}
    >
      <Text style={{ flex: 1 }}>Example explore screen</Text>
      <View style={{ flex: 10 }}>
        <TopTabNavigator
          initialScreen='tracks'
          screens={[
            {
              name: 'forYou',
              label: 'For You',
              icon: IconForYou,
              component: ForYouTab
            },
            {
              name: 'moods',
              icon: IconMoods,
              component: MoodsTab
            },
            {
              name: 'playlists',
              icon: IconNote,
              // TODO: Check to see if this should be playlist icon for consistency
              // icon: IconPlaylists,
              component: PlaylistsTab
            },
            {
              name: 'artists',
              icon: IconUser,
              component: ArtistsTab
            }
          ]}
        />
      </View>
    </View>
  )
}

export default ExploreScreen
