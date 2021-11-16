import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
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

const Tab = createBottomTabNavigator()

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
    Stack: ReturnType<typeof createNativeStackNavigator>
  ) => React.ReactNode
) => {
  const Stack = createNativeStackNavigator<StackParamList>()
  return () => (
    <Stack.Navigator>
      {baseScreen(Stack)}
      <Stack.Screen name='track' component={TrackScreen} />
      <Stack.Screen name='profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

const FeedStackScreen = createStackScreen<FeedStackParamList>(Stack => (
  <Stack.Screen name='feed' component={FeedScreen} />
))

const TabNavigator = () => {
  const location = useSelector(getLocation)

  const isNativeScreen = nativeScreens.has(
    location?.pathname.match(/[^/]+/)?.[0]
  )

  // NOTE: We are hiding the screenContainer for web screens so the WebView is shown
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
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
