import React from 'react';
import { TouchableHighlight, Text,View } from 'react-native';

class Button extends React.Component {

    renderButton(participants){
        
        if(participants >= 100){
       //Match Full     
          return(
             <TouchableHighlight
              disabled={true}
              style={styles.fullButton}
          >
          <Text style={styles.fullButtonText}>MATCH FULL</Text>
          </TouchableHighlight>
          );
        }else{
          //Join
          return(
            <TouchableHighlight
            onPress={this.props.onPress}
            style={styles.joinButton}
        ><Text style={styles.ButtonText}>Join</Text>
        </TouchableHighlight>
          );
        }
      }
    
    render() {
        return this.renderButton(this.props.participants);
    }
}

// navigation prop
export default Button;

const styles = {
    joinButton: {
        flex: 1,
        width: 40,
        height: 32,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderColor: '#206398',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
    },
    ButtonText: {
        fontWeight: '500',
        color: '#206398'
    },
    fullButton:{
        flex: 1,
        width: 40,
        height: 32,
        marginRight: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: '#A9A9A9'
    },
    fullButtonText:{
        fontWeight: '500',
        color: '#fff'
    }
}