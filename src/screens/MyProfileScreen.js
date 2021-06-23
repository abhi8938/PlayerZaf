import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { updateUserDetails, updatePassword } from '../ApiRequests/PostRequests';
import {  Spinner } from '../common';
import KeyboardShift from './../KeyboardShift';
class MyProfileScreen extends Component {
    static navigationOptions = {
        headerTitle: 'My Profile    ',
        headerStyle: {
            backgroundColor: '#f2784a',
            elevation: 0,
            height: hp('8%'),
            margin: 0,
        }
    };

    state={
        firstName:'',
        lastName:'',
        mobileNumber:'',
        oldPassword:'',
        newPassword:'',
        retypedPassword:'',
        loading: false,
    }
    async updateUser(customerId) {
        this.setState({ loading: true});

        if(this.state.mobileNumber.length < 10 && this.state.mobileNumber.length > 1){
            alert('Incorrect Mobile Number');
            return;
        }else{
          const response = await updateUserDetails(
                 customerId,
          this.state.firstName,
          this.state.lastName,
          this.state.mobileNumber,
      );
      if(response == 'Update Successfull'){
       alert(response);
       this.setState({ loading: false});
}
else if( response != 'Update Successfull'){
       this.setState({ loading: false});
       alert(response);
}
  }

    }

    async updatePassword(customerId) {
        this.setState({ loading: true});

        if(this.state.oldPassword.length < 3){
            alert('Invalid old Password');
            return;
        }else if(this.state.newPassword.length < 6){
            alert('new Password should consist more than 6 characters ')
        }else if(this.state.newPassword != this.state.retypedPassword){
            alert('newpassword did not match')
        }else if(this.state.newPassword == this.state.retypedPassword){
          const response = await updatePassword(
                 customerId,
          this.state.oldPassword,
          this.state.newPassword
      );
      if(response == 'Password Updated'){
       alert(response);
       this.setState({ loading: false});
}
else if( response != 'Password Updated'){
       this.setState({ loading: false});
       alert(response);
}
  }

    }

    renderSaveButton(customerId){
        if(this.state.loading){
            return <Spinner />;
        }
       return(
        <TouchableHighlight
        onPress={() => {this.updateUser(customerId)}}
        style={styles.referButton}
      >
     <Text style={styles.referButtonText}>SAVE  </Text>
      </TouchableHighlight>
       )

    }
    renderResetButton(customerId){
        if(this.state.loading){
            return <Spinner />;
        }
       return(
        <TouchableHighlight
        onPress={() => {this.updatePassword(customerId)}}
                 style={styles.referButton}
               >
              <Text style={styles.referButtonText}>RESET  </Text>
               </TouchableHighlight>
       )

    }

    render() {
        const { details } =this.props.navigation.state.params;
        return (
            <KeyboardShift>
            {() => ( 
                <View style={styles.Container}>
                 <View style={styles.editProfile}>
                     <Text style={styles.editProfileText}>Edit Profile</Text>
                 </View>
                 <View style={styles.nameContainer}>
                <View style={styles.firstNameContainer}>
                
               <TextInput
               placeholder={details.firstName}
               placeholderTextColor={'#000'}
               style={styles.Input}
               onChangeText={(firstName) => this.setState({ firstName })}
                value={this.state.firstName}
               />
               </View>
               <View style={styles.lastNameContainer}>
             
               <TextInput
               placeholder={details.lastName}
               placeholderTextColor='#000'
               style={styles.Input}
               onChangeText={(lastName) => this.setState({ lastName })}
                value={this.state.lastName}
               />
               </View>
               </View>
               <View style={styles.InputContainer}>
              
               <TextInput
               placeholder={ details.emailAddress}
               style={styles.Input}
               editable={false}
               />
               </View>
               <View style={styles.InputContainer}>
               <TextInput
               placeholder={ details.userName } 
               style={styles.Input}
               editable={false}
               />
               </View>
              
               <View style={styles.InputContainer}>
               <TextInput
               keyboardType={"phone-pad"}
               placeholder={ details.mobileNumber }
               placeholderTextColor='#000'
               style={styles.Input}
               onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                value={this.state.mobileNumber}
               />
               </View>
               <View style={styles.referButtonContainer}>
                 {this.renderSaveButton(details.customerId)}
               </View>
               <View style={styles.passwordChangeContainer}>
               <View style={styles.editProfile}>
                     <Text style={styles.editProfileText}>Reset Password</Text>
                 </View>
                 <View style={styles.InputContainer}>
                 <TextInput
                  placeholder='Old Password'
                  style={[styles.Input, { marginTop:hp('-2%')}]}
                  onChangeText={(oldPassword) => this.setState({ oldPassword })}
                  value={this.state.oldPassword}
                 />
              </View>
              <View style={styles.InputContainer}>
              
              <TextInput
               placeholder='New Password'
               style={styles.Input}
               onChangeText={(newPassword) => this.setState({ newPassword })}
               value={this.state.newPassword}
              />
           </View>
           <View style={styles.InputContainer}>
              
              <TextInput
               placeholder='Retype New Password'
               style={styles.Input}
               onChangeText={(retypedPassword) => this.setState({ retypedPassword })}
               value={this.state.retypedPassword}
              />
           </View>
           <View style={styles.referButtonContainer}>
           {this.renderResetButton(details.customerId)}
               </View>
               </View>
               </View>
               )}
        </KeyboardShift>
        );
    }
}

export default MyProfileScreen;

const styles = StyleSheet.create({
    referButtonText:{
        fontSize:hp('3%'),
        color:'#000',
        fontWeight:'400'
     },
     referButton:{
         height:hp('6%'),
         width:wp('90%'),
         alignItems:'center',
         justifyContent:'center',
         backgroundColor: '#E2AD38',
         borderRadius:3
     },
     referButtonContainer:{
        height:hp('6%'),
        width:wp('92%'),
        marginLeft:15,
        alignItems:'center',
         justifyContent:'center',
         marginTop: hp('2%'),
     },
    editProfile:{
     paddingLeft:wp('3%'),
     paddingTop:hp('2%'),
     paddingBottom:hp('1%')
    },
    editProfileText:{
      fontSize:16,
      fontWeight: 'bold',
      color:'#097275'
    },
    Container: {
        backgroundColor:'#fff',
        marginTop:hp('-10%')
    },
    nameContainer:{
        flex: 1,
        flexDirection: 'row',
        paddingLeft: wp('5%'),
        paddingRight:wp('5%'),
        paddingBottom:hp('2%'),
        marginBottom:hp('2%')
       },
     firstNameContainer:{
         flex:1,
         height: hp('5%'),
         paddingRight: wp('2%'),
     },
     lastNameContainer:{
        flex: 1,
       height: hp('5%'),
       paddingLeft: wp('2%'),
   },
   Input:{
    fontSize:18,
    color:'#696969',
    borderBottomColor:'#A9A9A9',
    borderBottomWidth: 1.5,
    paddingLeft:2,
    paddingBottom:5,
    lineHeight:5
},
InputContainer:{
    paddingLeft:wp('4%'),
    paddingRight:wp('5%'),
    paddingTop:hp('1.3%')
}
});