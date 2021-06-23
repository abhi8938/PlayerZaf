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
        loading:true,
        error:false,
        showResponse:false,
        response:''
    }
    
    async transactionData(){
    
      const data = await getUserCard();
      const count = await countTransactions();
      const txn = `TXNN-${parseInt(count)}`;
      this.setState({
         CUST_ID:data.customerId,
         TxnId:txn,
         TXN_AMOUNT:'0',
         loading:false
       });
    }
    
   componentDidMount(){
  
    this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
      this.setState({ loading:true});
      await this.transactionData();
    }
    );
    }
    componentWillUnmount(){
      this.didBlurSubscription.remove();
  }

    renderButton(){
     return(
      <TouchableRipple 
      activeOpacity={0.8}
       onPress={() => { 
        if(this.state.TXN_AMOUNT >=10){
         this.setState({ showModal:true})
        }else{
          this.setState({ loading: false, showModal:false, showResponse:true, response:`Minimum Required Amount is 10`, error:true })
        }
         }}
      style={styles.button}
    >
        <Text style={styles.Buttonlabel}>ADD </Text>
        
    </TouchableRipple>
     )

  }

  handleResponse = async (data) => {
  
  const { TxnId, CUST_ID, ack, TXN_AMOUNT} = this.state;
  
  if(data.title == 'true'){
     //TODO: Post transaction in database
     this.setState({ loading: true, showModal:false, showResponse:false, response:'', error:false });
    const Txnid = TxnId;
    const Amount = TXN_AMOUNT;
    const TxnStatus = 'SUCCESS';
    const transaction= await addTransaction(Txnid, Amount, TxnStatus, CUST_ID );

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
      const { showModal, ack, TxnId, TXN_AMOUNT, CUST_ID, loading} = this.state;
      if(loading == false){
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
              {this.renderModal()}
     </View>
     
    )}else{
      return(
          <Spinner size={'large'}/>
      )
    };
  }
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


