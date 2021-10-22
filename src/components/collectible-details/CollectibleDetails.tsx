import React, { useCallback, useMemo } from 'react'

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
import { formatDateWithTimezoneOffset } from 'audius-client/src/common/utils/timeUtil'

import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import {
  Linking,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

const MODAL_NAME = 'CollectibleDetails'

export const messages = {
  owned: 'OWNED',
  created: 'CREATED',
  linkToCollectible: 'Link To Collectible'
}

const styles = StyleSheet.create({
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

  detailsMediaWrapper: {
    //   margin: 48px 24px 0;
    //   max-width: none;
    //   max-height: none;
    //   height: auto;
  },

  image: {
    //   border-radius: 8px;
    //   max-width: 100%;
    //   pointer-events: none;
    //   cursor: default;
  },

  volumeIcon: {
    //   position: relative;
    //   margin: 0;
    //   top: -40px;
    //   right: calc(-100vw + 88px);
  },

  details: {
    //   width: 100%;
    //   max-width: none;
    //   min-width: unset;
    //   margin: 0;
    //   padding: 24px;
  },

  detailsDescription: {
    //   margin: var(--unit-6) 0;
    //   color: var(--neutral-light-2);
    //   font-weight: var(--font-medium);
    //   line-height: 18px;
    //   overflow-wrap: break-word;
  },

  detailsTitle: {
    //   text-align: center;
    //   font-size: var(--font-m);
    //   line-height: 28px;
  },

  detailsStamp: {
    //   display: flex;
    //   align-items: center;
    //   margin-bottom: 20px;
    //   font-size: var(--font-xs);
    //   line-height: 15px;
    //   color: var(--white);
  },

  created: {
    // padding: var(--unit-1) var(--unit-2);
    // border-radius: 50px;
    // border: 1px solid var(--white);
    // background: var(--primary);
  },

  owned: {
    // padding: var(--unit-1) var(--unit-2);
    // border-radius: 50px;
    // border: 1px solid var(--white);
    // background: var(--secondary);
  },

  link: {
    //   display: flex;
    //   align-items: center;
    //   color: var(--secondary);
    //   font-weight: var(--font-demi-bold);
    //   text-decoration: underline !important;
    //   margin-bottom: var(--unit-6);
  },

  chainIcon: {
    //   border: 1px solid var(--neutral-light-7);
    //   border-radius: 50%;
    //   padding: 2px;
    //   margin-left: 8px;
    //   width: 24px;
    //   height: 24px;
  },

  dateWrapper: {
    //   display: flex;
    //   margin: 8px 0;
  },

  dateTitle: {
    //   color: var(--neutral-light-4);
  },

  date: {
    //   margin: 0 8px;
    //   color: var(--neutral-light-2);
  },

  linkIcon: {
    //   width: 16px;
    //   height: 16px;
    //   margin-right: 6px;
  }
})

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
    return collectible
      ? collectible.externalLink.match(/(https*:\/\/)(.+)\//)[2]
      : ''
  }, [collectible])

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} isFullscreen>
      {collectible && (
        <View style={styles.drawer}>
          {/* <CollectibleMedia
          collectible={collectible}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isMobile={isMobile}
        /> */}

          <View style={styles.details}>
            <Text style={styles.detailsTitle}>{collectible.name}</Text>
            <View style={styles.detailsStamp}>
              {collectible.isOwned ? (
                <Text style={styles.owned}>{messages.owned}</Text>
              ) : (
                <Text style={styles.created}>{messages.created}</Text>
              )}

              {collectible.chain === Chain.Eth ? (
                <LogoEth style={styles.chainIcon} />
              ) : (
                <LogoSol style={styles.chainIcon} />
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
                style={styles.link}
                onPress={() => handleLinkPress(collectible.externalLink)}
              >
                <View>
                  <IconLink style={styles.linkIcon} />
                  <Text>{prettyLink}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {collectible.permaLink && (
              <TouchableWithoutFeedback
                style={styles.link}
                onPress={() => handleLinkPress(collectible.permaLink)}
              >
                <View>
                  <IconLink style={styles.linkIcon} />
                  <Text>{messages.linkToCollectible}</Text>
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
