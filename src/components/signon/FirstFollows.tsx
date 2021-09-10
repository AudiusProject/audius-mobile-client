import React, { useState, useEffect } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useDispatchWebAction } from '../../hooks/useWebAction'
import SignupHeader from './SignupHeader'
import { FollowArtistsCategory } from '../../store/signon/types'
import { getUserId } from '../../store/signon/selectors'

import IconArrow from '../../assets/images/iconArrow.svg'
import IconWand from '../../assets/images/iconWand.svg'

const styles = StyleSheet.create({
  container: {
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  containerTop: {
    flex: 0,
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    borderBottomWidth: 1,
    borderColor: '#DAD9E0'
  },
  cardsArea: {
    flex: 1,
    backgroundColor: '#F2F2F4',
    width: '100%',
    bottom: 0,
    top: 0,
    paddingBottom: 180
  },
  containerCards: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  containerButton: {
    position: 'absolute',
    left: 0,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 26,
    paddingRight: 26,
    bottom: 0,
    zIndex: 15,
    paddingBottom: 40,
    backgroundColor: 'white'
  },
  title: {
    color: '#7E1BCC',
    fontSize: 18,
    fontFamily: 'AvenirNextLTPro-Bold',
    lineHeight: 26,
    textAlign: 'center'
  },
  formBtn: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 8,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CC0FE0',
    borderRadius: 4,
    paddingRight: 10,
    paddingLeft: 10
  },
  formButtonTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  formButtonTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNextLTPro-Bold'
  },
  icon: {
    height: 20,
    width: 20
  },
  wandBtn: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wandButtonTitle: {
    color: '#858199',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-Regular'
  },
  wandIcon: {
    marginRight: 10
  },
  instruction: {
    color: '#858199',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  pillsContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  animatedPillView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    borderRadius: 8,
    borderColor: '#858199',
    borderWidth: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginLeft: 8,
    lineHeight: 24
  },
  pillActive: {
    borderColor: '#7E1BCC',
    backgroundColor: '#7E1BCC'
  },
  pillText: {
    fontFamily: 'AvenirNextLTPro-Medium',
    textAlign: 'center',
    fontSize: 14,
    color: '#858199'
  },
  pillTextActive: {
    color: 'white'
  },
  followCounter: {
    color: '#858199',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'AvenirNextLTPro-Regular'
  },
  card: {
    width: 140,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#FCFCFC',
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
    shadowColor: '#6A677A40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardName: {
    color: '#858199',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'AvenirNextLTPro-Bold',
    marginBottom: 10,
    paddingHorizontal: 8
  },
  cardFollowers: {
    color: '#858199',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'AvenirNextLTPro-Regular',
    paddingHorizontal: 8
  },
  cardImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#F7F7F9',
    marginBottom: 10
  }
})

const messages = {
  title: 'Follow At Least 3 Artists To Get Started',
  subTitle:
    'Tracks uploaded or reposted by people you follow will appear in your feed.',
  pickForMe: 'Pick Some For Me',
  following: 'Following',
  continue: 'Continue'
}
const MINIMUM_FOLLOWER_COUNT = 3

let didAnimation = false
const FormTitle = () => {
  let opacity = new Animated.Value(1)
  if (!didAnimation) {
    opacity = new Animated.Value(0)
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(({ finished }) => {
      didAnimation = true
    })
  }
  return (
    <Animated.View style={{ opacity }}>
      <Text style={styles.title}>{messages.title}</Text>
    </Animated.View>
  )
}

const FormBtnTitle = () => {
  return (
    <View style={styles.formButtonTitleContainer}>
      <Text style={styles.formButtonTitle}> {messages.continue} </Text>
      <IconArrow style={styles.icon} fill={'white'} />
    </View>
  )
}

const WandBtnTitle = () => {
  return (
    <View style={styles.formButtonTitleContainer}>
      <IconWand
        style={styles.wandIcon}
        fill={'#858199'}
        width={16}
        height={16}
      />
      <Text style={styles.wandButtonTitle}> {messages.pickForMe} </Text>
    </View>
  )
}

const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImage} />
      <Text style={styles.cardName} numberOfLines={1}>
        Abdjsd hgfhfhgfhf
      </Text>
      <Text style={styles.cardFollowers} numberOfLines={1}>
        99,999 Followers
      </Text>
    </View>
  )
}

const FirstFollows = ({
  navigation,
  route
}: {
  navigation: any
  route: any
}) => {
  const [isWorking, setisWorking] = useState(false)
  const [activeFilter, setActiveFilter] = useState(
    FollowArtistsCategory.FEATURED
  )
  const userId = useSelector(getUserId)

  useEffect(() => {
    console.log('Received User ID: ' + userId)
  }, [userId])

  const Pill = ({ category }: { category: FollowArtistsCategory }) => {
    const isActive = activeFilter === category
    const scalePill = new Animated.Value(1)
    const animatePillIn = () => {
      Animated.timing(scalePill, {
        toValue: 0.9,
        duration: 100,
        delay: 0,
        // easing: Easing.in(Easing.bounce),
        useNativeDriver: true
      }).start()
    }
    const animatePillOut = () => {
      Animated.timing(scalePill, {
        toValue: 1,
        duration: 100,
        delay: 0,
        // easing: Easing.in(Easing.bounce),
        useNativeDriver: true
      }).start()
    }
    if (!isActive) {
      return (
        <Animated.View
          style={[
            styles.animatedPillView,
            { transform: [{ scale: scalePill }] }
          ]}
        >
          <TouchableOpacity
            style={styles.pill}
            activeOpacity={1}
            onPressIn={() => {
              animatePillIn()
            }}
            onPressOut={() => {
              animatePillOut()
            }}
            onPress={() => {
              setActiveFilter(category)
            }}
          >
            <Text style={styles.pillText}>{category}</Text>
          </TouchableOpacity>
        </Animated.View>
      )
    } else {
      return (
        <Animated.View
          style={[
            styles.animatedPillView,
            { transform: [{ scale: scalePill }] }
          ]}
        >
          <TouchableOpacity
            style={[styles.pill, styles.pillActive]}
            activeOpacity={1}
            onPressIn={() => {
              animatePillIn()
            }}
            onPressOut={() => {
              animatePillOut()
            }}
          >
            <Text style={[styles.pillText, styles.pillTextActive]}>
              {category}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )
    }
  }

  const dispatchWeb = useDispatchWebAction()
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <SignupHeader />
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerTop}>
              <FormTitle />
              <Text style={styles.instruction}>{messages.subTitle}</Text>

              <View style={styles.pillsContainer}>
                {Pill({ category: FollowArtistsCategory.FEATURED })}
                {Pill({ category: FollowArtistsCategory.ALL_GENRES })}
                {Pill({ category: FollowArtistsCategory.ELECTRONIC })}
                {Pill({ category: FollowArtistsCategory.HIP_HOP_RAP })}
                {Pill({ category: FollowArtistsCategory.ALTERNATIVE })}
                {Pill({ category: FollowArtistsCategory.ROCK })}
              </View>
            </View>
            <View style={styles.cardsArea}>
              <TouchableOpacity
                style={styles.wandBtn}
                activeOpacity={0.6}
                onPress={() => {
                  // ...
                }}
              >
                <WandBtnTitle />
              </TouchableOpacity>
              <View style={styles.containerCards}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.formBtn}
          activeOpacity={0.6}
          onPress={() => {
            if (!isWorking) {
              console.log(
                route.params.email +
                  '|' +
                  route.params.password +
                  '|' +
                  route.params.name +
                  '|' +
                  route.params.handle
              )
              navigation.push('AllowNotifications', {
                email: route.params.email,
                password: route.params.password,
                name: route.params.name,
                handle: route.params.handle
              })
            }
          }}
        >
          <FormBtnTitle />
        </TouchableOpacity>
        <Text style={styles.followCounter}>Following 0/3</Text>
      </View>
    </View>
  )
}

export default FirstFollows
