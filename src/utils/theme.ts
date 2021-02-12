import { StatusBar } from "react-native"
import { useSelector } from "react-redux"
import { useDarkMode } from 'react-native-dark-mode'
import { getTheme } from "../store/theme/selectors"


export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
  AUTO = 'auto'
}


export const handleThemeChange = (theme: Theme) => {
  switch (theme) {
    case Theme.DEFAULT: {
      StatusBar.setBarStyle('dark-content')
      break
    }
    case Theme.DARK: {
      StatusBar.setBarStyle('light-content')
      break
    }
    case Theme.AUTO: {
      StatusBar.setBarStyle('default')
      break
    }
  }

  // Fade in status bar after we
  // get our first update, after a
  // slight delay to allow Splash Screen
  // to animate out.
  setTimeout(() => {
    StatusBar.setHidden(false, "fade")
  }, 500)
}

export const defaultTheme = {
  background: '#F3F0F7',
  primary: '#CC0FE0',
  primaryDark1: '#B80ECA',
  primaryDark2: '#A30CB3',
  primaryLight1: '#D127E3',
  primaryLight2: '#D63FE6',
  secondary: '#7E1BCC',
  secondaryDark1: '#7118B8',
  secondaryDark2: '#6516A3',
  secondaryLight1: '#8B32D1',
  secondaryLight2: '#9849D6',
  neutral: '#858199',
  neutralDark1: '#78748A',
  neutralDark2: '#6A677A',
  neutralDark3: '#4D535A',
  neutralLight1: '#9D9AAD',
  neutralLight2: '#AAA7B8',
  neutralLight3: '#B6B3C2',
  neutralLight4: '#C2C0CC',
  neutralLight5: '#CECDD6',
  neutralLight6: '#DAD9E0',
  neutralLight7: '#E7E6EB',
  neutralLight8: '#F2F2F4',
  neutralLight9: '#F7F7F9',
  neutralLight10: '#FCFCFC',
  white: '#FFFFFF',
  accentRed: '#D0021B',
  accentRedDark1: '#AA0115',
  accentRedLight1: '#D51B32',
  accentGreen: '#0BA400',
  accentGreenDark1: '#0A9400',
  accentGreenLight1: '#23AD1A',
  accentOrange: '#FF9400',
  accentOrangeDark1: '#F28100',
  accentOrangeLight1: '#FFA70F',
  accentPurple: '#8E51CF',
  shadow: '#E3E3E3'
}

export const darkTheme = {
  background: '#242438',
  primary: '#C74BD3',
  primaryDark1: '#C556D4',
  primaryDark2: '#C563D6',
  primaryLight1: '#B748C6',
  primaryLight2: '#A945B9',
  secondary: '#9147CC',
  secondaryDark1: '#975ACD',
  secondaryDark2: '#9A60CF',
  secondaryLight1: '#8244B8',
  secondaryLight2: '#7440A4',
  neutral: '#BEC5E0',
  neutralDark1: '#C4CAE1',
  neutralDark2: '#CBD1E3',
  neutralDark3: '#E0E6FA',
  neutralLight1: '#A2A8C2',
  neutralLight2: '#9399B3',
  neutralLight3: '#868AA4',
  neutralLight4: '#777C96',
  neutralLight5: '#696D88',
  neutralLight6: '#5A5E78',
  neutralLight7: '#4E4F6A',
  neutralLight8: '#3F415B',
  neutralLight9: '#393A54',
  neutralLight10: '#35364F',
  white: '#32334D',
  accentRed: '#D0021B',
  accentRedDark1: '#AA0115',
  accentRedLight1: '#D51B32',
  accentGreen: '#0BA400',
  accentGreenDark1: '#0A9400',
  accentGreenLight1: '#23AD1A',
  accentOrange: '#FF9400',
  accentOrangeDark1: '#F28100',
  accentOrangeLight1: '#FFA70F',
  accentPurple: '#8E51CF',
  shadow: '#35364F'
}

const useDark = () => {
  const theme = useSelector(state => getTheme(state))
  const isSystemDarkMode = useDarkMode()

  let showDark = false
  switch (theme) {
    case Theme.DEFAULT:
      break
    case Theme.DARK:
      showDark = true
      break
    case Theme.AUTO:
      if (isSystemDarkMode) {
        showDark = true
      }
      break
  }
  return showDark
}

export const useColor = (color: string) => {
  const showDark = useDark()
  return (showDark ? darkTheme : defaultTheme)[color]
}

export const useTheme = (baseStyles: object, toTheme: object) => {
  const showDark = useDark()
  const themeStyles = showDark ? darkTheme : defaultTheme

  const newStyles = {}
  Object.keys(toTheme).forEach(key => {
    if (toTheme[key] in themeStyles) {
      newStyles[key] = themeStyles[toTheme[key]]
    }
  })
  return {...baseStyles, ...newStyles}
}