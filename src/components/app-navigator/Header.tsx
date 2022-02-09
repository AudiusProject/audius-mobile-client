import { useCallback } from 'react'

import { markAllAsViewed } from 'audius-client/src/components/notification/store/actions'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import AudiusLogo from 'app/assets/images/audiusLogoHorizontal.svg'
import IconNotification from 'app/assets/images/iconNotification.svg'
import IconSearch from 'app/assets/images/iconSearch.svg'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useNavigation } from 'app/hooks/useNavigation'
import { open as openNotificationPanel } from 'app/store/notifications/actions'
import { open as openSearch } from 'app/store/search/actions'
import { makeStyles } from 'app/styles'
import { useThemeColors } from 'app/utils/theme'

import { IconButton } from '../core/IconButton'

const useStyles = makeStyles(({ palette, typography, spacing }) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 15,
    width: '100%'
  },
  iconNotification: {
    height: 28,
    width: 28
  },
  audiusLogo: {
    height: 24,
    width: 93
  },
  iconSearch: {
    height: 18,
    width: 18
  }
}))

type HeaderProps = { children: string }

export const Header = ({ children }: HeaderProps) => {
  const styles = useStyles()
  const { neutralLight4 } = useThemeColors()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const dispatchWeb = useDispatchWeb()

  const handlePressNotification = useCallback(() => {
    dispatch(openNotificationPanel())
    dispatchWeb(markAllAsViewed())
  }, [dispatch, dispatchWeb])

  const handlePressHome = useCallback(() => {
    navigation.navigate({
      native: { screen: 'trending', params: undefined },
      web: { route: 'trending' }
    })
  }, [navigation])

  const handlePressSearch = useCallback(() => {
    dispatch(openSearch())
  }, [dispatch])

  if (children === 'profile') {
    return <AudiusLogo fill={neutralLight4} />
  }

  return (
    <View style={styles.header}>
      <IconButton
        icon={IconNotification}
        styles={{ icon: styles.iconNotification }}
        fill={neutralLight4}
        onPress={handlePressNotification}
      />
      <IconButton
        icon={AudiusLogo}
        fill={neutralLight4}
        styles={{ icon: styles.audiusLogo, root: { paddingRight: 10 } }}
        onPress={handlePressHome}
      />
      <IconButton
        icon={IconSearch}
        fill={neutralLight4}
        styles={{ icon: styles.iconSearch }}
        onPress={handlePressSearch}
      />
    </View>
  )
}
