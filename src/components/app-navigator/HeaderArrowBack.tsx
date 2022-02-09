import IconCaretRight from 'app/assets/images/iconCaretRight.svg'
import { makeStyles } from 'app/styles'
import { useThemeColors } from 'app/utils/theme'

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    height: 28,
    width: 28,
    transform: [{ rotate: '180deg' }],
    marginLeft: spacing(4)
  }
}))

export const HeaderBackArrow = () => {
  const styles = useStyles()
  const { neutralLight4 } = useThemeColors()
  return <IconCaretRight fill={neutralLight4} style={styles.root} />
}
