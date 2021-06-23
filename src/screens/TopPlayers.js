import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';


class TopPlayers extends Component {
    static navigationOptions = {
        headerTitle: 'Top Players   ',
        headerStyle: {
            backgroundColor: '#7AC5CD',
            elevation: 0,
            height: 60,
            margin: 0,
        }
    };
    render() {
        return (
            <View style={styles.Container}>
            <Text style={styles.text}>  Comming In Next Update   </Text>
           </View>
        );
    }
}

export default TopPlayers;

const styles = StyleSheet.create({
    Container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#7AC5CD'
    },
    text:{
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color:'#fff'         
    }
});
