import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ResultScreen from '../../screens/ResultScreen';
import ResultDetails from '../../screens/ResultDetails';
import OnJoinScreen from '../../screens/OnJoinScreen';
import Icon from "react-native-vector-icons/Ionicons";
import { fromRight } from 'react-navigation-transitions'
const ResultHeader= () =>{
  // alert(this.props.navigation);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>      
     <Text style={styles.headerTitle}>Match Result  </Text>
     </View>

    </View>
  )
}



export const ResultStack = createStackNavigator({
    Result: ResultScreen,
    ResultDetails:{
       screen:ResultDetails,
       navigationOptions:({navigation}) => {
        return{
            header:<ResultHeader navigation={navigation} />
        }
  }
}
},{
  transitionConfig:() => fromRight(500),
  mode:'modal'
});

  ResultStack.navigationOptions = ({navigation}) => {
  
    let tabBarVisible = false;
    if (navigation.state.index == 0) {
      tabBarVisible = true;
    }
    return {
      tabBarVisible,
    };
  };

  const styles = StyleSheet.create({
    headerContainer:{
      backgroundColor:'#f2784a'
    },
    headerTitle:{
      paddingTop:7,
      paddingLeft: 25,
      fontSize: 20,  
    },
    header:{
      paddingTop: 10,
      paddingLeft:15,
      marginTop: 5,
     flexDirection: 'row',
     height:60
    }
  })