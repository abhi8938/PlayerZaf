import React from 'react';
import { View, TouchableOpacity, Image, Text, TextInput, Alert, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header, Spinner } from '../common';
import { getUserCard } from '../ApiRequests/GetRequest';
import { addParticipant, updateWallet } from '../ApiRequests/PostRequests';
import AlertModal from '../components/AlertModal';
import AnimatedLoader from 'react-native-animated-loader';
class OnJoinScreen extends React.Component {
 
  static navigationOptions = {
    headerTitle: <Header />,
    headerStyle: {
      backgroundColor: '#f2784a',
      elevation: 0,
      height: hp('8%'),
      margin: 0,
    }
  };
  state={
    balance:0,
    error1:'Your have insufficient balance. Kindly add balance to wallet in order to join this match',
    noterror:'you have sufficient balance in wallet. kindly proceed further to join this match',
    modalVisible: false,
    playerName:'',
    userData: {},
    loading: false,
    showResponse:false,
    error:false,
    response:''
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  async createParticipant(matchId, playerName){
    this.setState({ loading: true});
    const result = await addParticipant(matchId, playerName);  
    const userData = await getUserCard();
    if(result.status == 200){
      this.setState({ loading: false, showResponse:true, response:result.data, error:false});
    }else{
      this.setState({ loading: false, showResponse:true, response:result.data, error:true});
    }
    // console.log(userData);
   this.setState({ balance: userData.walletBalance, userData: userData, loading: false});
   this.setModalVisible(!this.state.modalVisible);
      
    }

   renderJoinButton(matchId, playerName){
    if(this.state.loading){
        return <Spinner />;
    }
   return(
    <TouchableOpacity
       onPress={() => this.createParticipant(matchId, playerName)}
       style={styles.joinButton}
     >
    <Text style={styles.ButtonText}>JOIN</Text>
    </TouchableOpacity>
   )

}
   componentDidMount() {
    this.setState({ loading: true});
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
     async payload => {
    const userData = await getUserCard();
    // console.log(userData);
   this.setState({ balance: userData.walletBalance, userData: userData, loading: false});
    });
    }
    
    componentWillUnmount(){
      this.didBlurSubscription.remove();
  }


    renderError(entryfee){
      if(this.state.balance < entryfee){
          
        return(
           <Text style={styles.error}>{this.state.error1}</Text>  
        );
      }else{
        return(
       <Text style={styles.noterror}>{this.state.noterror}</Text>  
        );
      }
    }

    renderButton(entryfee){
      if(this.state.balance < entryfee){
     //Add Money     
        return(
           <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('AddMoney') }}
            style={styles.joinButton}
        >
        <Text style={styles.ButtonText}>Add Money  </Text>
        </TouchableOpacity>
        );
      }else{
        //Join
        return(
           <TouchableOpacity
            onPress={() => {
            this.setModalVisible(true);
          }}
            style={styles.joinButton}
        >
        <Text style={styles.ButtonText}>JOIN</Text>
        </TouchableOpacity>
        );
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
      const { entryfee, matchId } = this.props.navigation.state.params;
      const playerName = this.state.playerName;
    return (
        <View>
        <View style={styles.walletImageContainer}>
         <Image 
         style={styles.walletImage} 
         source={{uri: 'https://cdn1.iconfinder.com/data/icons/business-and-finance-20/200/vector_65_04-512.png'}}/>
        </View>
        <View style={styles.joinDetails}>
          <Text style={styles.balanceText}>Your Current Balance: {this.state.balance}</Text>
          <Text style={styles.balanceText}>Match Entry Fee: {entryfee}</Text>
         {this.renderError(entryfee)}  
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('Play')}}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>CANCEL  </Text>
        </TouchableOpacity>
        {this.renderButton(entryfee)}
        </View>
        <AnimatedLoader
             visible={this.state.loading}
             overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../assets/svg/animate2.json')}
              />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
              }}>
          <View style={{marginTop: 22}}>
            <View style={styles.modalView}>
              <View style={styles.inputUser}>
                <Text style={styles.modalHeading}>Please Enter Your PUBG NickName</Text>
              <TextInput
               placeholder='NickName'
               style={styles.Input}
               onChangeText={(playerName) => this.setState({ playerName })}
                value={this.state.playerName}
               />
              </View>
            <View style={styles.buttonModelContainer}>
        <TouchableOpacity
            onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
              }}
            style={styles.cancelButton}
        >
        <Text style={styles.ButtonText}>CANCEL  </Text>
        </TouchableOpacity>
        <View style={styles.joinButton}>
        {this.renderJoinButton(matchId, playerName, entryfee)}
        </View>
        </View>
            </View>
          </View>
        </Modal>
        {this.renderModal()} 
        </View>
      );
    }
  }

  export default OnJoinScreen;

  const styles = {
    lottie:{
      width:wp('25%'),
      height:hp('12%')
    },
modalView:{
  height:hp('30%'),
  width: wp('92%'),
  margin: wp('3%'),
  marginTop: hp('30%'),
  elevation: 5,
  // borderColor: '#000000',
  // borderWidth: 2,
  backgroundColor:'#fff',
  background:'visible',
  alignItems: 'center', 
  justifyContent:'center'
},
modalHeading:{
   fontSize: hp('3%'),
   fontWeight: 'bold',
   paddingBottom: hp('1%'),
},
Input:{
  fontSize:hp('2.5%'),
  color:'#696969',
  borderBottomColor:'#A9A9A9',
  borderBottomWidth: 1.5,
  paddingBottom:hp('1%'),
  paddingLeft:wp('1%'),
  lineHeight:20
},
inputUser:{
   width: wp('80%'),
   paddingTop: hp('2%'),
   paddingBottom: hp('2%'),  
},
    walletImageContainer:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: hp('48%'),
        marginBottom: 20,
    },
    walletImage:{
       width: wp('45%'),
       height: hp('30%')
    },
    joinDetails:{
       marginBottom: 20,
    },
    balanceText:{
      color: '#808080',
      fontSize: 16,
      textAlign: 'center',
      paddingTop: 10
    },
    noterror:{
      fontSize: 16,
      color: '#228B22',
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      textAlign: 'center',
    },
    error: {
      fontSize: 16,
      color: '#8B0000',
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
      textAlign: 'center',
    },
    joinButton: {
      flex:1,
      height: hp('6%'),
      backgroundColor: '#097275',
      borderColor: '#23283B',
      justifyContent: 'center',
      borderRadius: 2,
      alignItems: 'center',
      margin: 5
  },
  cancelButton:{
     flex: 1,
     height: hp('6%'),
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
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    padding:wp('2%')
  },
  buttonModelContainer:{
    flex: 1,
    flexDirection: 'row',
    width:wp('85%'),
    paddingBottom: 15,
  }


  };
