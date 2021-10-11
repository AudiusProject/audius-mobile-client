import React from 'react'

import { useSelector } from 'react-redux'
import { Image, StyleSheet, Text, View } from 'react-native'

import IconUpload from '../../assets/images/iconGradientUpload.svg'
import HeavyCheckMark from '../../assets/images/emojis/white-heavy-check-mark.png'
import { getIsOpen } from 'audius-client/src/common/store/ui/mobile-upload-drawer/selectors'
import {
  show,
  hide
} from 'audius-client/src/common/store/ui/mobile-upload-drawer/slice'

import Drawer from '../drawer'
import { getIsKeyboardOpen } from '../../store/keyboard/selectors'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'
import { useDispatchWeb } from '../../hooks/useDispatchWeb'

const styles = StyleSheet.create({
  drawer: {
    height: 460,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 40
  },

  iconUpload: {
    width: 66,
    height: 66
  },

  cta: {
    //   fontWeight: var(--font-heavy),
    // fontSize: 28,
    lineHeight: 34
    // textAlign: 'center'
    //   backgroundImage: var(--page-header-gradient),
  },

  visit: {
    //   fontWeight: var(--font-medium),
    //   font-size: var(--font-2xl),
    lineHeight: 29,
    textAlign: 'center',
    marginTop: 4
  },

  bottom: {
    marginBottom: 16
  },

  action: {
    //   font-weight: var(--font-bold),
    //   font-size: var(--font-2xl),
    lineHeight: 40
  },

  actionIcon: {
    marginRight: 16
  },

  iconCheck: {
    height: 24,
    width: 24
  }
})

const messages = {
  start: 'Start Uploading',
  visit: 'Visit audius.co from a desktop browser',
  unlimited: 'Unlimited Uploads',
  exclusive: 'Exclusive Content',
  clear: 'Crystal Clear 320kbps'
}

const MobileUploadDrawer = ({ onClose }: { onClose: () => void }) => {
  const isOpen = useSelectorWeb(getIsOpen)
  const dispatchWeb = useDispatchWeb()
  const open = () => dispatchWeb(show())
  const close = () => dispatchWeb(hide())

  const keyboardVisible = false //useSelector(getIsKeyboardOpen)

  const CheckMark = () => (
    <Image style={styles.iconCheck} source={HeavyCheckMark} />
  )

  return (
    <Drawer isOpen={isOpen} onOpen={open} onClose={close}>
      <View style={styles.drawer}>
        <View>
          <View style={styles.cta}>
            <IconUpload />
            <Text>{messages.start}</Text>
          </View>
          <Text style={styles.visit}>{messages.visit}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.action}>
            <CheckMark />
            <Text>{messages.unlimited}</Text>
          </View>
          <View style={styles.action}>
            <CheckMark />
            <Text>{messages.clear}</Text>
          </View>
          <View style={styles.action}>
            <CheckMark />
            <Text>{messages.exclusive}</Text>
          </View>
        </View>
      </View>
    </Drawer>
  )
}

export default MobileUploadDrawer
