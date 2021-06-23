import axios from 'axios';
import { getUserCard } from './GetRequest';
import { AsyncStorage } from 'react-native';
//START
export const updatedApp = async (update, userName) =>{
    return axios.put('https://playerzaf.herokuapp.com/api/users/update',{
        update,
        userName
   })
         .then( response =>{
             return response.data
         })
         .catch( error => {return error.response.data });
}
//END
//START
export const sendOtp = async (mobileNumber, otp) =>{
    const message = `Your one time password is ${otp}`;
    var config ={
        params:{
            "username": 'playerzaf.contact' ,
        "password": "15060138",
        "source": 'PLAZAF',
        "dmobile": `91${mobileNumber}`,
        "message":message
        }
    }
    return axios.post('https://www.txtguru.in/imobile/api.php',{
        mobileNumber
    },config).then(response =>{
       return response
    }).catch(err =>{
        return err.response
    })
}
//END
//START
export const addTransaction = async (TxnId,Amount,TxnStatus,customerId) =>{
    const userToken = await AsyncStorage.getItem('userToken');
var config = {
    headers: {'Content-Type': 'application/json',
        'x-auth-token': userToken}
};
    return axios.post('https://playerzaf.herokuapp.com/api/transaction',{
       TxnId,
       Amount,
       TxnStatus,
       customerId
    },config).then(response =>{
        return response
    }).catch(err =>{
        return err.response
    })
}
//END

//START
export const sendResetRequest = async (email) =>{

    return axios.post('https://playerzaf.herokuapp.com/api/resetPassword',{
    email
}).then(response => {

    return response.data;
}).catch(error => {

    return error.response.data;
})
}
//END


//START


export const updatePassword = async (
    customerId,
    oldPassword,
    newPassword
) => {
    // alert(customerId);
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken}
    };
 return axios.put('https://playerzaf.herokuapp.com/api/users/password',{
         customerId,
         oldPassword,
         newPassword

    },config)
          .then( response =>{
              return response.data
          })
          .catch( error => {return error.response.data });
}
//end

//start
export const updateUserDetails = async (
    customerId,
    firstName,
    lastName,
    mobileNumber,
) => {
    // alert(customerId);
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken}
    };
 return axios.put('https://playerzaf.herokuapp.com/api/users/details',{
         customerId,
         firstName,
         lastName,
         mobileNumber,

    },config)
          .then( response =>{
              return response.data
          })
          .catch( error => {return error.response.data });
}

//end


//start
export const sendAuthorization = async (razorResponse, response) => {
    const success = 'MoneyAdd SuccessFull';
    const razorpay_order_id = razorResponse.razorpay_order_id;
    const razorpay_payment_id = razorResponse.razorpay_payment_id;
    const razorpay_signature = razorResponse.razorpay_signature;
    const customer_Id = response.data.customer_Id;
    const amount = response.data.amount;
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken}
    };
    return axios.put('https://playerzaf.herokuapp.com/api/orders',{
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        customer_Id,
        amount
    },config).then(response => {
        
        return response;
    }).catch(err => {
        return err.response;
    });
    }


//The end

export const CreateOrderRequest = async (
    amount
) => {
    //call post request with data and create player log response
   const userData = await getUserCard();
    const receipt='RECEIPT##18';
    const customer_Id= userData.customerId;
    const customerEmailId=userData.emailAddress;
    const customerMobile=userData.mobileNumber;
//send order request to route
const userToken = await AsyncStorage.getItem('userToken');
var config = {
    headers: {'Content-Type': 'application/json',
        'x-auth-token': userToken}
};
    return axios.post('https://playerzaf.herokuapp.com/api/orders',{
     customer_Id,   
     amount,
     receipt,
     customerEmailId,
     customerMobile 
    },config)
          .then( response =>{
            
              return response;
          })
          .catch( error =>{
           
              return error; 
        });
}


export const addParticipant = async (
    matchId,
    playerName
) => {
  //call post request with data and create player log response
 const userData = await getUserCard();
  const userName = userData.userName;
  const mobileNumber = userData.mobileNumber;
  const customerId = userData.customerId;
  const userToken = await AsyncStorage.getItem('userToken');
  var config = {
      headers: {'Content-Type': 'application/json',
          'x-auth-token': userToken}
  };
return axios.post('https://playerzaf.herokuapp.com/api/participants',{
      matchId: matchId,
      playerName: playerName,
      userName:userName,
      mobileNumber:mobileNumber,
      customerId: customerId
  },config)
        .then( async response =>{
          
            return response;
        })
        .catch( error => {
         
            return error.response});
}



// export const updateWallet = async (customerId, walletBalance) => {
//     const userToken = await AsyncStorage.getItem('userToken');
//     var config = {
//         headers: { 
//             'Content-Type': 'application/json',
//             'x-auth-token': userToken 
//         }
//     };
// // const success = 'JOINED SUCCESSFULLY'
// return axios.put('https://playerzaf.herokuapp.com/api/users/balance',{
//     customerId,
//     walletBalance
// }, config).then(response => {
//     return success;
// }).catch(err => {
//     return err.response.data;
// });
// }




//Create new user
export const CreateUser = async (
    firstName,
    lastName,
    userName,
    emailAddress,
    mobileNumber,
    password,
) => {
    const success ='Success';
 return axios.post('https://playerzaf.herokuapp.com/api/users',{
        firstName: firstName,
        lastName: lastName,
        userName:userName,
        emailAddress: emailAddress,
        mobileNumber: mobileNumber,
        password: password
    })
          .then( response =>{
              return success
          })
          .catch( error => {return error.response});
}

export const createUserToken = async (
    emailAddress,
    password
) => {
  
   return axios.post('https://playerzaf.herokuapp.com/api/auth',{
         emailAddress: emailAddress,
         password: password
    })
    .then( response =>{
        // console.log(response);
    return response;
    })
    .catch( error => {
        // console.log(`error:${error}`);
       return error.response;
    } )
}
