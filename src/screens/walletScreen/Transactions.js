import React from 'react';
import { Text, StyleSheet, View, TextInput, TouchableHighlight, FlatList } from 'react-native';
import { TransactionItem } from '../../components/ListItems/TransactionItem';
import { getTransactions } from './../../ApiRequests/GetRequest';
import {  Spinner } from '../../common';
import  AnimatedLoader  from 'react-native-animated-loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Transactions extends React.PureComponent{
    constructor(props){
        super(props)
       this.state= {
            Transactions: [],
            loading:true,
        }

    }
    componentDidMount(){
       
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
           async payload => {    
            this.setState({ loading:true});   
              const transaction = await getTransactions();
              const Transacts = [];
              transaction.forEach(element => {
                  if(element.TxnType != 'CANCELLED'){
                    Transacts.push(element);
                  }
                     
              });
              this.setState({Transactions:Transacts, loading:false});
            }
          );
   
    }

    componentWillUnmount(){
        this.didBlurSubscription.remove();
      
    }

    renderItem= (data)=>{
        return (
            <TransactionItem data={data} />
        )
    }

    render(){
        if(this.state.loading == false){
    return (
     <View style={styles.scene}>
     <View style={styles.container}>
        <FlatList
            data={this.state.Transactions}
            renderItem={this.renderItem}
            keyExtractor={(data) => data._id.toString()}
        />
         </View>
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
    scene: {
      flex: 1,
      backgroundColor:'#EBEBEB'
    },
    titleContainer:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginBottom: 50,
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        color:'#3794BE'
      },
 
  });