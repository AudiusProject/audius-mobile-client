import { ComponentType, ReactNode } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { TopTabBar } from 'app/components/top-tab-bar'

const Tab = createMaterialTopTabNavigator()

const screenOptions = {
  tabBarActiveTintColor: '#CC0FE0',
  tabBarLabelStyle: { fontSize: 12 },
  tabBarStyle: { backgroundColor: 'white' },
  tabBarIndicatorStyle: {
    backgroundColor: '#CC0FE0',
    height: 3
  }
}

type TabNavigatorProps = {
  initialScreenName?: string
  children: ReactNode
}

export const TabNavigator = ({
  initialScreenName,
  children
}: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      initialRouteName={initialScreenName}
      tabBar={props => <TopTabBar {...props} />}
      screenOptions={screenOptions}
    >
      {children}
    </Tab.Navigator>
  )
}

type TabScreenConfig = {
  key?: string
  name: string
  label?: string
  Icon: ComponentType
  component: ComponentType
}

export const tabScreen = ({
  key,
  name,
  label,
  Icon,
  component
}: TabScreenConfig) => {
  return (
    <Tab.Screen
      key={key}
      name={name}
      component={component}
      options={{
        tabBarLabel: label ?? name,
        tabBarIcon: () => <Icon />
      }}
    />
  )
}

type ScreenInfo = {
  name: string
  label?: string
  component: ComponentType<any>
  icon?: ComponentType
}

type TopTabsProps = {
  initialScreen?: string
  screens?: ScreenInfo[]
}

const TopTabNavigator = ({ initialScreen, screens }: TopTabsProps) => {
  return (
    <TabNavigator initialScreenName={initialScreen}>
      {screens?.map(({ name, component, label, icon: Icon }) =>
        tabScreen({
          key: name,
          name,
          component,
          label,
          Icon: Icon ?? (() => null)
        })
      )}
    </TabNavigator>
  )
}

export default TopTabNavigator
