import React, {
  memo,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { push } from 'connected-react-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getUserHandle } from 'audius-client/src/common/store/account/selectors'
import {
  FEED_PAGE,
  TRENDING_PAGE,
  EXPLORE_PAGE,
  FAVORITES_PAGE,
  getPathname,
  profilePage
} from 'audius-client/src/utils/route'
import {
  openSignOn as _openSignOn,
  showRequiresAccountModal
} from 'audius-client/src/containers/sign-on/store/actions'

import colors from '../../assets/colors/light'
import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'
import { getLocation } from '../../store/lifecycle/selectors'

import FeedButton from './buttons/FeedButton'
import TrendingButton from './buttons/TrendingButton'
import ExploreButton from './buttons/ExploreButton'
import FavoritesButton from './buttons/FavoritesButton'
import ProfileButton from './buttons/ProfileButton'

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',

    borderTopWidth: 1,
    borderTopColor: colors.neutralLight8,
    backgroundColor: colors.neutralLight10,
    /* Above the play bar so it can slide up from underneath */
    zIndex: 12,

    padding: 0,

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})

const BottomBar = () => {
  // TODO: Theming
  const isMatrixMode = false
  const isDarkMode = false

  const dispatchWeb = useDispatchWeb()
  const handle = useSelectorWeb(getUserHandle)
  const location = useSelector(getLocation)

  const openSignOn = () => dispatchWeb(_openSignOn(false))
  const goToRoute = (route: string) => dispatchWeb(push(route))

  const userProfilePage = handle ? profilePage(handle) : null
  const navRoutes = new Set([
    FEED_PAGE,
    TRENDING_PAGE,
    EXPLORE_PAGE,
    FAVORITES_PAGE,
    userProfilePage
  ])

  const [lastNavRoute, setNavRoute] = useState(FEED_PAGE)
  const currentRoute = location && getPathname(location)

  if (lastNavRoute !== currentRoute) {
    // If the current route isn't what we memoized, check if it's a nav route
    // and update the current route if so
    if (navRoutes.has(currentRoute)) {
      setNavRoute(currentRoute)
    }
  }

  const goToFeed = useCallback(() => {
    // resetExploreTab()
    if (!handle) {
      openSignOn()
    } else {
      goToRoute(FEED_PAGE)
    }
  }, [goToRoute, handle, openSignOn])

  const goToTrending = useCallback(() => {
    // resetExploreTab()
    goToRoute(TRENDING_PAGE)
  }, [goToRoute])

  const goToExplore = useCallback(() => {
    // resetExploreTab()
    goToRoute(EXPLORE_PAGE)
  }, [goToRoute])

  const goToFavorites = useCallback(() => {
    // resetExploreTab()
    if (!handle) {
      openSignOn()
    } else {
      goToRoute(FAVORITES_PAGE)
    }
  }, [goToRoute, handle, openSignOn])

  const goToProfile = useCallback(() => {
    // resetExploreTab()
    if (!handle) {
      openSignOn()
    } else {
      goToRoute(profilePage(handle))
    }
  }, [goToRoute, handle, openSignOn])

  // TODO: scroll up and stack reset
  const onClick = useCallback(
    (callback: () => void, page: string | null) => () => {
      callback()
    },
    []
  )

  return (
    <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
      <FeedButton
        isActive={currentRoute === FEED_PAGE}
        darkMode={isDarkMode}
        onClick={onClick(goToFeed, FEED_PAGE)}
        isMatrixMode={isMatrixMode}
      />
      <TrendingButton
        isActive={currentRoute === TRENDING_PAGE}
        darkMode={isDarkMode}
        onClick={onClick(goToTrending, TRENDING_PAGE)}
        isMatrixMode={isMatrixMode}
      />
      <ExploreButton
        isActive={currentRoute === EXPLORE_PAGE}
        darkMode={isDarkMode}
        onClick={onClick(goToExplore, EXPLORE_PAGE)}
        isMatrixMode={isMatrixMode}
      />
      <FavoritesButton
        isActive={currentRoute === FAVORITES_PAGE}
        darkMode={isDarkMode}
        onClick={onClick(goToFavorites, FAVORITES_PAGE)}
        isMatrixMode={isMatrixMode}
      />
      <ProfileButton
        isActive={currentRoute === userProfilePage}
        darkMode={isDarkMode}
        onClick={onClick(goToProfile, userProfilePage)}
        isMatrixMode={isMatrixMode}
      />
    </SafeAreaView>
  )
}

export default BottomBar
