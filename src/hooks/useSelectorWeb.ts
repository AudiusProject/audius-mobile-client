import { useSelector } from 'react-redux'

// When mobile client is no longer dependent on the web client
// calls to useSelectorWeb can be replaced with useSelector
export const useSelectorWeb = selector => {
  return useSelector((state: any) => selector(state.clientStore))
}
