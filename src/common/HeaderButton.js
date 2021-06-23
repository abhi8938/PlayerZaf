import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { getWalletBalance } from '../ApiRequests/GetRequest';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import { Spinner } from '../common'; 

/* Money in wallet - DataType - dynamic */
 class HeaderButton extends React.Component{
 
   state={
      balance:0,
      loading:false
    }

  componentDidMount() {
   this.didBlurSubscription = this.props.navigation.addListener(
      'willFocus',
     async payload => {
          this.setState({ loading:true});
   const balance = await getWalletBalance();
   if(balance != 0){
      this.setState({ balance: balance});
     }
     this.setState({ loading:false});
   });
   }
   componentWillUnmount(){
      this.didBlurSubscription.remove();
  }

   render(){
   // console.log(this.state);
   if(this.state.loading){
      return(
         <View style = {styles.touchable}>
           <Spinner size={'small'}/> 
         </View>
      )
   }
    return (
            <TouchableOpacity 
            onPress={() => { this.props.navigation.navigate('AddMoney')}}
            style={styles.touchable}>
               <Text style={styles.value}>₹ {this.state.balance}</Text> 
            </TouchableOpacity>
    );
   }
};

export default withNavigation(HeaderButton);


const styles = {
    touchable: {
       width: wp('14%'),
       height: hp('4%'),
       borderRadius: 5,
       marginRight: 13,
       backgroundColor: '#E4E2E3',
       justifyContent: 'center',
       elevation: 2
    },
    value: {
        textAlign: 'center',
        fontSize: wp('3.5%'),
        fontWeight: 'bold',
     }

};

