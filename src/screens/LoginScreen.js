import React from 'react';
import { 
    StyleSheet, 
    View,
    Image, 
    Text, 
    TextInput,    
     AsyncStorage,
     Alert, 
    TouchableOpacity,
    Modal,
    BackHandler 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createUserToken, sendResetRequest } from '../ApiRequests/PostRequests';
import { Card, Spinner } from '../common';
import { getUserCard } from '../ApiRequests/GetRequest';
import AlertModal from '../components/AlertModal';
import AnimatedLoader from 'react-native-animated-loader';
import { TextField } from 'react-native-material-textfield';
import { Modal1 } from '../components/modal1';
export default class LoginScreen extends React.Component {
    state = {
        emailAddress: '',
        email:'',
        modalVisible: false,
        password: '',
        loading: false,
        showResponse:false,
        error:false,
        response:''
    } 
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
  
    handleBackPress = () => {
      BackHandler.exitApp(); // works best when the goBack is async
      return true;
    }
  
    signInAsync= async () =>{
        this.setState({ loading: true});
      const Token = await createUserToken(this.state.emailAddress, this.state.password);
           if(Token.status == 400){
            this.setState({ loading: false, showResponse:true, response:Token.data, error:true});
           }else if( Token.status == 200){
             this.setState({ loading: false, showResponse:false, response:'welcome To PlayerZaf', error:false });
            //  Alert.alert(Token.data)
          await AsyncStorage.setItem('userToken', Token.data);
          const user = await getUserCard();
          if(user.update == true){
          this.props.navigation.navigate('updateScreen');
          }else if(user.update == false) {
          this.props.navigation.navigate('Main');
          }
           } else {
            this.setState({ loading: false, showResponse:true, response:'Something Went Wrong', error:true});
           }
       
      }

      renderButton(){
            return (
                   <TouchableOpacity
                     onPress={this.signInAsync}
                     style={styles.touchable}>
                        <Text style={styles.buttonText}>SIGN IN  </Text>
                   </TouchableOpacity>
       )
    }
    resetRequest = async () =>{
      this.setState({ loading: true});
      const resetStatus = await sendResetRequest(this.state.email);
      Alert.alert(resetStatus);
      this.setState({ modalVisible: false});
      this.setState({ loading:false});
     }
     
   renderModal() {
     
     if(this.state.showResponse){
       return (
         <AlertModal 
          visible={this.state.showResponse}
             onRequestClose={() =>{
                this.setState({ showResponse:false})
                }}
                onPress={() => {
                this.setState({ showResponse:false});
            }}
            error={this.state.error}
            response={this.state.response}
                />
       );
     }
   }


  render() {
    return (
        <View style={styles.container}>
            <View>
            <View style={styles.pageHeadingContainer}>
            <Text style={styles.pageHeading}>SIGN IN  </Text>
            </View>
            <Card>
            <View style={styles.UserLogo}>
                <Image
                   style={styles.logo}
                   source={{uri: 'https://library.kissclipart.com/20180904/hlw/kissclipart-female-user-icon-flat-clipart-computer-icons-avata-cc54cb11d400df36.jpg'}}
                />
            </View>
                <View style={styles.cardContainer}>
                <View style={styles.emailAddressContainer}>
                <TextField
                    label='Email'
                    fontSize={wp('5%')}
                    value={this.state.emailAddress}
                    textColor='#404549'
                    baseColor='#404549'
                    tintColor='#70ae95'
                    onChangeText={ (emailAddress) => this.setState({ emailAddress }) }
                  
                    />
             
               </View>
               <View style={styles.passwordContainer}>
               <TextField
                    label='Password'
                    fontSize={wp('5%')}
                    value={this.state.password}
                    textColor='#404549'
                    baseColor='#404549'
                    tintColor='#70ae95'
                    onChangeText={ (password) => this.setState({ password }) }
                   
                    />
               </View>
               <View style={styles.signInButton}>
                  {this.renderButton()}
               </View>
               <View style={styles.forgotsection}>
               <TouchableOpacity
                onPress={() =>{this.setState({ modalVisible:true});}}
               >
                   <Text>
                       <Text style={styles.forgotPassword}>Forgot Password?  </Text>
                       <Text style={styles.resetnow}>Reset Now  </Text>
                   </Text>
                   </TouchableOpacity>
               </View>
               </View>
            </Card>
            </View>
        <View style={styles.registerButtonSection}>
                   <TouchableOpacity
                   onPress={() => { this.props.navigation.navigate('Register')}}
                     style={styles.registerButton}
                   >
                  <Text style={styles.registeButtonText}>CREATE NEW ACCOUNT  </Text>
                   </TouchableOpacity>
        </View>
        <AnimatedLoader
             visible={this.state.loading}
             overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../assets/svg/animate2.json')}
              />
          {this.renderModal()}    
          <Modal1
              placeholder={'email'}
              Title={'Please Input your Registered Email Id'}
              visible={this.state.modalVisible}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              onPressC={() => {
              this.setState({ modalVisible:false});
              }}
              onPressV={() => this.resetRequest()} 
       >Reset</Modal1>  
        </View>
    );
  }
}

const styles = StyleSheet.create({
    modalView:{
        height:hp('29%'),
        width: wp('90%'),
        marginLeft:wp('5%'),
        marginTop: hp('30%'),
        borderRadius:3,
        elevation: 5,
        backgroundColor:'#fff',
        alignItems: 'center', 
        justifyContent:'center'
      },
      modalHeading:{
         fontSize: hp('3%'),
         fontWeight: 'bold',
         paddingBottom: hp('1%'),
      },
      lottie: {
        width:wp('25%'),
        height:hp('12%')
      },
      Input:{
        fontSize:hp('2.5%'),
        color:'#404549',
        borderBottomColor:'#A9A9A9',
        borderBottomWidth: 1.5,
        paddingBottom:4,
        paddingLeft:2,
        lineHeight:20
      },
      inputUser:{
         width: wp('80%'),
         paddingTop: hp('3%'),
         paddingBottom: hp('3%'),  
      },
    joinButton: {
      flex:1,
      height: hp('5%'),
      backgroundColor: '#23283B',
      borderWidth: 1,
      borderColor: '#23283B',
      justifyContent: 'center',
      borderRadius: 2,
      alignItems: 'center',
      margin: 5
  },
  cancelButton:{
     flex: 1,
     height: hp('5%'),
     backgroundColor: '#d3d3d3',
     borderWidth: 1,
     borderColor: '#d3d3d3',
     justifyContent: 'center',
     borderRadius: 2,
     alignItems: 'center',
     margin: 5,

  },
  ButtonText: {
      fontWeight: '800',
      color: '#fff'
  },
  buttonModelContainer:{
    flex: 1,
    flexDirection: 'row',
    width:wp('80%'),
    paddingBottom: hp('3%'),
  },
  container: {
    flex: 1,
    justifyContent:'space-between',
    paddingTop: hp('3%'),
    
    backgroundColor: '#f2784a',
  },
  cardContainer:{
       paddingTop:hp('3%'),
       paddingBottom:hp('3%')
  },
  pageHeading:{
      fontSize: hp('4%'),
      color: '#404549',
      fontWeight: '800',

  },
  pageHeadingContainer:{
      marginTop: hp('2%'),
      paddingTop: hp('3%'),
      alignItems: 'center',
      marginBottom:hp('12%')
  },
  UserLogo:{
    alignItems: 'center',
    marginTop: -45,
  },
  logo:{
    width: wp('25%'),
    height: hp('15%'),
      borderColor: '#f2784a',
      borderWidth: 3,
      borderRadius: 50,
  },
  emailAddressContainer:{
      height:hp('5%'),
      paddingLeft: 30,
      paddingRight: 30,
      marginBottom:hp('4%')
  },
  passwordContainer:{
    height: 50,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: hp('5%'),
},
touchable:{
    alignItems:'center',
    backgroundColor:'#EC6D4A',
    marginLeft: 30,
    marginRight: 30,
    height: hp('6%'),
    justifyContent:'center',
    borderRadius:3,
   
},
signInButton:{
  marginBottom:10,
  elevation: 2,
},
buttonText:{
    fontSize: 16,
    fontWeight:'500',
},
Input:{
    fontSize:18,
    color:'#404549',
    borderBottomColor:'#A9A9A9',
    borderBottomWidth: 1.5,
    paddingBottom:4,
    paddingLeft:2,
    lineHeight:20
},
forgotPassword:{
    fontSize:12,
    color:'#404549'
},
resetnow:{
   fontSize: 12,
   fontWeight:'bold',
   color:'#404549'
},
forgotsection:{
    alignItems:'flex-end',
    marginRight:30
},
registerButtonSection:{
    backgroundColor: '#324e51',
},
registerButton:{
    alignItems:'center',
    height:45,
    justifyContent:'center',
   
},
registeButtonText:{
    fontSize:16,
    fontWeight: '500',
    color:'#fff'
}
});
