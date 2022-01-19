import React, { useState } from 'react'

import { User } from 'audius-client/src/common/models/User'
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import Config from 'react-native-config'

import { Notification } from 'app/store/notifications/types'
import { getUserRoute } from 'app/utils/routes'
import { useTheme } from 'app/utils/theme'

import { getUserListRoute } from '../routeUtil'

const USER_METADATA_NODE = Config.USER_METADATA_NODE

const styles = StyleSheet.create({
  touchable: {
    alignSelf: 'flex-start'
  },
  container: {
    marginBottom: 8,
    flexDirection: 'row'
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 4
  }
})

type UserImagesProps = {
  notification: Notification
  users: User[]
  onGoToRoute: (route: string) => void
}

const getImageURI = (user: any) => {
  let node: string
  if (user.creator_node_endpoint) {
    node = user.creator_node_endpoint.split(',')[0]
  } else {
    node = USER_METADATA_NODE
  }
  if (user.profile_picture) {
    return `${node}/ipfs/${user.profile_picture}`
  }
  if (user.profile_picture_sizes) {
    return `${node}/ipfs/${user.profile_picture_sizes}/150x150.jpg`
  }
  return null
}

const UserImage = ({ source }: { source: ImageSourcePropType }) => {
  const imageStyle = useTheme(styles.image, {
    backgroundColor: 'neutralLight4'
  })
  const [didError, setDidError] = useState(false)
  return (
    <Image
      style={imageStyle}
      source={
        didError
          ? require('app/assets/images/imageProfilePicEmpty2X.png')
          : source
      }
      // TODO: Gracefully handle error and select secondary node
      onError={() => setDidError(true)}
    />
  )
}

const UserImages = ({ notification, users, onGoToRoute }: UserImagesProps) => {
  const isMultiUser = users.length > 1

  const renderUsers = () => (
    <View style={styles.container}>
      {users.map(user => {
        const onPress = () => {
          const route = getUserRoute(user)
          if (route) {
            onGoToRoute(route)
          }
        }

        const uri = getImageURI(user)
        let source: ImageSourcePropType
        if (uri) {
          source = { uri }
        } else {
          source = require('app/assets/images/imageProfilePicEmpty2X.png')
        }
        const image = <UserImage source={source} key={user.user_id} />
        return isMultiUser ? (
          image
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            key={user.user_id}
          >
            {image}
          </TouchableOpacity>
        )
      })}
    </View>
  )

  return isMultiUser ? (
    <TouchableOpacity
      style={styles.touchable}
      activeOpacity={0.7}
      onPress={() => onGoToRoute(getUserListRoute(notification))}
    >
      {renderUsers()}
    </TouchableOpacity>
  ) : (
    renderUsers()
  )
}

export default UserImages
