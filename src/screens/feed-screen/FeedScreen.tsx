import React, { useCallback, useEffect, useState } from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

import { FeedStackParamList } from 'app/components/app-navigator/types'
import Button from 'app/components/button'

import AudiusApi from 'app/assets/images/audiusAPI.png'
import AudiusLogo from 'app/assets/images/Horizontal-Logo-Full-Color.png'
import DynamicImage from 'app/components/dynamic-image'

type Props = NativeStackScreenProps<FeedStackParamList, 'feed'>

const FeedScreen = ({ navigation }: Props) => {
  const [toggle, setToggle] = useState(false)
  const [image, setImage] = useState(AudiusApi)

  const handlePress = useCallback(() => {
    // navigation.navigate('track', { id: 1 })
    setImage(toggle ? AudiusApi : undefined)
    setToggle(!toggle)
  }, [toggle])

  return (
    <View>
      <Text>Example feed screen</Text>
      <Button title='Go to track screen' onPress={handlePress} />
      <DynamicImage
        image={image}
        style={{ width: 100, height: 100 }}
        usePlaceholder
      />
    </View>
  )
}

export default FeedScreen
