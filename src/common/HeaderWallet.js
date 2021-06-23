import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { getWalletBalance } from '../ApiRequests/GetRequest';
import {Spinner} from '../common'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimatedLoader  from 'react-native-animated-loader';
class HeaderWallet extends React.Component {
    
         state={
            Balance:0,
            loading:true,
          }
      
        async componentWillMount() {
            
            this.didBlurSubscription = this.props.navigation.addListener(
                  'willFocus',
                 async payload => {   
                  this.setState({ loading:true});
         const balance = await getWalletBalance();
        if(balance != 0){
             this.setState({ Balance: balance});
           }
           this.setState({ loading:false});
      });
         }
         componentWillUnmount(){
            this.didBlurSubscription.remove();
        }
    render() {
      if(this.state.loading == false){
      return(
            <View style={styles.Container}>
           <View style={styles.HeaderWallet}>
            <TouchableOpacity
            style={{width:wp('10%')}}
            onPress={() => {this.props.navigation.navigate('Me')}}
            >
             <Icon name = 'ios-arrow-round-back'
      color = {'#000'}
      size={40} 
    />
            </TouchableOpacity>
            <Text style={styles.HeaderWalletTitle}>My Wallet  </Text>
            </View>
            <View style={styles.WalletDetails}>
                  <Image 
                  style={styles.logo}
                  source={{uri: 'https://cdn4.iconfinder.com/data/icons/money/512/21-512.png'}}/>
                  <Text style={styles.balance}>₹ {this.state.Balance}   </Text>
            </View>
            </View>
      )}else{
            return(
                  <View style={styles.Container}>
                <Spinner size={'large'}/>
                </View>
            )
          }
}

}

export { HeaderWallet };

const styles = StyleSheet.create({
      lottie: {
            width:wp('25%'),
            height:hp('12%')
          },
      Container:{
            height: hp('30%'),
        backgroundColor:'#f2784a'
      },
       HeaderWallet: { 
             paddingTop: hp('1%'),
             paddingLeft:wp('4%'),
            flexDirection: 'row',
            height:hp('8%')
       },
      HeaderWalletTitle: {
        paddingTop:hp('1%'),
        paddingLeft: wp('6%'),
        fontSize: wp('5.7%'),  
      },
       WalletDetails:{
             height:hp('20%'),
             flex:1,
             flexDirection:'row',
             alignItems: 'center',
             justifyContent: 'center',
            },
      logo:{
            width:wp('29%'),
            height:hp('15%')
      },
      balance:{
         paddingLeft: 15,
         fontSize:wp('10%'),
         fontWeight:'bold'
      }
});
