import React from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Modal1 = (props) =>{
return(
    <Modal
animationType="slide"
transparent={true}
visible={props.visible}
 >
<View style={{marginTop: 22}}>
  <View style={styles.modalView}>
    <View style={styles.inputUser}>
      <Text style={styles.modalHeading}>{props.Title}</Text>
    <TextInput
     placeholder={props.placeholder}
     placeholderTextColor='#404549'
     style={styles.Input}
     onChangeText={props.onChangeText}
      value={props.value}
     />
    </View>
  <View style={styles.buttonModelContainer}>
<TouchableOpacity
  onPress={props.onPressC}
  style={styles.cancelButton}
>
<Text style={styles.ButtonText}>CANCEL  </Text>
</TouchableOpacity>

<TouchableOpacity
      underlayColor=''
      onPress={props.onPressV}
      style={styles.joinButton}
    >
   <Text style={styles.ButtonText}>{props.children}</Text>
   </TouchableOpacity>
</View>
  </View>
</View>
</Modal>
)
}

const styles = {
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
}


export{Modal1};
