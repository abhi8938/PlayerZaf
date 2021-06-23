import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) =>{
return(
    <View style={styles.spinnerStyle}>
        <ActivityIndicator color='#000' size={props.size}/>
    </View>
)
}

// navigation prop
export { Spinner };

const styles = {
   spinnerStyle:{
       flex: 1,
       justifyContent: 'center',
       alignItems:'center'
   }
}