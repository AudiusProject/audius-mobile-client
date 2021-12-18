import React, { ReactNode } from 'react'

import {
  LinkingOptions,
  NavigationContainer as RNNavigationContainer
} from '@react-navigation/native'

import { AppStackParamList } from 'app/components/app-navigator/types'

type Props = {
  children: ReactNode
}

const linking: LinkingOptions<AppStackParamList> = {
  prefixes: ['https://audius.co'],
  // configuration for matching screens with paths
  config: {
    screens: {
      main: {
        initialRouteName: 'feed',
        screens: {
          // This is the stack for the feed
          feed: {
            screens: {
              // This is actual feed screen
              feed: {
                screens: {
                  feed: 'feed',
                  banana: 'banana'
                }
              },
              track: '*/*'
              // profile: '*'
            }
          },
          trending: {
            screens: {
              trending: {
                screens: {
                  thisWeek: 'thisWeek',
                  thisMonth: 'thisMonth',
                  thisYear: 'thisYear'
                }
              }
              // track: '*/*',
              // profile: '*'
            }
          },
          explore: {
            screens: {
              explore: {
                screens: {
                  forYou: 'forYou',
                  moods: 'moods',
                  playlists: 'playlists',
                  artists: '404'
                }
              }
              // track: '*/*',
              // profile: '*'
            }
          },
          favorites: 'favorites',
          profile: '*'
        }
      }
    }
  }
}

/**
 * NavigationContainer contains the react-navigation context
 * and configures linking
 */
const NavigationContainer = ({ children }: Props) => {
  return (
    <RNNavigationContainer linking={linking}>{children}</RNNavigationContainer>
  )
}

export default NavigationContainer
