import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import BottomTabBar from 'app/components/bottom-tab-bar'
import { getLocation } from 'app/store/lifecycle/selectors'

// As screens get migrated to RN, add them to this set
const nativeScreens = new Set([])

const Tab = createBottomTabNavigator()

const EmptyPage = () => {
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

const TabNavigator = () => {
  const location = useSelector(getLocation)

  const isNativeScreen = nativeScreens.has(
    location?.pathname.match(/[^/]+/)?.[0]
  )
  console.log(isNativeScreen, location?.pathname)

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
        <Tab.Screen name='feed' component={EmptyPage} />
        <Tab.Screen name='trending' component={EmptyPage} />
        <Tab.Screen name='explore' component={EmptyPage} />
        <Tab.Screen name='favorites' component={EmptyPage} />
        <Tab.Screen name='profile' component={EmptyPage} />
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
