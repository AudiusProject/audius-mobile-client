import { Collection } from 'audius-client/src/common/models/Collection'
import { ProfileUser } from 'audius-client/src/common/store/pages/profile/types'
import { FlatList, Text } from 'react-native'

import { CollectionCard } from '../explore-screen/components/CollectionCard'

import { EmptyTab } from './EmptyTab'

type CollectionListProps = {
  collection: Collection[]
  profile: ProfileUser
  emptyTabText: string
}

export const CollectionList = ({
  collection,
  profile,
  emptyTabText
}: CollectionListProps) => {
  return (
    <FlatList
      data={collection}
      renderItem={({ item, index }) => {
        const isInLeftColumn = !(index % 2)
        const isHangingLastItem =
          index === collection.length - 1 && isInLeftColumn

        const cardStyles = {
          margin: 8,
          [`margin${isInLeftColumn ? 'Left' : 'Right'}`]: 16,
          maxWidth: isHangingLastItem ? '44%' : '50%'
        }

        return (
          <CollectionCard
            collection={{ ...item, user: profile }}
            style={cardStyles}
          />
        )
      }}
      ListEmptyComponent={
        <EmptyTab>
          <Text>{emptyTabText}</Text>
        </EmptyTab>
      }
      numColumns={2}
    />
  )
}
