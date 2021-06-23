import React from 'react';
import {
  createAppContainer,
} from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";
import {
  MeStack
} from './StackNavigators/MeStack';
import {
  PlayStack
} from './StackNavigators/PlayStack'
import {
  ResultStack
} from './StackNavigators/ResultStack';
import {
  OnGoingStack
} from './StackNavigators/onGoingStack';
import {
  EarnStack
} from './StackNavigators/EarnStack';

export default createAppContainer(createMaterialBottomTabNavigator({
  EarnScreen: {
    screen: EarnStack
  },
  OngoingScreen: {
    screen: OnGoingStack
  },
  PlayScreen: {
    screen: PlayStack,
    navigationOptions: {
      tabBarLabel: 'Play',
      tabBarIcon: ({
        tintColor
      }) => ( 
      <Icon name = 'logo-game-controller-b'
        color = {tintColor}
        size = {24} 
      />
      )
    }
  },
  ResultScreen: {
    screen: ResultStack,
    navigationOptions: {
      tabBarLabel: 'Result',
      tabBarIcon: ({
        tintColor
      }) => ( 
       <Icon name = 'ios-document'
      color = {tintColor}
      size = {24}  
    />
      )
    }
  },
  MeScreen: {
    screen: MeStack,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({
        tintColor
      }) => (  
        <Icon name = 'ios-happy'
      color = {tintColor}
      size = {24}   
    />
      )
    }
  }
}, {
  initialRouteName: 'PlayScreen',
  transitionConfig:() => fromRight(500),

  shifting:false,
  barStyle: {
    backgroundColor:'#f2784a',
    elevation: 0
  },
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'grey',
  }
}));