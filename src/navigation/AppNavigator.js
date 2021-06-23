import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthloadingScreen from '../screens/AuthloadingScreen';
import update from './../screens/update';

const AuthStack = createStackNavigator({ 
  
  SignIn: {
    screen: LoginScreen,
    navigationOptions: () => {
      return {
      header: null
    };
  }
  },
  Register: {
    screen: SignUpScreen,
    navigationOptions: () => {
      return {
      header: null
    };
  }
  }
});
AuthStack.navigationOptions = {
  navigationOptions: () => {
    return {
    header: null
  };
} };

  const AppNavigator = createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: { 
    screen: MainTabNavigator,
    navigationOptions: () => {
      return {
        header: null
      };
    }
  },
  Auth: { 
    screen: AuthStack,
    navigationOptions: () => {
      return {
      header: null
    };
  }
   },
  AuthloadingScreen: { 
    screen: AuthloadingScreen,
    navigationOptions:() => {
      return {
        header:null
      };
    }
  },
  updateScreen:{
    screen:update,
    navigationOptions:()=>{
      return{
        header:null
      };
    }
  }
}, {
  initialRouteName: 'AuthloadingScreen'
}
));

export default AppNavigator;
