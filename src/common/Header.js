import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


class Header extends React.Component {
    render() {
      return(
           <View style={styles.header}> 
           <Image
                  source={require('../assets/images/newIcon.png')}
                  style={styles.headerlogo} 
            />
            <Text style={styles.headerTitle}>PlayerZaf</Text>
            </View>
      );    
}

}

export { Header };

const styles = StyleSheet.create({
       header: { 
            flexDirection: 'row',
            paddingLeft: 18,
            alignItems: 'center',
            borderWidth:0
       },
       headerlogo: {
            width: 35, 
            height: 35
      },
      headerTitle: {
        paddingLeft: 13,
        fontSize: 21,
        fontWeight:'400',  
        color:'#404549'
      },

});
