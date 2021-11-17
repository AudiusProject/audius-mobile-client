import { useNavigationState } from '@react-navigation/native'

/**
 * Hook that returns whether the StackNavigator nested in the top level
 * TabNavigator is open
 * @returns boolean
 */
const useIsStackOpen = () => {
  const state = useNavigationState(state => state)
  if (!state) {
    return false
  }

  const mainRoute = state.routes[0]

  if (mainRoute?.key === 'main') {
    return false
  }
  const activeRoute = mainRoute.state.routes[mainRoute.state.index]
  return activeRoute.state?.index > 0
}

export default useIsStackOpen
