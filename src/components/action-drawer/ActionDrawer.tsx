import {
  OverflowAction,
  OverflowActionCallbacks
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import React from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import {
  Theme,
  ThemeColors,
  useThemeColors,
  useThemeVariant
} from '../../utils/theme'
import { useThemedStyles } from '../../hooks/useThemedStyles'

import Drawer from '../../components/drawer'
import Text from '../../components/text'

export type ActionDrawerRow = {
  text: string
  action: OverflowAction
  isDestructive?: boolean
}

type ActionSheetModalProps = {
  rows: ActionDrawerRow[]
  callbacks: OverflowActionCallbacks
  isOpen: boolean
  onClose: () => void
  title?: string
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingTop: 16,
      paddingBottom: 16
    },

    row: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.neutralLight8
    },

    firstRow: {
      borderTopWidth: 1,
      borderTopColor: themeColors.neutralLight8
    },

    title: {
      fontSize: 16
    },

    action: {
      fontSize: 21,
      paddingTop: 4,
      color: themeColors.actionSheetText
    },

    destructiveAction: {
      color: themeColors.accentRed
    }
  })

// `ActionDrawer` is a drawer that presents a list of clickable rows with text
const ActionDrawer = ({
  rows,
  callbacks,
  isOpen,
  onClose,
  title
}: ActionSheetModalProps) => {
  const didSelectRow = (index: number) => {
    const { action } = rows[index]
    onClose()
    callbacks?.[action]?.()
  }
  const styles = useThemedStyles(createStyles)

  const themeVariant = useThemeVariant()
  const isDarkMode = themeVariant === Theme.DARK
  const { neutralLight9, staticWhite } = useThemeColors()

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <View style={styles.container}>
        {title && <Text style={[styles.row, styles.title]}>{title}</Text>}
        {rows.map(({ text, isDestructive = false }, index) => (
          <TouchableHighlight
            key={`${text}-${index}`}
            onPress={() => {
              didSelectRow(index)
            }}
            underlayColor={neutralLight9}
          >
            <View style={[styles.row, index === 0 ? styles.firstRow : {}]}>
              <Text
                style={[
                  styles.action,
                  isDestructive ? styles.destructiveAction : {},
                  isDarkMode ? { color: staticWhite } : {}
                ]}
                weight='demiBold'
              >
                {text}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </Drawer>
  )
}

export default ActionDrawer
