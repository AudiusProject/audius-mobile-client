import AsyncStorage from '@react-native-community/async-storage'
import { useEffect } from 'react'

const SESSION_COUNT_KEY = '@session-count'

const getSessionCount = async () => {
  const sessionCount = await AsyncStorage.getItem(SESSION_COUNT_KEY)
  return sessionCount ? parseInt(sessionCount, 10) : null
}

export const incrementSessionCount = async () => {
  const sessionCount = await getSessionCount()
  if (sessionCount) {
    await AsyncStorage.setItem(SESSION_COUNT_KEY, (sessionCount + 1).toString())
  } else {
    await AsyncStorage.setItem(SESSION_COUNT_KEY, (1).toString())
  }
}

/**
 * Invokes `callback` every `frequency` sessions
 * @param callback
 * @param frequency
 * @param startAt which session to start at
 */
const useSessionCount = (
  callback: (count?: number) => void,
  frequency: number,
  startAt: number = 1
) => {
  useEffect(() => {
    const work = async () => {
      const count = await getSessionCount()
      if (count && count >= startAt && count % frequency === 0) {
        callback(count)
      }
    }
    work()
  }, [callback])
}

export default useSessionCount
