import React from 'react';
import {
  Image,
  AsyncStorage,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView  from 'lottie-react-native';
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }
  componentDidMount() {
    this.animation.play();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = () => {
    setTimeout( async()=>{
      const userToken = await AsyncStorage.getItem('userToken');

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
     return this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    },400);
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex:1, padding:0, justifyContent:'center', alignItems:'center', backgroundColor:'#404549'}}>
       <LottieView 
        ref={animation => {
          this.animation = animation;
        }}
        style={styles.lottie} 
        source={require('../assets/svg/goal.json')}
        speed={0.6}
        loop />
        <View style={{ width:wp('100%'), paddingTop:hp('18%'), alignItems:'center'}}>
          <Text style ={{ color:'#ccc', paddingLeft:wp('2.8%'), fontFamily:'Gotham', fontWeight:'500', fontSize:wp('7%')}}>PLAYERZAF <Text style={{ paddingBottom:hp('1%'), fontSize:16}}>©</Text></Text>
        </View>
      </View>
    );
  }
}
const styles =  StyleSheet.create({
  lottie: {
    width:wp('100%'),
    height:hp('40%'),

  },
})
