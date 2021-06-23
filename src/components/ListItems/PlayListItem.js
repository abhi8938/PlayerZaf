import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../common/Button';
import MatchCommon from '../MatchCommon';
import { Card } from '../../common';

class PlayListItem extends Component {
    console
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
        const entryfee = this.props.data.item.matchEntryFee;
        const matchId = this.props.data.item.matchId;
        const participants = this.props.data.item.matchParticipants;
        const PosterLink = this.props.data.item.posterLink;
        const spots = 100 - participants;
    return (
            <Card>
                {this.renderImage(PosterLink)}
                <MatchCommon data={this.props.data.item} />
                <View style={styles.actionContainer}>
                    <View style={styles.progressbar}>
                        <ProgressBarAnimated
                            width={wp('50%')}
                            value={participants}
                            height={6}
                            underlyingColor="#ccc"
                            borderRadius={0}
                            borderColor="#fff"
                            backgroundColor='#fed766'
                            backgroundColorOnComplete='#fed766'
                        />

                        <View style={styles.underBarView}>
                            <View style={styles.underBarView1}>
                            <Text 
                            style={styles.underBarLeft}
                            >Only {spots} spots left</Text>
                            </View>
                            <View style={styles.underBarView2}>                     
                                  <Text style={styles.underBarRight}>{participants}/100</Text>
                             </View>      
                        </View>
                    </View>
                    <Button
                    participants ={participants}
                     onPress={() => this.props.navigation.navigate('OnJoin', {entryfee, matchId, participants})}
                         />
                </View>
            </Card>
        );
    }
}

const styles = {
    underBarView1:{
        flex: 2
    },
    underBarView2:{
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: wp('2%'),
    },
    underBarView: {
        flex: 1,
        flexDirection: 'row',
    },
    underBarRight:{
        alignSelf: 'flex-end',
        fontSize: hp('1.5%'),
        padding: wp('1%'),
    },
    underBarLeft: {
        fontSize: hp('1.5%'),
        padding: wp('1%'),
    },
    progressbar: {
        flex: 2,
        marginLeft: wp('2%'),
        paddingTop: hp('2%'),
        paddingLeft: wp('5%'),
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
    },
    joinButton: {
        flex: 1,
        width: wp('6%'),
        height: hp('4%'),
        marginRight: wp('1.5%'),
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
    }
};

export default PlayListItem;
