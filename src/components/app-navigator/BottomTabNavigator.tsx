import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'

import BottomTabBar from 'app/components/bottom-tab-bar'
import FeedScreen from 'app/screens/feed-screen'
import ProfileScreen from 'app/screens/profile-screen/ProfileScreen'
import TrackScreen from 'app/screens/track-screen'

import { FeedStackParamList } from './types'

const EmptyScreen = () => {
  return <View />
}

const styles = StyleSheet.create({
  tabNavigator: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%'
  }
})

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

export default TabNavigator
