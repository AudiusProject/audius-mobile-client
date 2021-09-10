import React, { useState, useEffect } from 'react'
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
  Platform,
  ActionSheetIOS,
  Alert,
  Image
} from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatchWebAction } from '../../hooks/useWebAction'
import LottieView from 'lottie-react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { MessageType } from '../../message'
import SignupHeader from './SignupHeader'
import PhotoBtn from './PhotoBtn'

import IconArrow from '../../assets/images/iconArrow.svg'
import NoPicture from '../../assets/images/nopicture.svg'
import ValidationIconX from '../../assets/images/iconValidationX.svg'
import { getHandleIsValid, getHandleError } from '../../store/signon/selectors'

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
    alignContent: 'center',
    marginBottom: -12
  },
  profilePicEmpty: {
    flex: 0,
    shadowColor: '#858199',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    width: 226,
    height: 226,
    elevation: 5
  },
  profilePicShadow: {
    marginTop: 8,
    flex: 0,
    shadowColor: '#858199',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    width: 206,
    height: 206,
    marginBottom: 12
  },
  profilePic: {
    flex: 0,
    width: 206,
    height: 206,
    borderRadius: 113,
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  errorText: {
    flex: 1,
    color: '#E03D51',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-regular',
    alignSelf: 'center'
  },
  errorIcon: {
    flex: 1,
    width: 12,
    height: 12,
    marginRight: 10,
    alignSelf: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 10,
    margin: 0
  }
})

const messages = {
  header: 'Tell Us About Yourself So Others Can Find You',
  buttonTitle: 'Continue',
  photoBtnAdd: 'Add',
  photoBtnChange: 'Change',
  errors: [
    'Sorry, handle is too long',
    'Only use A-Z, 0-9, and underscores',
    'That handle has already been taken',
    'This verified Twitter handle is reserved.',
    'This verified Instagram handle is reserved.'
  ],
  errorTypes: [
    'tooLong',
    'characters',
    'inUse',
    'twitterReserved',
    'instagramReserved'
  ]
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

const MainBtnTitle = ({ isWorking }: { isWorking: boolean }) => {
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
        <Text style={styles.formButtonTitle}> {messages.buttonTitle} </Text>
        <IconArrow style={styles.arrow} fill={'white'} />
      </View>
    )
  }
}

const ProfileManual = ({
  navigation,
  route
}: {
  navigation: any
  route: any
}) => {
  const [isWorking, setisWorking] = useState(false)
  const username = route.params.email
  const password = route.params.password
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [nameBorderColor, setNameBorderColor] = useState('#F7F7F9')
  const [handleBorderColor, setHandleBorderColor] = useState('#F7F7F9')
  const [photoBtnIsHidden, setPhotoBtnIsHidden] = useState(false)
  const handleIsValid = useSelector(getHandleIsValid)
  const handleError = useSelector(getHandleError)
  const [profileImage, setProfileImage] = useState({
    height: 0,
    width: 0,
    name: '',
    size: 0,
    fileType: '',
    uri: '',
    file: ''
  })
  const [imageSet, setImageSet] = useState(false)

  useEffect(() => {
    if (profileImage.file !== '') {
      setPhotoBtnIsHidden(true)
    } else {
      setPhotoBtnIsHidden(false)
    }
  }, [profileImage])

  const ProfileImage = () => {
    if (!imageSet) {
      return (
        <NoPicture height={226} width={226} style={styles.profilePicEmpty} />
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.profilePicShadow}
          activeOpacity={1}
          onPress={() => {
            setPhotoBtnIsHidden(!photoBtnIsHidden)
          }}
        >
          <Image
            source={profileImage}
            height={206}
            width={206}
            style={[styles.profilePic]}
          />
        </TouchableOpacity>
      )
    }
  }

  const selectPhotoFromLibrary = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: 'photo',
        quality: 0.9,
        selectionLimit: 1
      },
      ({ assets }) => {
        const response = assets?.[0]
        if (response?.base64) {
          const image = {
            height: response.height ?? 0,
            width: response.width ?? 0,
            name: response.fileName ?? response.uri?.split('/').pop() ?? '',
            size: response.fileSize ?? 0,
            fileType: response.type ?? '',
            uri: response.uri ?? '',
            file: `data:${response.type};base64,${response.base64}`
          }
          console.log(response.type)
          setProfileImage(image)
          setImageSet(true)
        }
      }
    )
  }

  const takePhoto = () => {
    launchCamera(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: 'photo',
        quality: 0.9,
        saveToPhotos: true
      },
      ({ assets }) => {
        const response = assets?.[0]
        if (response?.base64) {
          const image = {
            height: response.height ?? 0,
            width: response.width ?? 0,
            name: response.fileName ?? response.uri?.split('/').pop() ?? '',
            size: response.fileSize ?? 0,
            fileType: response.type ?? '',
            uri: response.uri ?? '',
            file: `data:${response.type};base64,${response.base64}`
          }
          setProfileImage(image)
          setImageSet(true)
        }
      }
    )
  }

  const PhotoMenu = () => {
    if (Platform.OS === 'ios') {
      // iOS ActionSheet
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Photo Library', 'Take Photo'],
          tintColor: '#7E1BCC',
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            selectPhotoFromLibrary()
          } else if (buttonIndex === 2) {
            takePhoto()
          }
        }
      )
    } else {
      // Android Alert
      Alert.alert(
        'Profile Photo',
        '',
        [
          {
            text: 'Photo Library',
            style: 'default',
            onPress: () => selectPhotoFromLibrary()
          },
          {
            text: 'Take Photo',
            style: 'default',
            onPress: () => takePhoto()
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ],
        {
          cancelable: true,
          onDismiss: () => null
        }
      )
    }
  }

  const dispatchWeb = useDispatchWebAction()

  const validateHandle = (handle: string) => {
    dispatchWeb({
      type: MessageType.SIGN_UP_VALIDATE_HANDLE,
      handle: handle,
      isAction: true,
      onValidate: null
    })
  }

  const signUp = () => {
    if (username !== '' && password !== '' && name !== '' && handle !== '') {
      dispatchWeb({
        type: MessageType.SUBMIT_SIGNUP,
        username: username,
        password: password,
        name: name,
        handle: handle,
        profileImage: profileImage,
        isAction: true
      })
    }
  }

  const errorView = ({
    handleIsValid,
    handleError
  }: {
    handleIsValid: boolean
    handleError: string
  }) => {
    if (!handleIsValid && handleError !== '') {
      return (
        <View style={styles.errorContainer}>
          <ValidationIconX style={styles.errorIcon} />
          <Text style={styles.errorText}>
            {' '}
            {messages.errors[messages.errorTypes.indexOf(handleError)]}{' '}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.errorContainer}>
          <ValidationIconX style={[styles.errorIcon, { opacity: 0 }]} />
          <Text style={styles.errorText}> </Text>
        </View>
      )
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SignupHeader />
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.containerForm}>
              <FormTitle />
              <View style={styles.profilePicContainer}>
                {ProfileImage()}
                {PhotoBtn({
                  isWorking: isWorking,
                  imageSet: imageSet,
                  photoBtnIsHidden: photoBtnIsHidden,
                  doAction: PhotoMenu
                })}
              </View>
              <TextInput
                style={[styles.input, { borderColor: nameBorderColor }]}
                placeholderTextColor='#C2C0CC'
                underlineColorAndroid='transparent'
                placeholder='Display Name'
                keyboardType='default'
                autoCompleteType='off'
                autoCorrect={false}
                autoCapitalize='words'
                enablesReturnKeyAutomatically={true}
                maxLength={32}
                textContentType='name'
                onChangeText={newText => {
                  setName(newText.trim())
                }}
                onFocus={() => {
                  setNameBorderColor('#7E1BCC')
                }}
                onBlur={() => {
                  setNameBorderColor('#F7F7F9')
                }}
              />

              <TextInput
                style={[styles.input, { borderColor: handleBorderColor }]}
                placeholderTextColor='#C2C0CC'
                underlineColorAndroid='transparent'
                placeholder='@handle'
                keyboardType='email-address'
                autoCompleteType='off'
                autoCorrect={false}
                autoCapitalize='none'
                enablesReturnKeyAutomatically={true}
                maxLength={16}
                textContentType='nickname'
                onChangeText={newText => {
                  if (newText.length && newText[0] === '@') {
                    newText = newText.substring(1)
                  }
                  // let newHandle = newText.replace('@', '')
                  setHandle(newText.trim())
                  validateHandle(newText.trim())
                }}
                onFocus={() => {
                  setHandleBorderColor('#7E1BCC')
                }}
                onBlur={() => {
                  setHandleBorderColor('#F7F7F9')
                }}
              />
              {errorView({ handleIsValid, handleError })}

              <TouchableOpacity
                style={styles.formBtn}
                activeOpacity={0.6}
                disabled={isWorking}
                onPress={() => {
                  Keyboard.dismiss()
                  if (!isWorking && handleIsValid && name !== '') {
                    console.log(
                      username + '|' + password + '|' + name + '|' + handle
                    )
                    setisWorking(true)
                    signUp()
                    navigation.push('FirstFollows', {
                      email: username,
                      password: password,
                      name: name,
                      handle: handle,
                      profileImage: profileImage
                    })
                  }
                }}
              >
                <MainBtnTitle isWorking={isWorking} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ProfileManual
