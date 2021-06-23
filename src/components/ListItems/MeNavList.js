import React, { Component } from 'react';
import { View, Image, Text,  AsyncStorage, Linking, Share } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../common';
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableRipple } from 'react-native-paper';

class MeNavList extends Component {
    signOutAsync = async () => {
        await AsyncStorage.clear();
       this.props.navigation.navigate('Auth');
      };
      onShare = async () => {
        try {
          const result = await Share.share({
            message:
            'Do you know you can win Free Paytm Cash by Playing PUBG?\n\nYes, now get paid for every Kill. Not only this, if you get Chicken Dinner, you really win Big Prizes.\n\nJust Download & Try PlayerZaf App: https://playerzaf.com'
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    render() {
        const { details } = this.props;
        return (
            <View style={styles.MeNavList}>
             <Card>
                <TouchableRipple rippleColor="rgba(0,0,0,.5)" onPress={() => this.props.navigation.navigate('Refer')}>           
                   
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'ios-person-add'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Refer & Earn  </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple rippleColor="rgba(0,0,0,.5)" onPress={() => this.props.navigation.navigate('Profile', { details })}>
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'ios-contact'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>My Profile   </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple
                    rippleColor="rgba(0,0,0,.5)"
                    onPress={() => this.props.navigation.navigate('Wallet')}
                    >
                   
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-wallet'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>My Wallet   </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple 
                    rippleColor="rgba(0,0,0,.5)"                  
                      onPress={() => this.props.navigation.navigate('Statistics')}
                      >
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-stats'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>My Statistics  </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple
                    rippleColor="rgba(0,0,0,.5)"
                    onPress={() => this.props.navigation.navigate('TopPlayers')}
                    >
              
              
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-trophy'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Top Players  </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple
                    rippleColor="rgba(0,0,0,.5)"
                      onPress={()=>{ Linking.openURL('http://playerzaf.com/contact-us.php')}}
                    >
                   
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'ios-navigate'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Important Updates    </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple
                    rippleColor="rgba(0,0,0,.5)"
                      onPress={()=>{ Linking.openURL('http://playerzaf.com/about-us.php')}}
                    >
                  
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'ios-information-circle'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                       <View style={styles.NavItemName}>
                                <Text style={styles.text}>About Us  </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>

                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple
                    rippleColor="rgba(0,0,0,.5)"
                    onPress={()=>{ Linking.openURL('http://playerzaf.com/contact-us.php')}}
                     >
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-headset'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Customer Support    </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>   
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple rippleColor="rgba(0,0,0,.5)"
                    onPress={this.onShare} >
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-share'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Share App </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
                <Card>
                <TouchableRipple rippleColor="rgba(0,0,0,.5)" onPress={this.signOutAsync} >
                   
                        <View style={styles.NavListItem}>
                            <View style={styles.NavItemIcon}>
                            <Icon name = 'md-power'
                                  color = {'#f2784a'}
                                  size={22} 
                                />
                            </View>
                            <View style={styles.NavItemName}>
                                <Text style={styles.text}>Logout </Text>
                            </View>
                            <View style={styles.NavItemArrow}>
                                <Image
                                    source={require('../../assets/images/arrowRight.png')}
                                    style={styles.arrow}
                                />
                            </View>
                        </View>
                </TouchableRipple>
                </Card>
            </View>
        );
    }

}

export default MeNavList;

const styles = {
    MeNavList: {
        marginLeft: wp('3%'),
        marginRight: wp('3%'),
        marginTop: hp('3%'),
        marginBottom: hp('4%'),
    },
    NavListItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    NavItemIcon: {
        flex: 1,
        height: hp('5%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: wp('3%'),
        margin: 0,
    },
    NavItemName: {
        flex: 2,
        height: hp('7%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft:wp('-15%'),
    },
    NavItemArrow: {
        flex: 1,
        height: hp('6%'),
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: wp('2%'),
    },
    image: {
        height: wp('3%'),
        width: hp('3%')
    },
    arrow: {
        height: 22,
        width: 22
    },
    text: {
        fontSize: hp('2.5%'),
        color: '#696969',
        fontWeight: '600'
    }

};
