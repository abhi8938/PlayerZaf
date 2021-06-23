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
    TouchableHighlight,
    KeyboardAvoidingView,
    Modal 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView  from 'lottie-react-native';
class AlertModal extends React.Component{
    render(){
      if(this.props.error){
        return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}>
          <View style={{marginTop: 22}}>
            <View style={[styles.modalView, { backgroundColor:'#E3342F'}]}>
            <View style={styles.inputUser}>
            <LottieView style={styles.lottie} source={require('../assets/svg/error.json')} autoPlay loop />
            </View>
            <View style={{ alignItems:'center'}}>
                <Text style={styles.message}>{this.props.response}</Text>
            </View>
            <View style={styles.buttonModelContainer}>
        <TouchableOpacity
            onPress={this.props.onPress}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>OK  </Text>
        </TouchableOpacity>
        </View>
            </View>
          </View>
        </Modal>
        )
      }else{
         return(
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={this.props.onRequestClose}>
          <View style={{marginTop: 22}}>
            <View style={[styles.modalView, { backgroundColor:'#404549'}]}>
            <View style={styles.inputUser}>
            <LottieView style={styles.lottie} source={require('../assets/svg/success2.json')} autoPlay loop />
            </View>
            <View style={{ alignItems:'center'}}>
                <Text style={[styles.message, {fontSize:wp('5%')}]}>{this.props.response}</Text>
            </View>
            <View style={styles.buttonModelContainer}>
        <TouchableOpacity
            onPress={this.props.onPress}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>OK  </Text>
        </TouchableOpacity>
        </View>
            </View>
          </View>
        </Modal>
         );
      }
    }
}

export default AlertModal;


const styles =  StyleSheet.create({
    message:{
        fontWeight:'400',
        fontSize:wp('4.3%'),
        color:'#ffffff',
        paddingBottom:5
    },
    modalView:{
        height:hp('36%'),
        width: wp('90%'),
        marginLeft:wp('5%'),
        marginTop: hp('30%'),
        borderRadius:3,
        elevation: 5,
        alignItems: 'center', 
        justifyContent:'center'
      },
      modalHeading:{
         fontSize: hp('3%'),
         fontWeight: 'bold',
         paddingBottom: hp('1%'),
      },
      lottie: {
        width:wp('36%'),
        height:hp('18%')
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
         paddingTop: hp('1%'),
         paddingBottom: hp('3%'),
         justifyContent:'center',
         alignItems:'center'  
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
      margin: 5,
  },
  cancelButton:{
     flex: 1,
     height: hp('5%'),
     backgroundColor: 'transparent',
     borderTopWidth: 0.5,
     borderColor: '#d3d3d3',
     justifyContent: 'center',
     borderRadius: 2,
     alignItems: 'center',
     margin: 5,
     width:wp('60%')

  },
  ButtonText: {
      fontSize:wp('4%'),
      fontWeight: '800',
      color: '#fff'
  },
  buttonModelContainer:{
    flex: 1,
    flexDirection: 'row',
    width:wp('80%'),
    paddingBottom: hp('3%'),
  },
})