import React from "react"
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native"

import IconCamera from '../../assets/images/iconCamera.svg'

const styles = StyleSheet.create({
  cameraBtnContainer: {
    position: 'absolute',
    width: 114,
    height: 40,
    zIndex: 5,
    alignSelf: 'center'
  },
  cameraBtn: {
    backgroundColor: '#FCFCFC',
    width: 114,
    height: 40,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 5,
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
  }
});

const messages = { 
  photoBtnAdd: 'Add',
  photoBtnChange: 'Change'
}

var opacityPhotoBtn = new Animated.Value(1)
var lastPhotoBtnIsHiddden = false
const PhotoBtn = ({isWorking, imageSet, photoBtnIsHidden, doAction}: {
  isWorking: boolean,
  imageSet: boolean,
  photoBtnIsHidden: boolean,
  doAction: () => void
}) => {
  var buttonDisabled = false
  var pointerEvents = 'auto'
  if (imageSet) {
    if (lastPhotoBtnIsHiddden != photoBtnIsHidden) {
      lastPhotoBtnIsHiddden = photoBtnIsHidden
      if (!photoBtnIsHidden) {
        buttonDisabled = false
        pointerEvents = 'auto'
        opacityPhotoBtn = new Animated.Value(0)
        Animated.timing(opacityPhotoBtn, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.bounce),
          useNativeDriver: true
        }).start()
      } else {
        buttonDisabled = true
        pointerEvents = 'none'
        opacityPhotoBtn = new Animated.Value(1)
        Animated.timing(opacityPhotoBtn, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.circle),
          useNativeDriver: true
        }).start()
      }
    }
  }else {
    opacityPhotoBtn = new Animated.Value(1)
  }
  if (isWorking) {
    buttonDisabled = true
  }
  return(
  <Animated.View 
    style={[styles.cameraBtnContainer, {
      opacity: opacityPhotoBtn,
      transform: [{
        scale: opacityPhotoBtn.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        })
      }]
    }
  ]}
    pointerEvents={pointerEvents}
    >
    <TouchableOpacity
      style={[styles.cameraBtn,]}
      activeOpacity={0.6}
      disabled={ buttonDisabled }
      onPress={() => {
        doAction()
      }}
      >
        <View style={styles.cameraBtnTitleContainer}>
        <IconCamera
          height={18}
          width={22}
          fill={'#7E1BCC'}
        />
          <Text style={styles.cameraBtnTitle}>{!imageSet ? messages.photoBtnAdd : messages.photoBtnChange } </Text>
        </View>
    </TouchableOpacity>
  </Animated.View>
  )
}

export default PhotoBtn;