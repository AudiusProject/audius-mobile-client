import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'

import BottomTabBar from 'app/components/bottom-tab-bar'

const Tab = createBottomTabNavigator()

const EmptyPage = () => {
  return <View style={{ backgroundColor: 'red' }} />
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  sceneContainer: {
    backgroundColor: 'transparent'
  }
})

const AppNavigator = () => {
  return (
    <View style={styles.navContainer} pointerEvents='none'>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <BottomTabBar {...props} />}
          sceneContainerStyle={styles.sceneContainer}
        >
          <Tab.Screen name='Feed' component={EmptyPage} />
          <Tab.Screen name='Trending' component={EmptyPage} />
          <Tab.Screen name='Explore' component={EmptyPage} />
          <Tab.Screen name='Favorites' component={EmptyPage} />
          <Tab.Screen name='Profile' component={EmptyPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default AppNavigator
