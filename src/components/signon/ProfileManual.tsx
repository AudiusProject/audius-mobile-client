import React, { useState, useEffect } from "react"
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native"
import LottieView from 'lottie-react-native'
import SignupHeader from "./SignupHeader"

import IconArrow from '../../assets/images/iconArrow.svg'
import IconCamera from '../../assets/images/iconCamera.svg'
import NoPicture from '../../assets/images/nopicture.svg'

const styles = StyleSheet.create({
  container: {
    top: -67,
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
  input: {
    height: 42,
    width: '100%',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#F7F7F9',
    backgroundColor: '#FCFCFC',
    borderRadius: 4,
    padding: 10,
    color: '#858199',
    fontFamily: 'AvenirNextLTPro-regular',
    fontSize: 16
  },
  formBtn: {
    flexDirection: 'row',
    marginTop: 16,
    height: 50,
    width: '100%',
    alignItems: 'center',
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
  arrow: {
    height: 20,
    width: 20
  },
  loadingIcon: {
    width: 24,
    height: 24
  },
  profilePicContainer: {
    flex: 0,
    alignContent: 'center'
  },
  profilePic:{
    flex: 0,
    shadowColor: '#858199',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,  
    elevation: 5
  },
  cameraBtn: {
    position: 'absolute',
    backgroundColor: '#FCFCFC',
    width: 114,
    height: 40,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 0,  
    elevation: 5,
    zIndex: 5,
    alignSelf: 'center',
    marginTop: 137,
    textAlign: 'center'
  },
  cameraBtnTitleContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cameraBtnTitle: {
    color: '#7E1BCC',
    fontSize: 16,
    fontFamily: 'AvenirNextLTPro-Medium',
    marginLeft: 11
  },
});

const messages = { 
  header: 'Tell Us About Yourself So Others Can Find You',
  buttonTitle: 'Continue'
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
      <Text style={styles.title}>{messages.header}</Text>
    </Animated.View>
  )
}

const MainBtnTitle = ({isWorking}: {isWorking: boolean}) => {
  if (isWorking) {
    return (
      <View style={styles.loadingIcon}>
        <LottieView
          source={require('../../assets/animations/loadingSpinner.json')}
          autoPlay
          loop
        />
      </View>
    )
  } else {
    return (
      <View style={styles.formButtonTitleContainer}>
        <Text style={styles.formButtonTitle}> { messages.buttonTitle } </Text>
        <IconArrow style={styles.arrow} fill='white' />
      </View>
    )
  }
}

const ProfileImage = () => {
  return(
  <NoPicture
    height={226}
    width={226}
    style={styles.profilePic}
  />
  )
}

const ProfileManual = ({ navigation, route }: { navigation: any, route: any }) => {

  const [isWorking, setisWorking] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [nameBorderColor, setNameBorderColor] = useState('#F7F7F9');
  const [handleBorderColor, setHandleBorderColor] = useState('#F7F7F9');

  const AddPhotoBtn = () => {
    return(
    <TouchableOpacity
      style={styles.cameraBtn}
      disabled={isWorking}
      onPress={() => {
      }}
      >
        <View style={styles.cameraBtnTitleContainer}>
        <IconCamera
          height={18}
          width={22}
          fill={'#7E1BCC'}
        />
          <Text style={styles.cameraBtnTitle}> Add </Text>
        </View>
    </TouchableOpacity>
    )
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'height' : 'height'}>
    <SignupHeader></SignupHeader>
    <SafeAreaView style={{ backgroundColor: 'white' }} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.containerForm}>
            <FormTitle></FormTitle>
            <View style={styles.profilePicContainer}>
              {ProfileImage()}
              {AddPhotoBtn()}
            </View>
            <TextInput
              style={[styles.input, {borderColor: nameBorderColor}]}
              placeholderTextColor= '#C2C0CC'
              underlineColorAndroid='transparent'
              placeholder='Display Name'
              keyboardType='default'
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize='words'
              enablesReturnKeyAutomatically={true}
              maxLength={100}
              textContentType='name'
              onChangeText={(newText) => {
                setName(newText.trim())
                // if (showInvalidEmailError) {
                //   setShowInvalidEmailError(false)
                // }
              }}
              onFocus={() => {setNameBorderColor('#7E1BCC')}}
              onBlur={() => {setNameBorderColor('#F7F7F9')}}
              />

            <TextInput
              style={[styles.input, {borderColor: handleBorderColor}]}
              placeholderTextColor= '#C2C0CC'
              underlineColorAndroid='transparent'
              placeholder='@handle'
              keyboardType='email-address'
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize='none'
              enablesReturnKeyAutomatically={true}
              maxLength={100}
              textContentType='nickname'
              onChangeText={(newText) => {
                setHandle(newText.trim())
                // if (showInvalidEmailError) {
                //   setShowInvalidEmailError(false)
                // }
              }}
              onFocus={() => {setHandleBorderColor('#7E1BCC')}}
              onBlur={() => {setHandleBorderColor('#F7F7F9')}}
              />

            <TouchableOpacity
            style={styles.formBtn}
            disabled={isWorking}
            onPress={() => {
              Keyboard.dismiss()
              if (!isWorking) {
                console.log(route.params.email + ' ' + route.params.password)
                navigation.push('AllowNotifications', { email: route.params.email, password: route.params.password, name: name, handle: handle })
              }
            }}
            >
              <MainBtnTitle isWorking={isWorking}></MainBtnTitle>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

export default ProfileManual;