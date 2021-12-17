import React, { useCallback } from 'react'

import {
  getModalVisibility,
  setVisibility
} from 'audius-client/src/common/store/ui/modals/slice'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'

import AudiusAPI from 'app/assets/images/audiusAPI.png'
import ButtonWithArrow from 'app/components/button-with-arrow'
import Drawer from 'app/components/drawer'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import { ThemeColors } from 'app/utils/theme'

const messages = {
  modalTitle: 'Audius API',
  title: "It's easy to build your own app on Audius",
  description: 'The top 10 Audius API apps each month win',
  button: 'Learn More About The Audius API'
}

const API_LINK = 'https://audius.org/api'
const MODAL_NAME = 'APIRewardsExplainer'

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    title: {},
    subtitle: {},
    button: {}
  })

const ApiRewardsDrawer = () => {
  const dispatchWeb = useDispatchWeb()
  const styles = useThemedStyles(createStyles)

  const isOpen = useSelectorWeb(state => getModalVisibility(state, MODAL_NAME))

  const handleClose = useCallback(() => {
    dispatchWeb(setVisibility({ modal: MODAL_NAME, visible: false }))
  }, [dispatchWeb])

  const onClickAudiusAPI = useCallback(() => {
    Linking.openURL(API_LINK)
  }, [])

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title={messages.modalTitle}>
      <View>
        <Image source={AudiusAPI} />
        <Text style={styles.title}>{messages.title}</Text>
        <Text style={styles.subtitle}>{messages.description}</Text>
        <ButtonWithArrow
          text={messages.button}
          style={styles.button}
          onPress={onClickAudiusAPI}
        />
      </View>
    </Drawer>
  )
}

export default ApiRewardsDrawer
