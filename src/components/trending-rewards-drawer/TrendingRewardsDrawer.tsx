import React, { useCallback } from 'react'

import { StringKeys } from 'audius-client/src/common/services/remote-config'
import { getTrendingRewardsModalType } from 'audius-client/src/common/store/pages/audio-rewards/selectors'
import {
  setTrendingRewardsModalType,
  TrendingRewardsModalType
} from 'audius-client/src/common/store/pages/audio-rewards/slice'
import {
  getModalVisibility,
  setVisibility
} from 'audius-client/src/common/store/ui/modals/slice'
import { Image, ImageStyle, ScrollView, StyleSheet, View } from 'react-native'

import ChartIncreasing from 'app/assets/images/emojis/chart-increasing.png'
import Drawer from 'app/components/drawer'
import GradientText from 'app/components/gradient-text'
import TabSlider from 'app/components/tab-slider'
import Text from 'app/components/text'
import TweetEmbed from 'app/components/tweet-embed'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { useRemoteVar } from 'app/hooks/useRemoteConfig'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'
import { useThemedStyles } from 'app/hooks/useThemedStyles'
import Theme from 'app/models/Theme'
import { ThemeColors, useThemeVariant } from 'app/utils/theme'

const TRENDING_REWARDS_DRAWER_NAME = 'TrendingRewardsExplainer'

const messages = {
  tracksTitle: 'Top 5 Tracks Each Week Receive 100 $AUDIO',
  playlistTitle: 'Top 5 Playlists Each Week Receive 100 $AUDIO',
  undergroundTitle: 'Top 5 Tracks Each Week Receive 100 $AUDIO',
  winners: 'Winners are selected every Friday at Noon PT!',
  lastWeek: "LAST WEEK'S WINNERS",
  tracks: 'TRACKS',
  playlists: 'PLAYLISTS',
  underground: 'UNDERGROUND',
  terms: 'Terms and Conditions Apply',
  tracksModalTitle: 'Top 5 Trending Tracks',
  playlistsModalTitle: 'Top 5 Trending Playlists',
  undergroundModalTitle: 'Top 5 Underground Trending Tracks',
  buttonTextTracks: 'Current Trending Tracks',
  buttonTextPlaylists: 'Current Trending Playlists',
  buttonTextUnderground: 'Current Underground Trending Tracks',
  mobileButtonTextTracks: 'Trending Tracks',
  mobileButtonTextPlaylists: 'Trending Playlists',
  mobileButtonTextUnderground: 'Underground Trending Tracks'
}

const textMap = {
  playlists: {
    modalTitle: messages.playlistsModalTitle,
    title: messages.playlistTitle,
    button: messages.buttonTextPlaylists,
    buttonMobile: messages.mobileButtonTextPlaylists
  },
  tracks: {
    modalTitle: messages.tracksModalTitle,
    title: messages.tracksTitle,
    button: messages.buttonTextTracks,
    buttonMobile: messages.mobileButtonTextTracks
  },
  underground: {
    modalTitle: messages.undergroundModalTitle,
    title: messages.undergroundTitle,
    button: messages.buttonTextUnderground,
    buttonMobile: messages.mobileButtonTextUnderground
  }
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    content: {
      height: '100%',
      width: '100%',
      paddingBottom: 32
    },
    modalTitleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
      marginTop: 8,
      marginBottom: 16
    },
    modalTitle: {
      fontSize: 24
    },
    chartEmoji: {
      height: 24,
      width: 24,
      marginRight: 12
    },
    titles: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 32,
      marginTop: 32
    },
    title: {
      color: themeColors.secondary,
      fontSize: 14,
      marginBottom: 8
    },
    subtitle: {
      color: themeColors.neutralLight4,
      fontSize: 12
    },
    lastWeek: {
      textAlign: 'center',
      marginBottom: 16,
      fontSize: 24
    }
  })

// Getters and setters for whether we're looking at
// trending playlists or trending tracks
const useRewardsType = (): [
  TrendingRewardsModalType,
  (type: TrendingRewardsModalType) => void
] => {
  const dispatch = useDispatchWeb()
  const rewardsType = useSelectorWeb(getTrendingRewardsModalType)
  const setTrendingRewardsType = useCallback(
    (type: TrendingRewardsModalType) => {
      dispatch(setTrendingRewardsModalType({ modalType: type }))
    },
    [dispatch]
  )
  return [rewardsType ?? 'tracks', setTrendingRewardsType]
}

const useTweetId = (type: TrendingRewardsModalType) => {
  const tracksId = useRemoteVar(StringKeys.REWARDS_TWEET_ID_TRACKS)
  const playlistsId = useRemoteVar(StringKeys.REWARDS_TWEET_ID_PLAYLISTS)
  const undergroundId = useRemoteVar(StringKeys.REWARDS_TWEET_ID_UNDERGROUND)
  return {
    tracks: tracksId,
    playlists: playlistsId,
    underground: undergroundId
  }[type]
}

const useIsDark = () => {
  const themeVariant = useThemeVariant()
  return themeVariant === Theme.DARK
}

const TrendingRewardsDrawer = () => {
  const dispatchWeb = useDispatchWeb()
  const styles = useThemedStyles(createStyles)
  const [modalType, setModalType] = useRewardsType()
  const isDark = useIsDark()

  const isOpen = useSelectorWeb(state =>
    getModalVisibility(state, TRENDING_REWARDS_DRAWER_NAME)
  )

  const tweetId = useTweetId(modalType)

  const handleClose = useCallback(() => {
    dispatchWeb(
      setVisibility({ modal: TRENDING_REWARDS_DRAWER_NAME, visible: false })
    )
  }, [dispatchWeb])

  const tabOptions = [
    {
      key: 'tracks',
      text: messages.tracks
    },
    {
      key: 'playlists',
      text: messages.playlists
    },
    {
      key: 'underground',
      text: messages.underground
    }
  ]

  return (
    <Drawer
      isFullscreen
      isOpen={isOpen}
      onClose={handleClose}
      isGestureSupported={false}
    >
      <View style={styles.content}>
        <View style={styles.modalTitleContainer}>
          <Image
            style={styles.chartEmoji as ImageStyle}
            source={ChartIncreasing}
          />
          <GradientText
            text={textMap[modalType].modalTitle}
            style={styles.modalTitle}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TabSlider
            options={tabOptions}
            selected={modalType}
            onSelectOption={option =>
              setModalType(option as TrendingRewardsModalType)
            }
            key={`rewards-slider-${tabOptions.length}`}
          />
          <View style={styles.titles}>
            <Text style={styles.title} weight='bold'>
              {textMap[modalType].title}
            </Text>
            <Text style={styles.subtitle} weight='bold'>
              {messages.winners}
            </Text>
          </View>

          <GradientText text={messages.lastWeek} style={styles.lastWeek} />
          <TweetEmbed
            // Refresh it when we toggle
            key={`twitter-${tweetId}`}
            tweetId={tweetId}
            options={{
              theme: isDark ? 'dark' : 'light',
              cards: 'none',
              conversation: 'none',
              hide_thread: true,
              width: 554,
              height: 390
            }}
          />
        </ScrollView>
      </View>
    </Drawer>
  )
}

export default TrendingRewardsDrawer
