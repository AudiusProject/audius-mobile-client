import { memo, useCallback } from 'react'

import { StackHeaderProps } from '@react-navigation/stack'
import { markAllAsViewed } from 'audius-client/src/components/notification/store/actions'
import { Platform, View } from 'react-native'
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

import { HeaderBackArrow } from './HeaderArrowBack'

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    height: Platform.OS === 'ios' ? 86 : 55,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutralLight9,
    backgroundColor: palette.white,
    zIndex: 15
  },
  header: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: spacing(1)
  },
  iconNotification: {
    height: 28,
    width: 28
  },
  audiusLogo: {
    height: 24,
    width: 93,
    marginRight: 10
  },
  iconSearch: {
    height: 18,
    width: 18
  }
}))

type HeaderProps = StackHeaderProps

export const Header = memo(
  ({ navigation: headerNavigation, back }: HeaderProps) => {
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

    return (
      <View style={styles.root}>
        <View style={styles.header}>
          {back ? (
            <HeaderBackArrow onPress={headerNavigation.goBack} />
          ) : (
            <IconButton
              icon={IconNotification}
              styles={{ icon: styles.iconNotification }}
              fill={neutralLight4}
              onPress={handlePressNotification}
            />
          )}
          <IconButton
            icon={AudiusLogo}
            fill={neutralLight4}
            styles={{ icon: styles.audiusLogo }}
            onPress={handlePressHome}
          />
          <IconButton
            icon={IconSearch}
            fill={neutralLight4}
            styles={{ icon: styles.iconSearch }}
            onPress={handlePressSearch}
          />
        </View>
      </View>
    )
  }
)
