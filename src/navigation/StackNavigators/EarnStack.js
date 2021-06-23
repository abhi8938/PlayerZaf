import React from 'react';
import { createStackNavigator } from 'react-navigation';
import EarnScreen from '../../screens/EarnScreen';
import Icon from "react-native-vector-icons/Ionicons";
export const EarnStack = createStackNavigator({
  Earn: EarnScreen,
});

EarnStack.navigationOptions = {
  tabBarLabel: 'Earn',
  tabBarIcon: ({ tintColor}) => (
    <Icon name = 'logo-usd'
      color = {tintColor}
      size={24} 
    />
    )
};

