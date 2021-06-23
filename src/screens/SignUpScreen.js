import React from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight, Modal, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import{ TextField1} from '../common';
import { Card, Spinner } from '../common';
import { CreateUser, sendOtp } from '../ApiRequests/PostRequests';
import KeyboardShift from './../KeyboardShift';
import AnimatedLoader  from 'react-native-animated-loader';
import AlertModal from '../components/AlertModal';
import { Modal1 } from '../components/modal1';
export default class SignUpScreen extends React.Component {

    
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        emailAddress: '',
        mobileNumber: '',
        password: '',
        promoCode: '',
        error:false,
        showResponse:'',
        response:'',
        loading: false,
        otp1:'',
        otp2:'',
        verified:false,
        modalVisible:false

    } 
    verify = () => {
        if(this.state.otp1 == this.state.otp2){
          return this.setState({ verified:true, 
                  modalVisible:false, 
                  loading: false,
                  showResponse:true, 
                  response:'Mobile Number Verified', error:false});
        }else{
          return alert('Wrong Otp');
        }
    }   
    verifyMobile = async () =>{
        if(this.state.mobileNumber.length < 10){
            return this.setState({ loading: false, showResponse:true, response:'Invalid Mobile Number', error:true});
        }    
            this.setState({loading:true, otp1:`${Math.floor(1000 + Math.random() * 9000)}`},async ()=>{
               const res = await sendOtp(this.state.mobileNumber,this.state.otp1);
                if(res.status == 200){
                  return this.setState({ loading:false, modalVisible:true});
                }else{
                   return this.setState({loading: false, showResponse:true, response:'OTP sent failiure! Retry', error:true});
                }
        })
    }
    PostUser = async () =>{
        if(this.state.verified == true){
        this.setState({ loading: true});
  const response = await CreateUser(
          this.state.firstName,
          this.state.lastName,
          this.state.userName,
          this.state.emailAddress,
          this.state.mobileNumber,
          this.state.password,
      );
      console.log(response);
if(response == 'Success'){
  this.setState({ loading: false, showResponse:true, response:'REGISTRATION SUCCESSFUL', error:false});
  this.props.navigation.navigate('SignIn');
}
else if( response != 'Success'){
    console.log(response.data);
    this.setState({ loading: false, showResponse:true, response:response.data, error:true});
}
}else{
    return this.setState({ loading: false, showResponse:true, response:'Mobile Number Not Verified', error:true});
}
    }

    renderButton(){
       return(
        <TouchableOpacity
        onPress={this.PostUser}
        style={styles.touchable}>
            <Text style={styles.signInText}>Register </Text>
        </TouchableOpacity>
       )

    }
    renderVerifyText(){
        if(this.state.verified == false){
           return <Text style={{ fontSize:wp('4.5%'), color:'#f2784a', fontWeight:'500'}}>Verify</Text>
        }else{
            return <Text style={{ fontSize:wp('4.5%'), color:'#1EC100', fontWeight:'500'}}>Verified</Text>
        }
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
            <KeyboardShift>
            {() => ( 
            <View style={styles.container}>
          
                <View style={styles.pageHeadingContainer}>
                <Text style={styles.pageHeading}>CREATE NEW ACCOUNT   </Text>
                </View>
                <Card>
                <View style={styles.UserLogo}>
                    <Image
                       style={styles.logo}
                       source={{uri: 'https://library.kissclipart.com/20180904/hlw/kissclipart-female-user-icon-flat-clipart-computer-icons-avata-cc54cb11d400df36.jpg'}}
                    />
                </View>
                    <ScrollView style={styles.cardContainer}>
                    <View style={styles.nameContainer}>
                    <View style={styles.firstNameContainer}>
                      <TextField1
                        label='First Name'
                        value={this.state.firstName}
                        onChangeText={ (firstName) => this.setState({ firstName }) }
                      
                        />
                   </View>
                   <View style={styles.lastNameContainer}>
                   <TextField1
                        label='Last Name'
                        value={this.state.lastName}
                        onChangeText={ (lastName) => this.setState({ lastName }) }
                      
                        />
                   </View>
                   </View>
                   <View style={{ paddingBottom:hp('2%')}}>
                   <View style={styles.InputContainer}>
                   <TextField1
                        label='Email Address'
                        value={this.state.emailAddress}
                        keyboardType={"email-address"}
                        onChangeText={ (emailAddress) => this.setState({ emailAddress }) }
                      
                        />
            
                   </View>
                   <View style={styles.InputContainer}>
                    <TextField1
                        label='UserName'
                        value={this.state.userName} 
                        onChangeText={ (userName) => this.setState({ userName }) }
                      
                        />
                   </View>
                  
                   <View style={[styles.InputContainer, {flexDirection:"row"}]}>
                   <View style={{ flex:3}}>
                   <TextField1
                        label='Mobile Number'
                        value={this.state.mobileNumber}
                        keyboardType={"phone-pad"}
                        onChangeText={ (mobileNumber) => this.setState({ mobileNumber }) }
                        />
                   </View>
                   <View style={{flex:1, paddingTop:hp('5%'),  alignItems:'center', justifyContent:'center'}}>
                   <TouchableOpacity
                   onPress={this.verifyMobile}
                   >
                   {this.renderVerifyText()}
                   </TouchableOpacity>
                   </View>
                   </View>
                   <View style={styles.InputContainer}>
                   <TextField1
                        label='Password'
                        value={this.state.password}
                        keyboardType={"visible-password"}
                        onChangeText={ (password) => this.setState({ password }) }
                      
                        />
                   </View>
                   <View style={styles.InputContainer}>
                   <TextField1
                        label='Promo Code(Optional)'
                        value={this.state.promoCode}
                        keyboardType={'default'}
                        onChangeText={ (promoCode) => this.setState({ promoCode }) }           
                        />
                   </View>
                   </View>
                   <View style={styles.RegisterButton}>
                      {this.renderButton()}
                   </View>
                   </ScrollView>
                </Card>
            <View style={styles.signInSection}>
                       <TouchableOpacity
                        onPress={ () => { this.props.navigation.navigate('SignIn')}}
                         style={styles.signIn}
                       >
                      <Text style={[styles.signInText,{color:'#fff'}]}>SIGN IN  </Text>
                       </TouchableOpacity>
            </View>
            <AnimatedLoader
                visible={this.state.loading}
                overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../assets/svg/animate2.json')}
            />
             <Modal1
              placeholder={'OTP'}
              Title={'Enter 4 digit OTP'}
              visible={this.state.modalVisible}
              onChangeText={(otp2) => this.setState({ otp2 })}
              value={this.state.otp2}
              onPressC={() => {
              this.setState({ modalVisible:false});
              }}
              onPressV={this.verify} 
       >Verify</Modal1>
             {this.renderModal()}
            </View>
           
            )}
    
            </KeyboardShift>
           
        );
      }
   
}

const styles = StyleSheet.create({
  
    lottie:{
      width:wp('25%'),
      height:hp('12%')
    },
  container: {
    backgroundColor: '#f2784a',
  },
  cardContainer:{
  },
  pageHeading:{
      fontSize: wp('6%'),
      color: '#404549',
      fontWeight: '800',

  },
  pageHeadingContainer:{
      paddingTop:hp('3'),
      alignItems: 'center',
      marginBottom:hp('5%'),
      paddingBottom:hp('3%')
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
  nameContainer:{  
    height:hp('9%'),
     width:wp('90%'),
     flexDirection: 'row',
     paddingLeft: wp('5%'),
     paddingRight:wp('3%'),
    },
  firstNameContainer:{
      flex:1,   
      paddingRight: wp('2%'),
  },
  lastNameContainer:{
  flex: 1,
    paddingLeft: wp('2%'),
},
touchable:{
    alignItems:'center',
    backgroundColor:'#EC6D4A',
    marginLeft: wp('5%'),
    marginRight: wp('3%'),
    height: hp('5.7%'),
    width:wp('86%'),
    justifyContent:'center',
    borderRadius:3
},
RegisterButton:{
  marginBottom:hp('1%'),
  marginTop:hp('2%'),
  width:wp('90%'),
  alignItems:'center'
},
signInText:{
    fontSize:hp('2.5%'),
    fontWeight: '500',
    color:'#404549'
},
Input:{
    fontSize:hp('2.5%'),
    color:'#404549',
    borderBottomColor:'#A9A9A9',
    borderBottomWidth: 1.5,
    paddingLeft:2,
},
signInSection:{
    paddingTop:hp('1%')
},
signIn:{
    backgroundColor: '#324e51',
    alignItems:'center',
    height:hp('6%'),
    justifyContent:'center',
   
},
InputContainer:{
  
    height:hp('9%'),
    paddingTop:0,
    paddingLeft:wp('5%'),
    // paddingRight:wp('3%'),
    width:wp('90%')
}
});
