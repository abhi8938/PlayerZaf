import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
class ResultDetailsListItem extends Component {

    render() {
    return (
          
            <View style={styles.WinnerHeadingContainer}>
                       <View style={{ flex:1, flexDirection: 'row'}}>
                        <View style={styles.WinnerSections}>
                         <Text style={{ color:'#000'}}>{this.props.data.item.rank} </Text>
                        </View>
                        <View style={styles.WinnerSections}>
                         <Text style={{ color:'#000'}}>{this.props.data.item.playerName}  </Text>
                        </View>
                        </View>
                        <View style={{ flex:1, flexDirection: 'row', paddingLeft: 80,}}>
                        <View style={styles.WinnerSections}>
                         <Text style={{ color:'#000'}}>{this.props.data.item.totalKills} </Text>
                        </View>
                        <View style={styles.WinnerSections}>
                         <Text style={{ color:'#000'}}>₹{this.props.data.item.winnings}   </Text>
                        </View>
                        </View>
                    </View>    
        );
    }
}

const styles = {
    WinnerSections:{
        marginLeft:20,
        marginRight:20
    },
    WinnerHeadingText:{
      fontWeight: 'bold',
    },
    WinnerHeading:{
        flex: 1,
           alignItems: 'center',
           backgroundColor: '#FDC112',
           margin: 8,
           marginTop:0,
           marginBottom:0,
           height:30,
           paddingTop: 5,
           paddingBottom: 5,
           
    },
    WinnerHeadingContainer:{
         flex:1,
         flexDirection: 'row',
         margin: 8,
         marginTop:0,
         marginBottom: 0,
         height:50,
         alignItems: 'center',
         justifyContent:'center',
         backgroundColor: '#fff'
    },
};

export default ResultDetailsListItem;
