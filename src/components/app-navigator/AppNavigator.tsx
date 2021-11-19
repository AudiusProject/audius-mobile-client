import React, { useCallback, useMemo, useState } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase, useNavigationState } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import BottomTabBar from 'app/components/bottom-tab-bar'
import SignOnNavigator from 'app/components/signon/SignOnNavigator'
import FeedScreen from 'app/screens/feed-screen'
import ProfileScreen from 'app/screens/profile-screen/ProfileScreen'
import TrackScreen from 'app/screens/track-screen'
import {
  getDappLoaded,
  getIsSignedIn,
  getOnSignUp
} from 'app/store/lifecycle/selectors'
import { getAccountAvailable } from 'app/store/signon/selectors'
import { getNavigationStateAtRoute } from 'app/utils/navigation'

import { FeedStackParamList } from './types'

// This enables the RN bottom bar and navigation
const IS_MAIN_NAVIGATION_ENABLED = false

// As screens get migrated to RN, add them to this set.
// This set should only include the screens accessible from the bottom bar
// (sign on screens are implicitly included)
const nativeScreens = new Set([])

const styles = StyleSheet.create({
  tabNavigator: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%'
  },
  appNavigator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  }
})

const EmptyScreen = () => {
  return <View />
}

/**
 * This function is used to create a stack containing common screens like
 * track and profile
 * @param baseScreen The screen to use as the base of the stack
 * @returns Stack.Navigator
 */
const createStackScreen = <StackParamList extends ParamListBase>(
  baseScreen: (
    Stack: ReturnType<typeof createStackNavigator>
  ) => React.ReactNode
) => {
  const Stack = createStackNavigator<StackParamList>()
  return () => (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureResponseDistance: 1000
      }}
    >
      {baseScreen(Stack)}
      <Stack.Screen name='track' component={TrackScreen} />
      <Stack.Screen name='profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

/**
 * An example stack for the feed screen
 */
const FeedStackScreen = createStackScreen<FeedStackParamList>(Stack => (
  <Stack.Screen name='feed-screen' component={FeedScreen} />
))

const Tab = createBottomTabNavigator()

type TabNavigatorProps = {
  isNativeScreen: boolean
  onBottomTabBarLayout?: (e: LayoutChangeEvent) => void
}

/**
 * The bottom tab navigator
 */
const TabNavigator = ({
  isNativeScreen,
  onBottomTabBarLayout
}: TabNavigatorProps) => {
  // Hide the navContainer for web screens so the WebView is shown
  return (
    <View
      style={[styles.tabNavigator, { height: isNativeScreen ? '100%' : 0 }]}
    >
      <Tab.Navigator
        tabBar={props => (
          <BottomTabBar {...props} onLayout={onBottomTabBarLayout} />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name='feed' component={FeedStackScreen} />
        <Tab.Screen name='trending' component={EmptyScreen} />
        <Tab.Screen name='explore' component={EmptyScreen} />
        <Tab.Screen name='favorites' component={EmptyScreen} />
        <Tab.Screen name='profile' component={EmptyScreen} />
      </Tab.Navigator>
    </View>
  )
}

const Stack = createStackNavigator()

/**
 * The top level navigator. Switches between sign on screens and main tab navigator
 * based on if the user is authed
 */
const AppNavigator = () => {
  const [bottomTabBarHeight, setBottomTabBarHeight] = useState(0)
  const mainNavigationState = useNavigationState(
    getNavigationStateAtRoute(['main'])
  )

  const dappLoaded = useSelector(getDappLoaded)
  const signedIn = useSelector(getIsSignedIn)
  const onSignUp = useSelector(getOnSignUp)
  const isAccountAvailable = useSelector(getAccountAvailable)

  const isAuthed = useMemo(() => {
    return (
      !dappLoaded ||
      signedIn === null ||
      (signedIn && !onSignUp) ||
      isAccountAvailable
    )
  }, [dappLoaded, isAccountAvailable, signedIn, onSignUp])

  const isNativeScreen = useMemo(() => {
    return (
      !mainNavigationState ||
      nativeScreens.has(
        mainNavigationState.routes[mainNavigationState.index]?.name
      )
    )
  }, [mainNavigationState])

  const navigatorHeight = useMemo(() => {
    if (!IS_MAIN_NAVIGATION_ENABLED && isAuthed) {
      return 0
    }

    return isNativeScreen ? '100%' : bottomTabBarHeight
  }, [isAuthed, isNativeScreen, bottomTabBarHeight])

  // Set the height of the navigator to be the height of the bottom tab bar
  // in cases where the webview needs to be shown.
  // Janky but required to get touch events etc. working properly
  // Can be removed when fully migrated to RN
  const handleBottomTabBarLayout = useCallback((e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
    setBottomTabBarHeight(height)
  }, [])

  return (
    <View style={[styles.appNavigator, { height: navigatorHeight }]}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}
      >
        {isAuthed ? (
          <Stack.Screen name='main' navigationKey='main'>
            {props => (
              <TabNavigator
                {...props}
                isNativeScreen={true}
                onBottomTabBarLayout={handleBottomTabBarLayout}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='sign-on' component={SignOnNavigator} />
        )}
      </Stack.Navigator>
    </View>
  )
}

export default AppNavigator
