
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
 FlatList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TransactionItem = (props) => {
  const { TxnId, TxnStatus, TxnType, TxnDate, Amount} = props.data.item;
  let date;
  if(TxnDate != undefined){
        date = TxnDate.substring(0,10);
      }else{
        date='2019-05-02'
      }
    return (
        <View style={styles.OrderItem}>
        <View style={styles.OrderHeadingContainer}>
          <Text style={styles.OrderHeadingText}>{TxnId}</Text>
          <Text style={styles.OrderStatusText}>{TxnStatus}</Text>
        </View>
        <View style={styles.typeContainer}>
          <Text style={{ fontSize:wp('3%'), fontWeight:'500'}}>Type:</Text>
          <Text style={styles.typeText}>{TxnType}</Text>
        </View>
        <View style={styles.OrderPaymentContainer}>
          <Text style={styles.OrderValueText}>₹ {Amount}</Text>
          <Text style={styles.OrderDateText}>{date}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    typeText:{
      fontSize:wp('4%'),
      fontWeight:'400'
    },
    typeContainer:{
      flex:1,
      justifyContent:'center'
    },
    OrderDateText:{
        fontSize:wp('3%'),
      },
      OrderValueText:{
        fontSize:wp('4.2%'),
        color:'#000',
        paddingBottom:hp('0.5%')
      },
      OrderStatusText:{
        fontSize:wp('3.5%'),
        color:'#11C3F0',
      },
      OrderHeadingText:{
         fontSize:wp('4.2%'),
         color:'#000',
         paddingBottom:hp('0.5%')
      },
      OrderPaymentContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:wp('1.8%')
      },
      OrderHeadingContainer:{
        flex:1,
        justifyContent:'center',
        paddingLeft:wp('2.5%')
      },
      OrderImageContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      OrderItem:{
        flexDirection:'row',
        backgroundColor:"#fff",
        paddingTop:hp('2%'),
        paddingBottom:hp('2%'),
        paddingRight:wp('1.5%'),
        paddingLeft:wp('2%'),
        borderRadius:4,
        marginBottom:hp('.8%')
      },
  });
  
  export { TransactionItem };
  