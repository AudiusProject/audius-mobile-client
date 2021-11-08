import {
  OverflowAction,
  OverflowActionCallbacks
} from 'audius-client/src/common/store/ui/mobile-overflow-menu/types'
import React from 'react'
import { TouchableHighlight, View } from 'react-native'

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
    callbacks?.[action]?.()
    onClose()
  }

  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <View>
        {title && <Text>{title}</Text>}
        {rows.map(({ text, isDestructive = false }, index) => (
          <TouchableHighlight
            key={`${text}-${index}`}
            onPress={() => {
              didSelectRow(index)
            }}
          >
            <Text>{text}</Text>
          </TouchableHighlight>
        ))}
      </View>
    </Drawer>
  )
}

export default ActionDrawer
