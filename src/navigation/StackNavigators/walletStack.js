import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import AddMoney from '../../screens/walletScreen/AddMoney';
import Transactions from '../../screens/walletScreen/Transactions';
import Withdraw from '../../screens/walletScreen/Withdraw';
import { HeaderWallet } from '../../common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const walletTabs = createMaterialTopTabNavigator({
    AddMoney:{
        screen:AddMoney,
        navigationOptions: () =>{
           return {header: null}
        }
    },
    WithDraw:{
        screen:Withdraw,
        navigationOptions: () =>{
            return {header: null}
         }
    },
    Transactions:{
        screen:Transactions,
        navigationOptions: () =>{
            return {header: null}
         }
    }
  
},
{
    initialRouteName: 'WithDraw',
    animationEnabled:false,
    swipeEnabled:false,
     tabBarOptions:{
         style:{ backgroundColor: '#f2784a', elevation: 0 },
         indicatorStyle:{ color: '#fff'},
         labelStyle:{ fontSize: wp('3%'), fontWeight:'500'},
       activeTintColor:'#FFF',
       inactiveTintColor:'#000'
     }
    }
)




export const walletStack = createStackNavigator({
    walletTab:{
        screen:walletTabs,
        navigationOptions:({navigation}) => {
            return{
                header:<HeaderWallet navigation={navigation} />
            }
        }
    }
});
 