import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native'
import SignupHeader from './SignupHeader'

import IconInstagram from '../../assets/images/iconInstagram.svg'
import IconTwitter from '../../assets/images/iconTwitterBird.svg'
import IconVerified from '../../assets/images/iconVerified.svg'
import GradientSave from '../../assets/images/gradientSave.svg'

const styles = StyleSheet.create({
  container: {
    top: -45,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  containerForm: {
    left: 0,
    width: '100%',
    alignItems: 'center',
    padding: 26
  },
  title: {
    color: '#7E1BCC',
    fontSize: 18,
    fontFamily: 'AvenirNextLTPro-Bold',
    lineHeight: 26,
    textAlign: 'center',
    paddingBottom: 12,
    marginLeft: 22,
    marginRight: 22
  },
  formBtn: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
    height: 50,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#CC0FE0',
    borderRadius: 4
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
    width: 20,
    marginRight: 10
  },
  instruction: {
    color: '#858199',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'center',
    paddingTop: 36,
    paddingBottom: 24,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25
  },
  instructionLong: {
    color: '#858199',
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'center',
    paddingTop: 36,
    paddingBottom: 38,
    width: '100%'
  },
  bulletsContainer: {
    marginLeft: 0,
    paddingLeft: 0,
    paddingBottom: 48
  },
  bulletpointText: {
    color: '#858199',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-Bold'
  },
  verifiedIcon: {
    marginLeft: 8
  },
  ifApplicable: {
    fontSize: 10,
    fontFamily: 'AvenirNextLTPro-regular',
    color: '#C2C0CC',
    marginLeft: 34
  },
  gotoManualBtn: {
    height: 32,
    width: '100%',
    alignItems: 'center'
  },
  gotoManualBtnTitle: {
    color: '#7E1BCC',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-regular'
  }
})

const messages = {
  header: 'Tell Us About Yourself So Others Can Find You',
  description:
    'Quickly complete your profile by linking one of your social accounts.',
  descriptionLong:
    "We will autofill your name, handle, profile picture, cover photo, location, and verification. You won't use this to log-in, and Audius will never post on your behalf.",
  twitter: 'Complete With Twitter',
  instagram: 'Complete With Instagram',
  manually: 'I’d rather fill out my profile manually',
  twitterChecks: [
    'Display Name',
    'Handle',
    'Profile Picture',
    'Cover Photo',
    'Verification'
  ],
  ifApplicable: '(if applicable)'
}

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
      <Text style={styles.title}>{messages.header}</Text>
    </Animated.View>
  )
}

const TwitterBtnTitle = () => {
  return (
    <View style={styles.formButtonTitleContainer}>
      <IconTwitter style={styles.icon} fill={'white'} />
      <Text style={styles.formButtonTitle}> {messages.twitter} </Text>
    </View>
  )
}

const InstagramBtnTitle = () => {
  return (
    <View style={styles.formButtonTitleContainer}>
      <IconInstagram style={styles.icon} fill={'white'} />
      <Text style={styles.formButtonTitle}> {messages.instagram} </Text>
    </View>
  )
}

const BulletPoint = ({ i }: { i: number }) => {
  if (i === 4) {
    return (
      <View style={[styles.formButtonTitleContainer, { marginBottom: 4 }]}>
        <GradientSave style={styles.icon} />
        <Text style={styles.bulletpointText}>{messages.twitterChecks[i]}</Text>
        <IconVerified height={16} width={16} style={styles.verifiedIcon} />
      </View>
    )
  } else {
    return (
      <View style={[styles.formButtonTitleContainer, { marginBottom: 15.6 }]}>
        <GradientSave style={styles.icon} />
        <Text style={styles.bulletpointText}>{messages.twitterChecks[i]}</Text>
      </View>
    )
  }
}

const gotoManualBtnTitle = () => {
  return <Text style={styles.gotoManualBtnTitle}> {messages.manually} </Text>
}

const ProfileAuto = ({
  navigation,
  route
}: {
  navigation: any
  route: any
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <SignupHeader />
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <FormTitle />
          {Dimensions.get('window').height < 670 ? (
            <Text
              style={[
                styles.instruction,
                { paddingLeft: 0, paddingRight: 0, paddingTop: 0 }
              ]}
            >
              {messages.description}
            </Text>
          ) : null}

          <TouchableOpacity
            style={[styles.formBtn, { backgroundColor: '#1BA1F1' }]}
            activeOpacity={0.6}
            onPress={() => {
              console.log(route.params.email)
            }}
          >
            <TwitterBtnTitle />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formBtn}
            activeOpacity={0.6}
            onPress={() => {
              console.log(route.params.email + '-' + route.params.password)
            }}
          >
            <InstagramBtnTitle />
          </TouchableOpacity>

          {Dimensions.get('window').height < 670 ? (
            <Text style={[styles.instructionLong]}>
              {messages.descriptionLong}
            </Text>
          ) : (
            <Text style={styles.instruction}>{messages.description}</Text>
          )}

          {Dimensions.get('window').height > 670 ? (
            <View style={styles.bulletsContainer}>
              {BulletPoint({ i: 0 })}
              {BulletPoint({ i: 1 })}
              {BulletPoint({ i: 2 })}
              {BulletPoint({ i: 3 })}
              {BulletPoint({ i: 4 })}
              <Text style={styles.ifApplicable}>{messages.ifApplicable}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.gotoManualBtn}
            activeOpacity={0.6}
            onPress={() => {
              navigation.push('ProfileManual', {
                email: route.params.email,
                password: route.params.password
              })
            }}
          >
            {gotoManualBtnTitle()}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileAuto
