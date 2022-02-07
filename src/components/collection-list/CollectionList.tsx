import { UserCollection } from 'audius-client/src/common/models/Collection'
import { Text } from 'react-native'

import { CardList, CardListProps } from 'app/components/core'
import { CollectionCard } from 'app/screens/explore-screen/components/CollectionCard'

import { EmptyTab } from '../../screens/profile-screen/EmptyTab'

type ListProps = Omit<
  CardListProps<UserCollection>,
  'data' | 'renderItem' | 'ListEmptyComponent'
>

type CollectionListProps = {
  collection: UserCollection[]
  emptyTabText?: string
} & ListProps

export const CollectionList = (props: CollectionListProps) => {
  const { collection, emptyTabText, ...other } = props
  return (
    <CardList
      data={collection}
      renderItem={({ item, style }) => (
        <CollectionCard collection={item} style={style} />
      )}
      ListEmptyComponent={
        emptyTabText ? (
          <EmptyTab>
            <Text>{emptyTabText}</Text>
          </EmptyTab>
        ) : null
      }
      {...other}
    />
  )
}
