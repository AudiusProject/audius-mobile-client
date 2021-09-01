import React, { useState, useRef, useEffect } from "react"
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from "react-native"
import LottieView from 'lottie-react-native'

import HeaderLogo from '../../assets/images/audiusLogoHorizontal.svg'
import IconArrow from '../../assets/images/iconArrow.svg'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  },
  containerForm: {
    left: 0,
    width: '100%',
    zIndex: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 40,
    padding: 38
  },
  title: {
    color: '#7E1BCC',
    fontSize: 18,
    fontFamily: 'AvenirNextLTPro-Bold',
    lineHeight: 26,
    textAlign: 'center',
    paddingTop: 32,
    paddingBottom: 6,
  },
  header: {
    color: '#858199',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 3
  },
  audiusLogoHeader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 8,
    marginBottom: 16
  },

  input: {
    height: 40,
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
    marginTop: 26,
    height: 48,
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
  arrow: {
    height: 20,
    width: 20
  },
  loadingIcon: {
    width: 24,
    height: 24
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginTop: 16,
    width: '100%'
  },
  unchecked: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#858199',
    borderRadius: 12,
    marginRight: 13,
  },
  uncheckedDescription: {
    color: '#858199',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-regular'
  },
  terms: {
    color: '#858199',
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'AvenirNextLTPro-regular',
    textAlign: 'left',
    paddingTop: 26,
    width: '100%'
  }
});

const messages = {
  header: 'Create A Password That Is Secure And Easy To Remember!',
  warning:
    'We can’t reset your password if you forget it. Write it down or use a password manager.',
  checks: [
    'Must contain numbers',
    'Length must be at least 8 characters',
    'Passwords match',
    'Hard to guess'
  ],
  commonPwd: 'Please choose a less common password',
  termsAndPrivacy:
    'By clicking continue, you state you have read and agree to Audius',
  terms: 'Terms of Use',
  and: 'and',
  privacy: 'Privacy Policy.',
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
      <Text style={styles.header}>{messages.warning}</Text>
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

const CreatePassword = () => {

  const [passBorderColor, setPassBorderColor] = useState('#F7F7F9');
  const [passBorderColor2, setPassBorderColor2] = useState('#F7F7F9');

  const [isWorking, setisWorking] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const Checkbox = (label: string) => {
    return (
      <View style={styles.checkboxContainer}>
        <View style={styles.unchecked}></View>
        <Text style={[styles.uncheckedDescription, {alignSelf: 'center'}]}>{label}</Text>
      </View>
    )
  }

  return (
    // SignIn - SignUp
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <HeaderLogo style={styles.audiusLogoHeader} fill='#C2C0CC' />
          <View style={styles.containerForm}>
            <FormTitle></FormTitle>
            <TextInput
              style={[styles.input, { borderColor: passBorderColor }]}
              placeholderTextColor='#C2C0CC'
              underlineColorAndroid='transparent'
              placeholder="Password"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize='none'
              //clearTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              maxLength={100}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(newText) => {
                // setPassword(newText)
              }}
              onFocus={() => { setPassBorderColor('#7E1BCC') }}
              onBlur={() => { setPassBorderColor('#F7F7F9') }}
            />
            <TextInput
              style={[styles.input, { borderColor: passBorderColor2, marginBottom: 10 }]}
              placeholderTextColor='#C2C0CC'
              underlineColorAndroid='transparent'
              placeholder="Confirm Password"
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize='none'
              //clearTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              maxLength={100}
              textContentType="password"
              secureTextEntry={true}
              onChangeText={(newText) => {
                // setPassword(newText)
              }}
              onFocus={() => { setPassBorderColor2('#7E1BCC') }}
              onBlur={() => { setPassBorderColor2('#F7F7F9') }}
            />
            {Checkbox(messages.checks[0])}
            {Checkbox(messages.checks[1])}
            {Checkbox(messages.checks[2])}
            {Checkbox(messages.checks[3])}
            <Text style={styles.terms}>{messages.termsAndPrivacy}
            <Text style={{color:'#CC0FE0'}}> {messages.terms}</Text>
            <Text> {messages.and}</Text>
            <Text style={{color:'#CC0FE0'}}> {messages.privacy}</Text>
            </Text>
            <TouchableOpacity
            style={styles.formBtn}
            disabled={isWorking}
            onPress={() => {
              Keyboard.dismiss()
              if (!isWorking && password!='' && password2!='') {
                // 
              }
            }}
            >
              <MainBtnTitle isWorking={isWorking}></MainBtnTitle>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
};

export default CreatePassword;