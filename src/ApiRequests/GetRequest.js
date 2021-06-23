import axios from 'axios';
import { AsyncStorage } from 'react-native';

//START

export const getJoined = async (customerId, matchId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken,
                   'customerid':customerId,
                    'matchid':matchId}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/participants/Joined',config)
   .then(response => {
       return response;
   })
   .catch( error => {
       return error.response;
   });
}
//END

//START
export const getTransactions = async () =>{
    const data = await getUserCard();
    const customerId = data.customerId;
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken,
                  'customerid':customerId },
        data:{}
    };
    return axios.get('https://playerzaf.herokuapp.com/api/transaction',config)
    .then(response => {
       return response.data;
    })
    .catch( error => {
        return error.response.data;
    });
}
//END

//START
export const countTransactions = async () =>{
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken },
        data:{}
    };
    return axios.get('https://playerzaf.herokuapp.com/api/transaction/count',config)
    .then(response => {
       return response.data;
    })
    .catch( error => {
     //    console.log(error.response.data);
        return error.response.data;
    });
}
//END

//START
export const withdrawMoney = async (
    paytmNumber,
    Amount,
    customerId
) => {
    const userToken = await AsyncStorage.getItem('userToken');
   
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken,
                  'paytmnumber':paytmNumber,
                  'amount': Amount,
                  'customerid':customerId },
        data:{}
    };
   return axios.get('https://playerzaf.herokuapp.com/withdraw',config)
   .then(response => {
       console.log(response);
      return response.data;
   })
   .catch( error => {
          console.log(error.response);
       return error.response.data;
   });
}
//END
export const getParticipants = async (matchId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'x-auth-token': userToken,
                  'Content-Type': 'application/json',
                  'matchid':matchId },
        data:{}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/participants',config)
   .then(response => {
      return response;
   })
   .catch( error => {
    //    console.log(error.response.data);
       return error.response.data;
   });
}

export const getResult = async (matchId) => {
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': userToken,
                  'matchid':matchId},
        data:{}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/results', config)
   .then(response => {
       return response.data;
   })
   .catch( error => {
       return error.response.data;
   });
}

export const getWalletBalance = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken);
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken}
    };
    return axios.get('https://playerzaf.herokuapp.com/api/users/me', config)
                .then( response =>{
                    return response.data.walletBalance;
                })
                .catch( error => {
                    return error.response.data;
})
}

export const getUserCard = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken);
    var config = {
        headers: {'Content-Type': 'application/json',
                  'x-auth-token': userToken}
    };

   return axios.get('https://playerzaf.herokuapp.com/api/users/me', config)
   .then(response => {
       return response.data;
   })
   .catch( error => {
       return error;
   })
}

export const getPlayMatches = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
   
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/matchDetails/open',config)
   .then(response => {
    //    console.log(response)
       return response.data;
   })
   .catch( error => {
       console.log(`error:${error.response.data}`)
       return error.response.data;
   });
}

export const getResultMatches = async () => {
    const data = await getUserCard();
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken,
            'customerid':data.customerId}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/matchDetails/completed',config)
   .then(response => {
    
       return response.data;
   })
   .catch( error => {
       return error.response.data;
   });
}

export const getOngoingMatches = async () => {
    const data = await getUserCard();
    const userToken = await AsyncStorage.getItem('userToken');
    var config = {
        headers: {'Content-Type': 'application/json',
            'x-auth-token': userToken,
             'customerid':data.customerId}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/matchDetails/ongoing',config)
   .then(response => {
       return response.data;
   })
   .catch( error => {
       return error.response.data;
   });
}