import React from 'react';
import { createStackNavigator } from 'react-navigation';
import OngoingScreen from '../../screens/OngoingScreen';
import Icon from "react-native-vector-icons/Ionicons";
export const OnGoingStack = createStackNavigator({
  OnGoing: OngoingScreen,
});

OnGoingStack.navigationOptions = {
  tabBarLabel: 'Ongoing',
  tabBarIcon: ({ tintColor}) => (
    <Icon name = 'ios-timer'
        color = {tintColor} 
        size={24}
      />
    )
};

