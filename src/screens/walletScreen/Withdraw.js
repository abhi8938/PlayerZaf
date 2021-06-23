import React from 'react';
import { Text, StyleSheet, View, TextInput, Modal, ActivityIndicator } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { getUserCard, withdrawMoney, countTransactions } from '../../ApiRequests/GetRequest';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  AnimatedLoader  from 'react-native-animated-loader';
import AlertModal from './../../components/AlertModal';
export default class WithDraw extends React.Component{
    constructor(props) {
        super(props);
    // rest of your code
}
    state={
        Amount:'',
        paytmNumber:'',
        customerId:'',
        walletBalance:'',
        loading:false,
        error:false,
        response:'',
        showResponse:false
    }
    handleWithdraw = async () => {
        const { Amount, paytmNumber, customerId, walletBalance } = this.state;
        this.setState({ loading:true});
        const clientPrev = await getUserCard();
        //change clientPrev.walletBalance to clientPrev.withdrawWallet
        this.setState({
            customerId:clientPrev.customerId,
            walletBalance: clientPrev.walletBalance
        });
        if( Amount < walletBalance && Amount > 99 ){
               const withDrawResponse = await withdrawMoney(paytmNumber, Amount, customerId);
               const client = await getUserCard();
                this.setState({ loading: false, showResponse:true, response:`${withDrawResponse}`, error:false });
                //change clientPrev.walletBalance to clientPrev.withdrawWallet
                this.setState({
                  customerId:client.customerId,
                  walletBalance: client.walletBalance
              });
        }else{
            this.setState({ loading: false, showResponse:true, response:'Minimum Amount 99 ', error:true });
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

  
    render(){
     
    return (
     <View style={styles.scene}>
     <View style={styles.titleContainer}>
             <Text style={styles.title}>Withdraw to Paytm Wallet </Text>
         </View>
     <View style={ styles.AmountField}>
          <Text style={styles.numberPrefix}>+91  </Text>
          <View style={styles.WholeInput}> 
              <Text style={ styles.inputLabel}>Paytm Number</Text>
          <TextInput
               keyboardType={"phone-pad"}
               style={styles.Amount}
               onChangeText={(paytmNumber) => this.setState({ paytmNumber })}
                value={this.state.paytmNumber}
               />
               </View>
      </View>
      <View style={ styles.AmountField}>
          <Text style={styles.label}>₹</Text>
          <View style={styles.WholeInput}>
              <Text style={ styles.inputLabel}>Amount</Text>
          <TextInput
          keyboardType={"numeric"}
               style={styles.Amount}
               onChangeText={(Amount) => this.setState({ Amount })}
                value={this.state.Amount}
               />
               <Text style={{ paddingTop:hp('1%'), color:'#A41811'}}>Minimum Amount 100</Text>
               </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableRipple 
      activeOpacity={0.6}
       onPress={this.handleWithdraw}  
       style={styles.button}>
          <Text style={styles.Buttonlabel}>WITHDRAW </Text>
      </TouchableRipple>
      </View>
      {this.renderModal()}
      <AnimatedLoader
             visible={this.state.loading}
             overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../../assets/svg/animate2.json')}
              />
     </View>
    )};
}

const styles = StyleSheet.create({
    lottie: {
        width:wp('25%'),
        height:hp('12%')
      },
    loaderText:{
        fontSize:12,
        color:'#000'
      },
      activityIndicator: {
          margin:0,
          padding:0,
   },
    modalView:{
        flex:1,
        flexDirection:'row',
        elevation: 5,
        backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
      },
    scene: {
      flex: 1,
      justifyContent:'center',
      paddingBottom:10
    },
    AmountField:{
        flexDirection: 'row',
        paddingBottom: hp('2%'),
        
    },
    WholeInput:{
         paddingLeft:wp('2%')
    },
    label:{
        alignSelf: 'flex-end',
        paddingLeft:wp('6%'),
        paddingRight: wp('5%'),
        fontSize:wp('6%'),
    },
    Amount:{
        borderBottomColor:'#000',
        borderBottomWidth: 1.5,
        width:wp('78%'),
        height: hp('7%'),
        fontSize: wp('4.5%')
    },
    buttonContainer:{
         padding: wp('1%'),
         alignItems: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent:'center',
        width:wp('94%'),
        height:hp('6.6%'),
        backgroundColor: '#3794BE',
        borderRadius: 4, 
    },
    Buttonlabel:{
         color: '#FFF',
         fontSize: wp('4.5%')
    },
    titleContainer:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginBottom: hp('7%'),
    },
    title:{
      fontSize:wp('6%'),
      fontWeight: 'bold',
      color:'#3794BE'
    },
    numberPrefix:{
        fontSize:wp('5%'),
        alignSelf: 'flex-end',
        paddingLeft:wp('3%'),
        fontWeight:'bold'
    }
  });