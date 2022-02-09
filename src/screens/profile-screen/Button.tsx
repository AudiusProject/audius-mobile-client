import { ComponentType } from 'react'

import { merge } from 'lodash'
import { Pressable, Text, ButtonProps as RNButtonProps } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { makeStyles } from 'app/styles'

const useStyles = makeStyles(
  ({ typography, palette, spacing }, { variant }) => {
    const variantStyles = {
      primary: {
        root: {
          backgroundColor: palette.primary
        },
        text: {
          color: palette.white
        },
        leftIcon: {
          color: palette.white
        }
      },
      secondary: {
        root: {
          borderColor: palette.primaryDark1,
          borderWidth: 1,
          backgroundColor: palette.white
        },
        text: {
          color: palette.primary
        },
        leftIcon: {
          color: palette.primary
        }
      }
    }

    const baseStyles = {
      root: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: spacing(8),
        paddingHorizontal: spacing(4)
      },
      text: {
        fontSize: 11,
        fontFamily: typography.fontByWeight.bold,
        textTransform: 'uppercase'
      },
      leftIcon: {
        marginRight: spacing(1)
      }
    }

    return merge(baseStyles, variantStyles[variant])
  }
)

type ButtonProps = RNButtonProps & {
  iconLeft?: ComponentType<SvgProps>
  variant: 'primary' | 'secondary'
}

export const Button = (props: ButtonProps) => {
  const { title, iconLeft: IconLeft, variant, ...other } = props
  const styles = useStyles({ variant })
  return (
    <Pressable style={styles.root} {...other} accessibilityRole='button'>
      {IconLeft ? (
        <IconLeft style={styles.leftIcon} fill={styles.leftIcon.color} />
      ) : null}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}
