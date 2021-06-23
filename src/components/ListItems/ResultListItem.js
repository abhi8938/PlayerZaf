import React, { Component } from 'react';
import { View, StyleSheet,  Text, Linking, Image } from 'react-native';
import MatchCommon from '../MatchCommon';
import { Card } from '../../common';
import Button from '../../common/Button';
import { TouchableRipple } from 'react-native-paper';

class ResultListItem extends Component {
    renderOnJoined(data){
        if(data.item.Join == 'JOINED'){
            return(
                    <TouchableRipple
                        onPress={() => this.props.navigation.navigate('ResultDetails', {data})}
                        style={[styles.ViewResults, {borderColor: '#206398'}]}
                    ><Text style={{color:'#206398'}}>Joined  </Text>
                    </TouchableRipple>
            )
        }else{
            return(
                <TouchableRipple
                    onPress={() => this.props.navigation.navigate('ResultDetails', {data})}
                    style={[styles.ViewResults , {borderColor: '#BA110A'}]}
                ><Text style={{color:'#BA110A'}}>Not Joined  </Text>
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
        const { data } = this.props;
        const PosterLink = this.props.data.item.posterLink;
        return (
            <Card>
             {this.renderImage(PosterLink)}
                <MatchCommon data={data.item} />
                <View style={styles.buttonContainer} >
                <TouchableRipple
                        onPress={()=>{ Linking.openURL('https://www.youtube.com/channel/UCfa3WsdTtrZRP-4527nmGEQ')}}
                        style={styles.WatchMatch}
                    ><Text style={styles.watchButtonText}>Watch Match  </Text>
                    </TouchableRipple>
                    {this.renderOnJoined(data)}
                </View>
            </Card>
        );
    }
}

export { ResultListItem };

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