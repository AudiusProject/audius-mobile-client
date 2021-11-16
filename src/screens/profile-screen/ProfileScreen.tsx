import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

import { StackParamList } from 'app/components/app-navigator/types'

// We might need to allow StackParamList to be generic here
// but keeping
type Props = NativeStackScreenProps<StackParamList, 'track'>

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Example profile screen</Text>
    </View>
  )
}

export default ProfileScreen
