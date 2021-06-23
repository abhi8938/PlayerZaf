import _ from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight, ScrollView, FlatList } from 'react-native';



class MyStatistics extends Component {
    constructor(props){
        super(props)
       this.state= {
            userMatches: [],
            loading:true,
        }
    
    }
    
    // componentDidMount(){
    //     this.didBlurSubscription = this.props.navigation.addListener(
    //         'willFocus',
    //        async payload => {
    //          this.setState({ loading: true});
    //           const Matches = await getUserMatches();
    //           const usermatches = [];
    //           Matches.forEach(element => {
    //                   usermatches.push(element);
    //           });
    //           this.setState({ userMatches:usermatches, loading:false});
    //         }
    //       );
    // }
    // componentWillUnmount(){
    //   this.didBlurSubscription.remove();
    // }
 
    static navigationOptions = {
        headerTitle: 'My Statistics   ',
        headerStyle: {
            backgroundColor: '#f2784a',
            elevation: 0,
            height: 60,
            margin: 0,
        }
    };

    renderItem = (data) => {
        return (
                  <View>
                      <View></View>
                  </View>
               
                );
             }

    
    render() {
        return (
                <View style={styles.Container}>
                     {/* <FlatList
                         data={this.state.userMatches}
                         renderItem={this.renderItem}
                         keyExtractor={(data) => data._id.toString()}
                     /> */}
                 <Text>Comming Soon</Text>
                </View>
        );
    }
}

export default MyStatistics;

const styles = StyleSheet.create({
    Container: {
        flex:1,
       alignItems:'center',
       justifyContent:'center',
        backgroundColor:'#f2784a'
    },
    text:{
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        color:'#fff'         
    }
});
