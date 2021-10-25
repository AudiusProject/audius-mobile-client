import React, { useCallback, useMemo, useState } from 'react'

import IconLink from '../../assets/images/iconLink.svg'
import LogoEth from '../../assets/images/logoEth.svg'
import LogoSol from '../../assets/images/logoSol.svg'
import Drawer from '../drawer'
import { useSelectorWeb } from '../../hooks/useSelectorWeb'
import {
  getModalVisibility,
  setVisibility
} from 'audius-client/src/common/store/ui/modals/slice'
import { getCollectible } from 'audius-client/src/common/store/ui/collectible-details/selectors'
import { Chain } from 'audius-client/src/common/models/Chain'
import {
  Collectible,
  CollectibleMediaType
} from 'audius-client/src/common/models/Collectible'
import { formatDateWithTimezoneOffset } from 'audius-client/src/common/utils/timeUtil'

import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import AutoSizeImage from '../../components/image/AutoSizeImage'
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Video from 'react-native-video'
import {
  ThemeColors,
  useColor,
  useTheme,
  useThemedStyles
} from '../../utils/theme'

const MODAL_NAME = 'CollectibleDetails'

export const messages = {
  owned: 'OWNED',
  created: 'CREATED',
  linkToCollectible: 'Link To Collectible'
}

const unthemedStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    drawer: {
      //   display: flex,
      //   flex-direction: column,
      //   margin-top: 64,
      //   font-size: var(--font-s);
      //   font-weight: var(--font-bold);
      //   overflow-y: scroll;
      //   overflow-x: hidden;
      //   z-index: 100;
      //   height: 100%;
    },

    volumeIcon: {
      //   position: relative;
      //   margin: 0;
      //   top: -40px;
      //   right: calc(-100vw + 88px);
    },

    details: {
      marginTop: 24
    },

    detailsDescription: {
      color: themeColors.neutralLight2,
      marginTop: 24,
      marginBottom: 24
    },

    detailsTitle: {
      color: themeColors.neutral,
      fontFamily: 'AvenirNextLTPro-Bold',
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 24
    },

    detailsStamp: {
      color: themeColors.white,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      fontSize: 12
    },

    badge: {
      fontFamily: 'AvenirNextLTPro-Bold',
      paddingTop: 4,
      paddingRight: 8,
      paddingBottom: 4,
      paddingLeft: 8,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: themeColors.white
    },

    created: {
      backgroundColor: themeColors.primary
    },

    owned: {
      backgroundColor: themeColors.secondary
    },

    chainIcon: {
      borderWidth: 1,
      borderColor: themeColors.neutralLight7,
      borderRadius: 12,
      padding: 2,
      marginLeft: 8
    },

    dateWrapper: {
      display: 'flex',
      marginTop: 8,
      marginBottom: 8
    },

    dateTitle: {
      color: themeColors.neutralLight4
    },

    date: {
      color: themeColors.neutralLight2,
      marginRight: 8,
      marginLeft: 8
    },

    link: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },

    linkText: {
      color: themeColors.secondary,
      fontFamily: 'AvenirNextLTPro-Heavy',
      textDecorationLine: 'underline'
    },

    linkIcon: {
      // color: themeColors.secondary,
      marginRight: 6
    }
  })

const mediaStyles = StyleSheet.create({
  detailsMediaWrapper: {
    //   margin: 48px 24px 0;
    //   max-width: none;
    //   max-height: none;
    //   height: auto;
  },
  image: {
    borderRadius: 8
  }
})

const CollectibleMedia: React.FC<{
  collectible: Collectible
}> = ({ collectible }) => {
  const { mediaType, imageUrl, videoUrl, gifUrl, threeDUrl } = collectible

  const [isMuted, setIsMuted] = useState<boolean>(true)
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted)
  }, [isMuted, setIsMuted])

  return mediaType === CollectibleMediaType.THREE_D ? (
    <View style={mediaStyles.detailsMediaWrapper}>
      <AutoSizeImage source={gifUrl!} />
    </View>
  ) : mediaType === CollectibleMediaType.GIF ? (
    <View style={mediaStyles.detailsMediaWrapper}>
      <AutoSizeImage source={{ uri: gifUrl }} />
    </View>
  ) : mediaType === CollectibleMediaType.VIDEO ? (
    <TouchableWithoutFeedback
      style={mediaStyles.detailsMediaWrapper}
      onPress={toggleMute}
    >
      <Video muted={isMuted} source={videoUrl!} />
      {/* {isMuted ? (
        <IconMute className={styles.volumeIcon} />
      ) : (
        <IconVolume className={styles.volumeIcon} />
      )} */}
    </TouchableWithoutFeedback>
  ) : (
    <View style={mediaStyles.detailsMediaWrapper}>
      <AutoSizeImage source={{ uri: imageUrl }} style={mediaStyles.image} />
    </View>
  )
}

const CollectibleDetails = () => {
  const dispatchWeb = useDispatchWeb()

  const isOpen = useSelectorWeb(state => getModalVisibility(state, MODAL_NAME))
  const collectible = useSelectorWeb(getCollectible)

  const handleClose = useCallback(() => {
    dispatchWeb(setVisibility({ modal: MODAL_NAME, visible: false }))
  }, [dispatchWeb])

  const handleLinkPress = useCallback(async url => {
    await Linking.openURL(url)
  }, [])

  const prettyLink = useMemo(() => {
    return collectible?.externalLink?.match(/(https*:\/\/)(.+)\//)[2] ?? ''
  }, [collectible])

  const styles = useThemedStyles(unthemedStyles)
  const secondaryColor = useColor('secondary')

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} isFullscreen>
      {collectible && (
        <View style={styles.drawer}>
          <CollectibleMedia collectible={collectible} />

          <View style={styles.details}>
            <Text style={styles.detailsTitle}>{collectible.name}</Text>
            <View style={styles.detailsStamp}>
              <Text
                style={[
                  styles.badge,
                  collectible.isOwned ? styles.owned : styles.created
                ]}
              >
                {collectible.isOwned ? messages.owned : messages.created}
              </Text>

              {collectible.chain === Chain.Eth ? (
                <LogoEth style={styles.chainIcon} height={16} width={16} />
              ) : (
                <LogoSol style={styles.chainIcon} height={16} width={16} />
              )}
            </View>

            {collectible.dateCreated && (
              <View style={styles.dateWrapper}>
                <Text style={styles.dateTitle}>Date Created:</Text>
                <Text style={styles.date}>
                  {formatDateWithTimezoneOffset(collectible.dateCreated)}
                </Text>
              </View>
            )}

            {collectible.dateLastTransferred && (
              <View style={styles.dateWrapper}>
                <Text style={styles.dateTitle}>Last Transferred:</Text>
                <Text style={styles.date}>
                  {formatDateWithTimezoneOffset(
                    collectible.dateLastTransferred
                  )}
                </Text>
              </View>
            )}

            <Text style={styles.detailsDescription}>
              {collectible.description}
            </Text>

            {collectible.externalLink && (
              <TouchableWithoutFeedback
                onPress={() => handleLinkPress(collectible.externalLink)}
              >
                <View style={styles.link}>
                  <IconLink
                    fill={secondaryColor}
                    style={styles.linkIcon}
                    height={16}
                    width={16}
                  />
                  <Text style={styles.linkText}>{prettyLink}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}

            {collectible.permaLink && (
              <TouchableWithoutFeedback
                onPress={() => handleLinkPress(collectible.permaLink)}
              >
                <View style={styles.link}>
                  <IconLink
                    fill={secondaryColor}
                    style={styles.linkIcon}
                    height={16}
                    width={16}
                  />
                  <Text style={styles.linkText}>
                    {messages.linkToCollectible}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      )}
    </Drawer>
  )
}

export default CollectibleDetails
