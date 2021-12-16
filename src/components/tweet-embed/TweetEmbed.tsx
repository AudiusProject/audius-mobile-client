import React, { useState } from 'react'

import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

import LoadingSpinner from 'app/components/loading-spinner'
import { useThemeColors } from 'app/utils/theme'

const styles = StyleSheet.create({
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300
  }
})

type Props = {
  tweetId: string
  options?: Record<string, any>
}
// TODO: Options

const TweetEmbed = ({ options, tweetId }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [height, setHeight] = useState(0)
  const { neutralLight4 } = useThemeColors()

  const html = `
    <head>
        <meta content="width=width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
    </head>
    <body>
        <div id="embed-container"></div>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"
            onload="
                window.twttr.widgets.createTweet(
                    '${tweetId}',
                    document.getElementById('embed-container')
                ).then(() => window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight))
            "
        ></script>
    </body>
`

  return (
    <>
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <LoadingSpinner color={neutralLight4} />
        </View>
      )}
      <View style={{ width: '100%', height }}>
        <WebView
          onMessage={event => {
            setHeight(parseInt(event.nativeEvent.data, 10))
            setIsLoading(false)
          }}
          scrollEnabled={false}
          source={{
            html
          }}
        />
      </View>
    </>
  )
}

export default TweetEmbed
