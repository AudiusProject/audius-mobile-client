import React, {useState, useRef, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from "react-native";
import SignOn from './SignOn';
import CreatePassword from './CreatePassword';
import { getIsSignedIn } from '../../store/lifecycle/selectors'

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
  const [hideSignon, setHideSignOn] = useState(false);

  useEffect(() => {
    if (signedIn) {
      setTimeout (() => {
        setHideSignOn(true)
      }, 500);
    } else {
      setHideSignOn(false)
    }
  }, [signedIn])

  if (hideSignon) {
    return null
  } else {
    return (
      <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignOn"
          screenOptions={{
            animationTypeForReplace: 'push',
            animation: 'fade'
          }}
        >
          <Stack.Screen name="SignOn" component={SignOn} options={{
            headerShown: false,
            animation: 'fade'
          }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{ 
              headerShown: false,
              animation: 'fade'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    );
  }
};

export default SignOnNav;