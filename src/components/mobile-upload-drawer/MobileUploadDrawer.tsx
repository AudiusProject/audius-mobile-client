import React from 'react'

import { useSelector } from 'react-redux'
import { Image, MaskedViewIOS, StyleSheet, Text, View } from 'react-native'

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
import { FONT_SIZE, FONT_WEIGHT } from '../../utils/typography'
import { useColor, useTheme } from '../../utils/theme'
import LinearGradient from 'react-native-linear-gradient'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'

const styles = StyleSheet.create({
  drawer: {
    height: 460,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 40
  },

  iconUpload: {
    width: 66,
    height: 66,
    marginBottom: 16
  },

  cta: {
    fontWeight: FONT_WEIGHT.heavy,
    fontSize: FONT_SIZE['3xl'],
    lineHeight: 34,
    textAlign: 'center'
  },

  visit: {
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE['2xl'],
    lineHeight: 29,
    textAlign: 'center',
    marginTop: 4
  },

  top: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  bottom: {
    marginBottom: 16
  },

  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  actionLabel: {
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE['2xl'],
    lineHeight: 40
  },

  iconCheck: {
    marginRight: 16,
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

const MobileUploadDrawer = () => {
  const isOpen = useSelectorWeb(getIsOpen)
  const dispatchWeb = useDispatchWeb()
  const open = () => dispatchWeb(show())
  const close = () => dispatchWeb(hide())

  const bodyTextColorStyle = useTheme(
    {},
    {
      color: 'neutral'
    }
  )

  const gradientColor1 = useColor('pageHeaderGradientColor1')
  const gradientColor2 = useColor('pageHeaderGradientColor2')
  console.log(gradientColor1)

  const keyboardVisible = false //useSelector(getIsKeyboardOpen)

  const CheckMark = () => (
    <Image style={styles.iconCheck} source={HeavyCheckMark} />
  )

  return (
    <Drawer isOpen={isOpen} onOpen={open} onClose={close}>
      <View style={styles.drawer}>
        <View style={styles.top}>
          <IconUpload
            height={66}
            width={66}
            fill={gradientColor2}
            fillSecondary={gradientColor1}
          />

          <MaskedViewIOS
            maskElement={<Text style={styles.cta}>{messages.start}</Text>}
          >
            <LinearGradient
              colors={[gradientColor1, gradientColor2]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
            >
              <Text style={[styles.cta, { opacity: 0 }]}>{messages.start}</Text>
            </LinearGradient>
          </MaskedViewIOS>
          <View>
            <Text style={[styles.visit, bodyTextColorStyle]}>
              {messages.visit}
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          {[messages.unlimited, messages.clear, messages.exclusive].map(m => (
            <View style={styles.action}>
              <CheckMark />
              <Text style={[styles.actionLabel, bodyTextColorStyle]}>{m}</Text>
            </View>
          ))}
        </View>
      </View>
    </Drawer>
  )
}

export default MobileUploadDrawer
