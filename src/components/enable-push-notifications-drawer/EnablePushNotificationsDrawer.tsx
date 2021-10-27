import React, { useCallback } from 'react'

import { Button, StyleSheet, View } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as IconNotification } from 'assets/img/iconGradientNotification.svg'
import { getIsOpen } from 'common/store/ui/push-notifications-drawer/selectors'
import { hide } from 'common/store/ui/push-notifications-drawer/slice'
import Drawer from 'components/drawer/Drawer'
import { togglePushNotificationSetting } from 'containers/settings-page/store/actions'
import { PushNotificationSetting } from 'containers/settings-page/store/types'

import { useDrawer } from '../../hooks/useDrawer'
import { ThemeColors } from '../../hooks/useThemedStyles'

const messages = {
  dontMiss: `Don't Miss a Beat!`,
  turnOn: 'Turn on Notifications',
  favorites: 'Favorites',
  reposts: 'Reposts',
  followers: 'Followers',
  coSigns: 'Co-Signs',
  remixes: 'Remixes',
  newReleases: 'New Releases'
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    drawer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },

    cta: {
      marginTop: 16,
      fontFamily: 'AvenirNextLTPro-Heavy',
      fontSize: 32,
      lineHeight: 34,
      textAlign: 'center'
    },

    turnOn: {
      fontSize: 24,
      lineHeight: 29,
      textAlign: 'center',
      marginTop: 4
    },

    bottom: {
      marginBottom: 16
    },

    actions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    action: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontFamily: 'AvenirNextLTPro-Bold',
      fontSize: 32,
      color: themeColors.neutrailLight2
    },

    actionIcon: {
      marginRight: 16
    }
  })

const EnablePushNotificationsDrawer = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useDrawer('EnablePushNotifications')

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [dispatch])

  const enablePushNotifications = useCallback(() => {
    dispatch(
      togglePushNotificationSetting(PushNotificationSetting.MobilePush, true)
    )
    onClose()
  }, [dispatch, onClose])

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <View style={styles.drawer}>
        <View style={styles.top}>
          <View style={styles.cta}>
            <IconNotification style={styles.iconNotification} />
            <View>{messages.dontMiss}</View>
          </View>
          <View style={styles.turnOn}>{messages.turnOn}</View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.actions}>
            <View style={styles.action}>
              <IconHeart />
              {messages.favorites}
            </View>
            <View style={styles.action}>
              <IconRepost />
              {messages.reposts}
            </View>
            <View style={styles.action}>
              <IconFollow />
              {messages.followers}
            </View>
            <View style={styles.action}>
              <IconCoSign style={styles.coSign} />
              {messages.coSigns}
            </View>
            <View style={styles.action}>
              <IconRemix />
              {messages.remixes}
            </View>
            <View style={styles.action}>
              <IconExploreNewReleases />
              {messages.newReleases}
            </View>
          </View>
        </View>
        <Button
          title='Enable Notifications'
          onPress={enablePushNotifications}
        />
      </View>
    </Drawer>
  )
}

export default EnablePushNotificationsDrawer
