import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import BottomTabBar from 'app/components/bottom-tab-bar'
import FeedScreen from 'app/screens/feed-screen'
import ProfileScreen from 'app/screens/profile-screen/ProfileScreen'
import TrackScreen from 'app/screens/track-screen'
import { getLocation } from 'app/store/lifecycle/selectors'

import { FeedStackParamList } from './types'

// As screens get migrated to RN, add them to this set
const nativeScreens = new Set(['feed'])

const EmptyScreen = () => {
  return <View style={{ backgroundColor: 'blue' }} />
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%'
  }
})

// This function is used to create a stack containing common screens like
// track and profile
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
        gestureResponseDistance: 1000
      }}
    >
      {baseScreen(Stack)}
      <Stack.Screen name='track' component={TrackScreen} />
      <Stack.Screen name='profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

const FeedStackScreen = createStackScreen<FeedStackParamList>(Stack => (
  <Stack.Screen name='feed' component={FeedScreen} />
))

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const location = useSelector(getLocation)

  const isNativeScreen = nativeScreens.has(
    location?.pathname.match(/[^/]+/)?.[0]
  )

  // NOTE: We are hiding the navContainer for web screens so the WebView is shown
  return (
    <View
      style={[styles.navContainer, { height: isNativeScreen ? '100%' : 0 }]}
    >
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: isNativeScreen
        }}
      >
        <Tab.Screen
          name='feed'
          component={FeedStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name='trending' component={EmptyScreen} />
        <Tab.Screen name='explore' component={EmptyScreen} />
        <Tab.Screen name='favorites' component={EmptyScreen} />
        <Tab.Screen name='profile' component={EmptyScreen} />
      </Tab.Navigator>
    </View>
  )
}

const AppNavigator = () => {
  return <TabNavigator />
}

export default AppNavigator
