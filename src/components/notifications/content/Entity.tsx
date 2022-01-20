import React, { useCallback, useEffect } from 'react'

import * as Sentry from '@sentry/react-native'
import { StyleSheet, Text } from 'react-native'

import { Entity as EntityType } from 'app/store/notifications/types'
import { useTheme } from 'app/utils/theme'

import { getEntityRoute } from '../routeUtil'

const getEntityName = (entity: any) => entity.title || entity.playlist_name

const styles = StyleSheet.create({
  text: {
    fontFamily: 'AvenirNextLTPro-Bold',
    fontSize: 16
  }
})

type EntityProps = {
  entity: any
  entityType: EntityType
  onGoToRoute: (route: string) => void
}

const Entity = ({ entity, entityType, onGoToRoute }: EntityProps) => {
  const onPress = useCallback(() => {
    onGoToRoute(getEntityRoute(entity, entityType))
  }, [entity, entityType, onGoToRoute])

  const textStyle = useTheme(styles.text, {
    color: 'secondary'
  })

  useEffect(() => {
    if (!entity) {
      Sentry.captureException(
        new Error(
          `Notification entity does not exist. Type: ${entityType} ID: ${entityId}`
        )
      )
    }
  }, [entity, entityId, entityType])

  return (
    <Text style={textStyle} onPress={onPress}>
      {getEntityName(entity)}
    </Text>
  )
}

export default Entity
