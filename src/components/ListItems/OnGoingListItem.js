import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Linking } from 'react-native';
import MatchCommon from '../MatchCommon';
import { Card } from '../../common';
import { TouchableRipple } from 'react-native-paper';

class OnGoingListItem extends Component {
    
    renderOnJoined(data){
        if(data.item.Joined == true){
          return ( 
          <TouchableRipple
            onPress={this.props.onPress}
            style={styles.ViewResults}
        ><Text style={{color:'#000'}}>Show Room Id And Password </Text>
        </TouchableRipple>
        );
        }else{
        return(
                <TouchableRipple
                    onPress={()=>{ Linking.openURL('https://www.youtube.com/channel/UCfa3WsdTtrZRP-4527nmGEQ')}}
                    style={styles.ViewResults}
                ><Text style={styles.viewButtonText}>Spectate  </Text>
                </TouchableRipple>
        )
    }
}
renderImage(PosterLink){
    if(PosterLink == undefined){
        return null;
    }else if(PosterLink != undefined){
        return(
           <Image
           style={{ width:wp('93.8%'), height:hp('28%')}}
               source={{uri: PosterLink}}
           />
        )
    }
}

    render() {
        const PosterLink = this.props.data.item.posterLink;
          return (
            <Card>
             {this.renderImage(PosterLink)}
                <MatchCommon data={this.props.data.item} />
                <View style={styles.buttonContainer} >
             
                    {this.renderOnJoined(this.props.data)}
                </View>
            </Card>
        );
    }
}

export { OnGoingListItem };

const styles = StyleSheet.create({
    buttonContainer: {
               flex:1,
               flexDirection: 'row',
               paddingBottom: 13,
               paddingTop: 10,
    },
    ViewResults: {
        flex:1,
        height: 32,
        marginRight: 13,
        marginLeft:5,
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
    },
    ButtonText: {
        fontWeight: '500',
        color: '#206398'
    },
    WatchMatch:{
        flex:1,
        height: 32,
        marginLeft: 13,
        marginRight:5,
        backgroundColor: '#228B22',
        justifyContent: 'center',
        borderRadius: 3,
        alignItems: 'center',
    },
    watchButtonText:{
        color:'#fff'
    }
});