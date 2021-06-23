import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MeScreen from '../../screens/MeScreen';
import ClientWallet from '../../screens/ClientWallet';
import MyProfileScreen from '../../screens/MyProfileScreen';
import MyStatistics from '../../screens/MyStatistics';
import TopPlayers from '../../screens/TopPlayers';
import Refer from '../../screens/Refer';
import { walletStack } from '../StackNavigators/walletStack';

export const MeStack = createStackNavigator({
    Me: MeScreen,
    navigationOptions: () => { 
      return {
        header: null
      };
    },
    Wallet:{
      screen:walletStack,
      navigationOptions: () => {
        return { 
          header: null,
          
        }
      }
    },
    Profile:{
      screen:MyProfileScreen
    },
    Statistics:{
        screen:MyStatistics
    },
    TopPlayers:{
        screen:TopPlayers
    },
    Refer:{
        screen:Refer
    }
  }
  );
  
  MeStack.navigationOptions = ({navigation}) => {
  
    let tabBarVisible = false;
    if (navigation.state.index === 0) {
      tabBarVisible = true;
    }
    return {
      tabBarVisible,
    };
  };