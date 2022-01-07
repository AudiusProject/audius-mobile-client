import React, { useCallback } from 'react'

import {
  getChallengeRewardsModalType,
  getUserChallenges
} from 'audius-client/src/common/store/pages/audio-rewards/selectors'
import { ChallengeRewardsModalType } from 'audius-client/src/common/store/pages/audio-rewards/slice'
import { show as showMobileUploadDrawer } from 'audius-client/src/common/store/ui/mobile-upload-drawer/slice'
import {
  getModalVisibility,
  setVisibility
} from 'audius-client/src/common/store/ui/modals/slice'
import {
  ACCOUNT_VERIFICATION_SETTINGS_PAGE,
  AUDIO_PAGE,
  TRENDING_PAGE,
  UPLOAD_PAGE
} from 'audius-client/src/utils/route'
import { ImageSourcePropType } from 'react-native'

import Headphone from 'app/assets/images/emojis/headphone.png'
import IncomingEnvelope from 'app/assets/images/emojis/incoming-envelope.png'
import MobilePhoneWithArrow from 'app/assets/images/emojis/mobile-phone-with-arrow.png'
import MultipleMusicalNotes from 'app/assets/images/emojis/multiple-musical-notes.png'
import WhiteHeavyCheckMark from 'app/assets/images/emojis/white-heavy-check-mark.png'
import IconArrow from 'app/assets/images/iconArrow.svg'
import IconCheck from 'app/assets/images/iconCheck.svg'
import IconUpload from 'app/assets/images/iconUpload.svg'
import { useDispatchWeb } from 'app/hooks/useDispatchWeb'
import { usePushRouteWeb } from 'app/hooks/usePushRouteWeb'
import { useSelectorWeb } from 'app/hooks/useSelectorWeb'

import Button, { ButtonType } from '../button'

import ChallengeRewardsDrawer from './ChallengeRewardsDrawer'
import { ProfileCompletionDrawerContents } from './ProfileCompletionDrawerContents'
import { ReferralDrawerContents } from './ReferralDrawerContents'

const messages = {
  // Connect Verified
  connectVerifiedTitle: 'Link Verified Accounts',
  connectVerifiedDescription:
    'Get verified on Audius by linking your verified Twitter or Instagram account!',
  connectVerifiedButton: 'Verify Your Account',

  // Listen Streak
  listenStreakTitle: 'Listening Streak: 7 Days',
  listenStreakDescription:
    'Sign in and listen to at least one track every day for 7 days',
  listenStreakProgressLabel: 'Days',
  listenStreakButton: 'Trending Tracks',

  // Mobile Install
  mobileInstallTitle: 'Get the Audius Mobile App',
  mobileInstallDescription:
    'Install the Audius app for iPhone and Android and Sign in to your account!',

  // Profile Completion
  profileCompletionTitle: 'Complete Your Profile',
  profileCompletionDescription:
    'Fill out the missing details on your Audius profile and start interacting with tracks and artists!',
  profileCompletionProgressLabel: 'Complete',

  // Referrals
  referreralsTitle: 'Invite your Friends',
  referralsDescription:
    'Invite your Friends! You’ll earn 1 $AUDIO for each friend who joins with your link (and they’ll get an $AUDIO too)',
  referralsProgressLabel: 'Invites Sent',

  // Track Upload
  trackUploadTitle: 'Upload 5 Tracks',
  trackUploadDescription: 'Upload 5 tracks to your profile',
  trackUploadProgressLabel: 'Uploaded',
  trackUploadButton: 'Upload Tracks'
}

const MODAL_NAME = 'ChallengeRewardsExplainer'
type ChallengeConfig = {
  icon: ImageSourcePropType
  title: string
  description: string
  progressLabel?: string
  amount: number
  buttonInfo?: {
    link: string
    label: string
    icon: React.ReactElement
    iconPosition: 'left' | 'right'
  }
}
const challengesConfig: Record<ChallengeRewardsModalType, ChallengeConfig> = {
  'connect-verified': {
    icon: WhiteHeavyCheckMark,
    title: messages.connectVerifiedTitle,
    description: messages.connectVerifiedDescription,
    amount: 10,
    buttonInfo: {
      label: messages.connectVerifiedButton,
      link: ACCOUNT_VERIFICATION_SETTINGS_PAGE,
      icon: <IconCheck fill={'white'} />,
      iconPosition: 'right'
    }
  },
  'listen-streak': {
    icon: Headphone,
    title: messages.listenStreakTitle,
    description: messages.listenStreakDescription,
    progressLabel: messages.listenStreakProgressLabel,
    amount: 5,
    buttonInfo: {
      label: messages.listenStreakButton,
      link: TRENDING_PAGE,
      icon: <IconArrow fill={'white'} />,
      iconPosition: 'right'
    }
  },
  'mobile-install': {
    icon: MobilePhoneWithArrow,
    title: messages.mobileInstallTitle,
    description: messages.mobileInstallDescription,
    amount: 10
  },
  'profile-completion': {
    icon: WhiteHeavyCheckMark,
    title: messages.profileCompletionTitle,
    description: messages.profileCompletionDescription,
    progressLabel: messages.profileCompletionProgressLabel,
    amount: 5
  },
  referrals: {
    icon: IncomingEnvelope,
    title: messages.referreralsTitle,
    description: messages.referralsDescription,
    progressLabel: messages.referralsProgressLabel,
    amount: 1
  },
  referred: {
    icon: IncomingEnvelope,
    title: messages.referreralsTitle,
    description: messages.referralsDescription,
    progressLabel: messages.referralsProgressLabel,
    amount: 1
  },
  'track-upload': {
    icon: MultipleMusicalNotes,
    title: messages.trackUploadTitle,
    description: messages.trackUploadDescription,
    progressLabel: messages.trackUploadProgressLabel,
    amount: 5,
    buttonInfo: {
      label: messages.trackUploadButton,
      link: UPLOAD_PAGE,
      icon: <IconUpload fill={'white'} />,
      iconPosition: 'right'
    }
  }
}

const ChallengeRewardsDrawerProvider = () => {
  const dispatchWeb = useDispatchWeb()
  const pushRouteWeb = usePushRouteWeb()
  const isVisible = useSelectorWeb(state =>
    getModalVisibility(state, MODAL_NAME)
  )
  const modalType = useSelectorWeb(getChallengeRewardsModalType)
  const userChallenges = useSelectorWeb(getUserChallenges)
  const onClose = useCallback(
    () => dispatchWeb(setVisibility({ modal: MODAL_NAME, visible: false })),
    [dispatchWeb]
  )
  const challenge = userChallenges ? userChallenges[modalType] : null
  const config = challengesConfig[modalType]
  const goToRoute = useCallback(() => {
    if (!config.buttonInfo?.link) {
      return
    }
    pushRouteWeb(config.buttonInfo.link, AUDIO_PAGE, false)
    onClose()
  }, [pushRouteWeb, onClose, config])

  const openUploadModal = useCallback(() => {
    onClose()
    dispatchWeb(showMobileUploadDrawer())
  }, [dispatchWeb, onClose])

  let contents = null
  switch (modalType) {
    case 'referrals':
      contents = <ReferralDrawerContents />
      break
    case 'track-upload':
      contents = (
        <Button
          title={messages.trackUploadButton}
          icon={<IconUpload fill={'white'} />}
          iconPosition='right'
          type={challenge?.is_complete ? ButtonType.COMMON : ButtonType.PRIMARY}
          onPress={openUploadModal}
        />
      )
      break
    case 'profile-completion':
      contents = (
        <ProfileCompletionDrawerContents
          isComplete={challenge?.is_complete}
          onClose={onClose}
        />
      )
      break
    default:
      contents = config?.buttonInfo && (
        <Button
          title={config.buttonInfo.label}
          icon={config.buttonInfo.icon}
          iconPosition={config.buttonInfo.iconPosition}
          type={challenge?.is_complete ? ButtonType.COMMON : ButtonType.PRIMARY}
          onPress={goToRoute}
        />
      )
  }
  if (!config || !challenge) {
    return null
  }
  return (
    <ChallengeRewardsDrawer
      isOpen={isVisible}
      onClose={onClose}
      title={config.title}
      titleIcon={config.icon}
      description={config.description}
      progressLabel={config.progressLabel}
      amount={config.amount}
      isComplete={challenge.is_complete}
      currentStep={challenge.current_step_count}
      stepCount={challenge.max_steps}
      isDisbursed={challenge.is_disbursed}
    >
      {contents}
    </ChallengeRewardsDrawer>
  )
}

export default ChallengeRewardsDrawerProvider
