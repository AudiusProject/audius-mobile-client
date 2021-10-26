import React from 'react'

import { StyleSheet, Text, View } from 'react-native'

import { formatDateWithTimezoneOffset } from 'audius-client/src/common/utils/timeUtil'

import { ThemeColors, useThemedStyles } from '../../utils/theme'

const dateStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
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
    }
  })

export const CollectibleDate = ({
  date,
  label
}: {
  date: string
  label: string
}) => {
  const styles = useThemedStyles(dateStyles)

  return (
    <View style={styles.dateWrapper}>
      <Text style={styles.dateTitle}>{label}</Text>
      <Text style={styles.date}>{formatDateWithTimezoneOffset(date)}</Text>
    </View>
  )
}
