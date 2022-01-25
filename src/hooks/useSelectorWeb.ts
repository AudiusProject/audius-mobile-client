import { CommonState } from 'audius-client/src/common/store'
import { isEqual } from 'lodash'
import { Selector, useSelector } from 'react-redux'

// When mobile client is no longer dependent on the web client
// calls to useSelectorWeb can be replaced with useSelector
export const useSelectorWeb = <ReturnValue>(
  selector: Selector<CommonState, ReturnValue>,
  /**
   * Useful for debugging rerenders, set to true to log
   * the strict equality of previous and current values
   */
  showEquality?: boolean
) => {
  return useSelector(
    (state: { clientStore: CommonState }) => selector(state.clientStore),

    (left, right) => {
      // This is extremely slow! Should be temporary
      // or we should specify this at the individual useSelector level
      const equal = isEqual(left, right)
      if (showEquality) {
        console.log(equal, left, right)
      }
      return equal
    }
  )
}
