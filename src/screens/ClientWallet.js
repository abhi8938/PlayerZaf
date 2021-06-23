import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';



class ClientWallet extends Component {
    static navigationOptions = {
        headerTitle: 'My Wallet    ',
        headerStyle: {
            backgroundColor: '#7AC5CD',
            color: '#FFFFFF',
            elevation: 0,
            height: 60,
            margin: 0,
        }
    };
    
     state = {
        index: 0,
        routes: [
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },
        ],
      };
     
 
    render() {
        return (
            <View>
                <View style={styles.Container}>
                    {/* <View style={styles.upperPart}>
                        <View style={styles.walletLogo}>
                            <Image
                                style={styles.logo}
                            />
                        </View>
                        <View style={styles.walletBalanceContainer}>
                            <Text style={styles.balance}>₹ 0</Text>
                        </View>
                    </View> */}
                    
                </View>
            </View>
        );
    }
}

export default ClientWallet;

const styles = StyleSheet.create({

    Container: {
        // height: 200,
        // backgroundColor: '#7AC5CD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    upperPart: {

    },
    balance: {
        fontSize: 38,
        color: '#FFFFFF',
        fontWeight: 'bold',
    }
});
