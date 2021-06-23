import React from 'react';
import { Text, 
    StyleSheet, 
    View, 
    TextInput, 
    Alert, 
    WebView,
    Modal,
    ActivityIndicator
  } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'   
import { TouchableRipple } from 'react-native-paper'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getUserCard, countTransactions } from '../../ApiRequests/GetRequest'
import {  Spinner } from '../../common';
import  AnimatedLoader  from 'react-native-animated-loader';
import AlertModal from './../../components/AlertModal';
import { addTransaction } from '../../ApiRequests/PostRequests';

export default class AddMoney extends React.Component{
    state={
        TXN_AMOUNT:'0',
        TxnId: '',
        ack:'',
        CUST_ID:'',
        showModal: false,
        loading:false,
        error:false,
        showResponse:false,
        response:''
    }
    
  //     checkout= async (response) => {
  //       //  Alert.alert("amount:"+ amount);
  //       var options = {
  //         description: 'Credits',
  //         currency: 'INR',
  //         key: 'rzp_live_Osjem2QarhHF8m',
  //         name: 'PlayerZaf',
  //         theme: {color: '#9DE1FE'},
  //        "order_id": response.data.RAZORPAY_ID
  //             }
  //  return RazorpayCheckout.open(options).then((data) => {
  //     return data;
  //     }).catch((error) => {
  //       this.setState({ loading: false, showResponse:true, response:`error: ${error.description}`, error:true })
  //    return error;
  //   });
  //      }

    // handleOrder = async () =>{
    //   if(parseInt(this.state.TXN_AMOUNT) > 5){
    //   this.setState({ loading: true});
    //   const amountInPaisa = parseInt(this.state.TXN_AMOUNT)* 100;
    //     const response = await CreateOrderRequest(amountInPaisa);
    //    const razorResponse = await this.checkout(response);   
    //    //call sendAuthorization(razorResponse)
    //   const paymentResult =  await sendAuthorization(razorResponse, response);
    //   if(paymentResult.status == 200){
    //   this.setState({ loading: false, showResponse:true, response:`${paymentResult.data}`, error:false })
    //    }else{
    //   this.setState({ loading: false, showResponse:true, response:`${paymentResult.data}`, error:true });
    //   }
    // }else {
    //   console.log('errorrerers')
    //   this.setState({ loading: false, showResponse:true, response:`minimum amount is 5`, error:true });
    // }
    // }
    async transactionData(){
      const data = await getUserCard();
      const count = await countTransactions();
      const txn = `TXNN-${parseInt(count)}`;
      console.log(data.customerId,txn); 
      this.setState({
         CUST_ID:data.customerId,
         TxnId:txn,
         TXN_AMOUNT:''
       });
    }
    
   componentDidMount(){
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
     async payload => {
      await this.transactionData();
     
    }
    );
    }
    componentWillUnmount(){
      this.didBlurSubscription.remove();
  }
    

    
  // async componentDidMount(){
  //    //TODO: get customerId and setstate
  //    const user = await getUserCard();
  //    this.setState({ CUST_ID: user.customerId});
  //    const count = await countTransactions();
  //    const sum = parseInt(count);
  //    console.log(`sum:${sum}`);
  //    const txnid = `TXN--${sum + 1}`;
  //    this.setState({ TxnId:txnid});
  //   }

    // handlePress = async () =>{
    //   //TODO: generate consecutive orderId and setstate
    //    this.setState({ showModal:true});
    // }

    renderButton(){
     return(
      <TouchableRipple 
      activeOpacity={0.8}
       onPress={() => { 
        if(this.state.TXN_AMOUNT >=5){
         this.setState({ showModal:true})
        }else{
          this.setState({ loading: false, showModal:false, showResponse:true, response:`Minimum Required Amount is 5`, error:true })
        }
         }}
      style={styles.button}
    >
        <Text style={styles.Buttonlabel}>ADD </Text>
        
    </TouchableRipple>
     )

  }

  handleResponse = async (data) => {
    console.log(data);
  const { TxnId, CUST_ID, ack, TXN_AMOUNT} = this.state;
  
  if(data.title == 'true'){
     //TODO: Post transaction in database
     this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
    const Txnid = TxnId;
    const Amount = TXN_AMOUNT;
    const TxnStatus = 'SUCCESS';
    const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID );
    console.log(transaction);
    await this.transactionData();
    this.setState({ loading: false, showModal:false, showResponse:true, response:`${transaction.data}`, error:false })
  }else if(data.title == 'false'){
    this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
    const Txnid = TxnId;
    const Amount = TXN_AMOUNT;
    const TxnStatus = 'FAILIURE';
    const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID );
    await this.transactionData();
    this.setState({ loading: false, showModal:false, showResponse:true, response:`${transaction.data}`, error:true });
  }else if(data.title == 'CANCELLED') {
    this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
    const Txnid = TxnId;
    const Amount = TXN_AMOUNT;
    const TxnStatus = 'CANCELLED';
    const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID );
    await this.transactionData();
    this.setState({ loading: false, showModal:false, showResponse:true, response:`${transaction.data}`, error:true })
  };
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
      const { showModal, ack, TxnId, TXN_AMOUNT, CUST_ID} = this.state;
      return (  
     <View style={styles.scene}>
      <View style={ styles.AmountField}>
          <Text style={styles.label}>₹</Text>
          <View style={styles.WholeInput}>
              <Text style={ styles.inputLabel}>Amount</Text>
          <TextInput
          keyboardType={"numeric"}
               style={styles.Amount}
               onChangeText={(TXN_AMOUNT) => this.setState({ TXN_AMOUNT })}
                value={this.state.TXN_AMOUNT}
               />
               </View>
      </View>
      <View style={styles.buttonContainer}>
     {this.renderButton()}
      </View>
      <Modal
      visible={showModal}
      onRequestClose={() => {
        const data={
          title:'CANCELLED'
        }
        this.handleResponse(data);
        }}
      >
        <WebView
          ref={webview => {
              this.myWebView = webview;
                               }}     
          javaScriptEnabled = {true} 
          domStorageEnabled={true}  
          originWhitelist = {['*']}
          source={{uri:'https://playerzaf.herokuapp.com/api/paytm/request'}}
          injectedJavaScript={ `document.getElementById('ORDER_ID').value = "${TxnId}"; document.getElementById('TXN_AMOUNT').value = "${TXN_AMOUNT}"; document.getElementById('CUST_ID').value = "${CUST_ID}"; document.f1.submit()`}
          onNavigationStateChange ={data => {
            this.handleResponse(data)
            }}
            /> 
      </Modal>
      <AnimatedLoader
             visible={this.state.loading}
             overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../../assets/svg/animate2.json')}
              />
              {this.renderModal()}
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
      flex:1,
      justifyContent:'center',
    },
    AmountField:{
        flexDirection: 'row',
        paddingBottom: hp('1%'),
    },
    WholeInput:{
         paddingLeft:wp('3%')
    },
    label:{
        alignSelf: 'flex-end',
        paddingLeft:wp('4%'),
        fontSize:wp('6.5%'),
    },
    Amount:{
        borderBottomColor:'#000',
        borderBottomWidth: 1.5,
        width:wp('83%'),
        height:hp('7%'),
        paddingBottom:wp('1.5%'),
        fontSize: wp('5.5%')
    },
    buttonContainer:{
         padding: wp('2%'),
         alignItems: 'center',
    },
    button:{
        alignItems: 'center',
        justifyContent:'center',
        width:wp('90%'),
        height:hp('6.6%'),
        backgroundColor: '#3794BE',
        borderRadius: 5, 
    },
    Buttonlabel:{
         color: '#FFF',
         fontSize: 20
    }
  });


