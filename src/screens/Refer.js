import React, { Component } from 'react';
import { View, StyleSheet, Image, Text,  Share, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getUserCard } from '../ApiRequests/GetRequest';
import { TouchableRipple } from 'react-native-paper';

class Refer extends Component {

state={
  promo:'',
}
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#f2784a',
            elevation: 0,
            height: hp('8%'),
            margin: 0,
        }
    };
    async componentDidMount(){
       
       const client = await getUserCard();
       const userName = client.userName
       this.setState({ promo: userName });
    
    }
    onShare = async () => {
        try {
          const result = await Share.share({
            message:
              `Addicted to PUBG? Want to make some cash out of it?? Try out PlayerZaf, an eSports Platform. Join Daily PUBG Matches & Get Rewards on Each Kill you Score. Get Huge Prize on Getting Chicken Dinner. Just Download the PlayerZaf Android App & Register using the Promo Code given below to Get Rs 5 Free Signup Bonus\n\nDownload Link: https://playerzaf.com\nPromo Code: ${this.state.promo}`,
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log(result);
            } else {
              // shared
              console.log('done');
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log('dismis');
          }
        } catch (error) {
          alert(error.message);
        }
      };
    
    render() {
        return (
            <ScrollView>
                <View style={styles.Container}>
                 <View style={styles.Displaypic}>
                  <Image 
                      source={{uri: 'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png'}}
                     style={{  width: wp('28%'), height: hp('17%')}}
                  />
                </View>
                <View style={styles.referTextContainer}>
                    <Text style={styles.referText}>
                        REFER MORE TO EARN MORE!    
                    </Text>
                </View>
                <View style={styles.inviteTextContainer}>
                    <Text style={styles.inviteText}>
                       Invite your friends on App using your Promo Code to Earn Rs 10
                       when they join first match. Your friends also get Rs 5 as SignUp
                       Bonus!
                    </Text>
                </View>
                </View>
                <View style={styles.bottomContainer}>
                  <Text style={styles.heading}>YOUR PROMO CODE    </Text>
                  <View style={styles.promoCodeContainer}>
                     <Text style={styles.promoCodeText}>{this.state.promo}  </Text>
                  </View>
                  <View style={styles.processContainer}>
                     <Text style={styles.processHeading}>How does it work?    </Text>
                     <Image
                     source={require('../assets/images/refer2.jpg')}
                         style={{ height: hp('21%'), width:wp('96%')}}
                         
                     />
                  </View>
                  <View style={styles.referButtonContainer}>
                   <TouchableRipple                   onPress={this.onShare}
                     style={styles.referButton}
                   >
                  <Text style={styles.referButtonText}>REFER NOW  </Text>
                   </TouchableRipple>
            </View>
          </View>
        </ScrollView>
        );
    }
}

export default Refer;

const styles = StyleSheet.create({
    referButtonText:{
       fontSize:20,
       color:'#fff',
       fontWeight:'400'
    },
    referButton:{
        height:hp('6%'),
        width:wp('90%'),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#f2784a',
        borderRadius:3
    },
    referButtonContainer:{
       height:hp('6%'),
       width:wp('90%'),
       alignItems:'center',
        justifyContent:'center',
    },
    promoCodeContainer:{
      height:hp('7%'),
      width:wp('40%'),
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius: 3,
      borderColor: '#A9A9A9',
      borderStyle:'dashed',
      backgroundColor:'#EC6D4A'
    },
    promoCodeText:{
       fontSize:wp('4.5%'),
       fontWeight:'bold',
       color:'#fff'
    },
    processContainer:{
    paddingBottom:hp('2%'),
    justifyContent:'center',
    alignItems:'center',
    },
    processHeading:{
        color:'#16AD9A',
        fontSize:wp('5%'),
        fontWeight:'400',
        paddingTop:hp('1%'),
        paddingBottom:hp('1%'),
        paddingLeft:wp('4%')
    },
    heading:{
        fontSize:wp('4.5%'),
        fontWeight: 'bold',
        paddingLeft:wp('4%'),
      marginTop:15,
      marginBottom: 15,
    },
    bottomContainer:{
        alignItems: 'center',
    },
    
    Container: {
        backgroundColor:'#f2784a',
        height:hp('37%'),
        alignItems: 'center',
    },
    Displaypic:{
        paddingTop:hp('3%'),
        paddingBottom: hp('1%'),

    },
    referTextContainer:{
    paddingTop:5,
    paddingBottom:8,
    width:wp('78%')
    },
    referText:{
       fontSize:20,
       fontWeight: 'bold',
       color:'#404549'
    },
    inviteText:{
      fontSize: 15,
      textAlign:'center',
      color: '#fff'
    },
    inviteTextContainer:{
      paddingLeft:10,
      paddingRight: 10,
      paddingBottom:10
    }
});
