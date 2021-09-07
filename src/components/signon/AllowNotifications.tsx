import React from "react"
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from "react-native"
import SignupHeader from "./SignupHeader"

import IconNotifications from '../../assets/images/iconNotification.svg'

const styles = StyleSheet.create({
  container: {
    top: -59,
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
    marginLeft: 22,
    marginRight: 22
  },
  formBtn: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#CC0FE0',
    borderRadius: 4,
  },
  formButtonTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formButtonTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNextLTPro-Bold'
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  instruction: {
    color: '#858199',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'center',
    paddingTop: 24,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  skipBtn: {
    height: 32,
    width: '100%',
    alignItems: 'center'
  },
  skipBtnTitle: {
    color: '#7E1BCC',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-regular',
  }
});

const messages = {
  title: 'Can we send you Notifications?',
  description:
    'We’ll notify you when people follow you, repost your tracks, and more!',
  notice: 'You can customize this later in settings.',
  allow: 'Allow Notifications',
  skip: 'Skip for now'
}

var didAnimation = false
const FormTitle = () => {
  var opacity = new Animated.Value(1);
  if (!didAnimation) {
    opacity = new Animated.Value(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(({ finished }) => {
      didAnimation = true
    });
  }
  return (
    <Animated.View style={{ opacity }}>
      <Text style={styles.title}>{messages.title}</Text>
    </Animated.View>
  )
}

const NotificationBtnTitle = () => {
  return (
    <View style={styles.formButtonTitleContainer}>
      <IconNotifications style={styles.icon} fill={'white'} />
      <Text style={styles.formButtonTitle}> { messages.allow } </Text>
    </View>
  )
}

const skipBtnTitle = () => {
  return (
    <Text style={styles.skipBtnTitle}> {messages.skip} </Text>
  )
}

const AllowNotifications = ({ navigation, route }: { navigation: any, route: any }) => {

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} >
      <SignupHeader></SignupHeader>
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <FormTitle></FormTitle>
            <Text style={styles.instruction}>{messages.description}</Text>
            <Text style={[styles.instruction, {paddingLeft: 0, paddingRight: 0}]}>{messages.notice}</Text>
            <TouchableOpacity
            style={styles.formBtn}
            activeOpacity={0.6}
            onPress={() => {
              // ...
            }}
            >
              <NotificationBtnTitle></NotificationBtnTitle>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipBtn}
              activeOpacity={0.6}
              onPress={() => {
                console.log ( route.params.email + '|' + route.params.password + '|' + route.params.name + '|' +  route.params.handle )
              }}
              >
              {skipBtnTitle()}
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
};

export default AllowNotifications;