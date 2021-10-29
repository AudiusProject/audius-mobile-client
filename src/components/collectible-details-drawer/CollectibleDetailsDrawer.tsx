import React, { useCallback, useMemo } from 'react'

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

import { useDispatchWeb } from '../../hooks/useDispatchWeb'
import { StyleSheet, Text, View } from 'react-native'
import { ThemeColors, useThemedStyles } from '../../hooks/useThemedStyles'

import { CollectibleMedia } from './CollectibleMedia'
import { CollectibleDate } from './CollectibleDate'
import { CollectibleLink } from './CollectibleLink'

const MODAL_NAME = 'CollectibleDetails'

export const messages = {
  owned: 'OWNED',
  created: 'CREATED',
  linkToCollectible: 'Link To Collectible'
}

const createStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    details: {
      marginTop: 24
    },

    detailsDescription: {
      color: themeColors.neutralLight2,
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      fontSize: 12
    },

    badge: {
      color: themeColors.white,
      fontFamily: 'AvenirNextLTPro-Bold',
      textAlign: 'center',
      paddingTop: 4,
      paddingRight: 8,
      paddingBottom: 4,
      paddingLeft: 8,
      borderRadius: 14,
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
      borderRadius: 14,
      padding: 2,
      marginLeft: 8
    }
  })

const CollectibleDetails = () => {
  const dispatchWeb = useDispatchWeb()

  const isOpen = useSelectorWeb(state => getModalVisibility(state, MODAL_NAME))
  const collectible = useSelectorWeb(getCollectible)

  const handleClose = useCallback(() => {
    dispatchWeb(setVisibility({ modal: MODAL_NAME, visible: false }))
  }, [dispatchWeb])

  const formattedLink = useMemo(() => {
    return collectible?.externalLink?.match(/(https*:\/\/)([^\/]+)/)?.[2] ?? ''
  }, [collectible])

  const styles = useThemedStyles(createStyles)

  const ChainLogo = collectible?.chain === Chain.Eth ? LogoEth : LogoSol

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} isFullscreen>
      {collectible && isOpen && (
        <View>
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

              <View style={styles.chainIcon}>
                <ChainLogo height={20} width={20} />
              </View>
            </View>

            {!!collectible.dateCreated && (
              <CollectibleDate
                date={collectible.dateCreated}
                label='Date Created:'
              />
            )}

            {!!collectible.dateLastTransferred && (
              <CollectibleDate
                date={collectible.dateLastTransferred}
                label='Last Transferred:'
              />
            )}

            <Text style={styles.detailsDescription}>
              {collectible.description}
            </Text>

            {!!collectible.externalLink && (
              <CollectibleLink
                url={collectible.externalLink}
                text={formattedLink}
              />
            )}
            {!!collectible.permaLink && (
              <CollectibleLink
                url={collectible.permaLink}
                text={messages.linkToCollectible}
              />
            )}
          </View>
        </View>
      )}
    </Drawer>
  )
}

export default CollectibleDetails