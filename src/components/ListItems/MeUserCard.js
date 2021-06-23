import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class MeUserCard extends Component {
    render() {
  return (
            <View style={styles.Container}>
                <View style={styles.UserCard}>
                <View style={styles.Displaypic}>
                  <Image 
                      source={{uri: 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png'}}
                     style={styles.image}
                  />
                </View>
                <View style={styles.UserData}>
                     <Text style={styles.name}>
                    {this.props.details.firstName} {this.props.details.lastName}    </Text>
                     <Text style={{ marginBottom: 6}}>
                         <Text style={styles.usernameTitle}>
                             Username: 
                             </Text>
                        <Text style={styles.Username}> {this.props.details.userName}    </Text> 
                     </Text>
                     <Text>
                     <Text style={styles.balanceTitle}>Balance: </Text>   
                     <Text style={styles.balance}> ₹ {this.props.details.walletBalance}  </Text>
                     </Text>
                </View>
            </View>
            </View>
        );
    }
}

export default MeUserCard

const styles = {
    Container: {
        height: hp('35%'),
        backgroundColor: '#f2784a',
        margin: 0,
        paddingTop: hp('3%'),
    },
    UserCard: {
        flex: 1,
        flexDirection: 'row',
        height: hp('20%')
    },
    Displaypic: {
        flex: 1,
        paddingTop:hp('4%'),
        paddingLeft:wp('4%'),
        borderRadius:50
    },

    image:{
        width: wp('30%'),
        height: hp('16%'),
       borderRadius:50
    },
    UserData:{
     flex:3,
     alignItems: 'flex-start',
     paddingTop: hp('6%'),
     paddingLeft: wp('13%'),
    },
    Username:{
       fontSize: hp('2.5%'),
       fontWeight: 'bold',
       marginLeft: wp('3%'),
    },
    name:{
      fontSize: hp('2.5%'),
      fontWeight: '500',
      marginBottom: hp('1%'),
    },
    usernameTitle:{
         fontSize: hp('2.5%'),
    },
    balanceTitle:{
        fontSize: hp('2.5%'),
        fontWeight: '400',
    },
    balance:{
        fontSize: hp('2.5%'),
        fontWeight: '500',
    }
};
