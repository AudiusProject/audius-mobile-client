import React from 'react'

import { StyleSheet } from 'react-native'

import IconArrow from 'app/assets/images/iconArrow.svg'
import Button, { ButtonProps, ButtonType } from 'app/components/button'
import { useThemeColors } from 'app/utils/theme'

const styles = StyleSheet.create({
  button: { padding: 12 }
})

const ButtonWithArrow = (props: ButtonProps) => {
  const { style } = props
  const { white } = useThemeColors()
  return (
    <>
      <Button
        style={[styles.button, style]}
        type={ButtonType.PRIMARY}
        icon={<IconArrow fill={white} />}
        {...props}
      />
    </>
  )
}

export default ButtonWithArrow
