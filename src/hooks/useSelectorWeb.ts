import { isEmpty } from 'lodash'
import { Selector, useSelector } from 'react-redux'

import { AppState } from 'audius-client/src/store/types'

// When mobile client is no longer dependent on the web client
// calls to useSelectorWeb can be replaced with useSelector
export const useSelectorWeb = <ReturnValue>(
  selector: Selector<AppState, ReturnValue>
) => {
  return useSelector((state: { clientStore: AppState }) =>
    isEmpty(state.clientStore) ? undefined : selector(state.clientStore)
  )
}
