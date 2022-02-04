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

type ScreenConfig = {
  name: string
  label?: string
  component: ComponentType<any>
  Icon: ComponentType
}

type TabScreenConfig = ScreenConfig & {
  key?: string
}

export const tabScreen = (config: TabScreenConfig) => {
  const { key, name, label, Icon, component } = config
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

type TopTabsProps = {
  initialScreenName?: string
  screens?: ScreenConfig[]
}

const TopTabNavigator = ({ initialScreenName, screens }: TopTabsProps) => {
  return (
    <TabNavigator initialScreenName={initialScreenName}>
      {screens?.map(screen => tabScreen({ key: screen.name, ...screen }))}
    </TabNavigator>
  )
}

export default TopTabNavigator
