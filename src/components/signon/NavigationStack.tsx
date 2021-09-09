import React, {useState, useRef, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";
import SignOn from './SignOn';
import CreatePassword from './CreatePassword';
import ProfileAuto from './ProfileAuto';
import ProfileManual from './ProfileManual';
import AllowNotifications from './AllowNotifications';
import FirstFollows from './FirstFollows';
import { getIsSignedIn, getOnSignUp } from '../../store/lifecycle/selectors'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    justifyContent: 'space-evenly'
  }
})

const Stack = createNativeStackNavigator();

const SignOnNav = () => {
  const signedIn = useSelector(getIsSignedIn);
  const onSignUp = useSelector(getOnSignUp);
  const [hideSignon, setHideSignOn] = useState(false);

  useEffect(() => {
    if (signedIn && !onSignUp) {
      setTimeout (() => {
        console.log('signedin')
        setHideSignOn(true)
      }, 500);
    } else {
      setHideSignOn(false)
    }
  }, [signedIn, onSignUp])

  if (hideSignon) {
    return null
  } else {
    return (
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignOn"
          screenOptions={{
            animationTypeForReplace: 'push'
          }}
        >
          <Stack.Screen name="SignOn" component={SignOn} options={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: false
          }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="ProfileAuto"
            component={ProfileAuto}
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="ProfileManual"
            component={ProfileManual}
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="FirstFollows"
            component={FirstFollows}
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="AllowNotifications"
            component={AllowNotifications}
            options={{ 
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    );
  }
};

export default SignOnNav;