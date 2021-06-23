import React, { Component } from 'react';
import { Image, View } from 'react-native';

class EarnListItem extends Component {

    render() {
        
        return (
            <View style={styles.container} >
                <Image
                    source={require('../../assets/images/refer2.jpg')} 
                    style={{
                        width:'100%',
                        height: 250,
                        overflow: 'hidden'
                    }}
                    resizeMode={'contain'}
                />
            </View>
        );
    }
}

export { EarnListItem };

const styles = {
    container: {
        backgroundColor: '#7AC5CD',
        marginBottom: 15,
      
    }
};
