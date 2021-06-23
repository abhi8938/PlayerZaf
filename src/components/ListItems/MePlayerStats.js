import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from '../../common';


class MePlayerStats extends Component {
    render() {
        return (
                <View style={styles.MeListContainer}>
                    <Card>
                        <TouchableHighlight>
                        <View style={styles.PlayerStats}>
                            <View style={styles.playerStatSection}>
                                <Text style={styles.Result}>{this.props.details.matchesPlayed}  </Text>
                                <Text style={styles.Title}>Matches Played  </Text>
                            </View>
                            <View style={styles.playerStatSectionMiddle}>
                                <Text style={styles.Result}>{this.props.details.totalKills}</Text>
                                <Text style={styles.Title}>Total Kills  </Text>
                            </View>
                            <View style={styles.playerStatSection}>
                                <Text style={styles.Result}>₹ {this.props.details.amountWon}    </Text>
                                <Text style={styles.Title}>Amount Won  </Text>
                            </View>
                        </View>
                        </TouchableHighlight>
                    </Card>
                </View>
        );
    }
}


export default MePlayerStats;

const styles = {
    MeListContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        marginTop: hp('-6%'),
    },
    PlayerStats: {
        flex: 1,
        flexDirection: 'row',
        padding: wp('3%'),
        alignItems: 'center',
        borderRadius: 20

    },
    playerStatSection: {
        flex: 3,
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerStatSectionMiddle: {
        flex: 3,
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#ccc',
    },
    Result: {
        fontSize: hp('3%'),
        color: '#f2784a',
        fontWeight: '800',
    },
    Title: {
        fontSize: hp('2%'),
        marginTop: 5,
        color: '#404549',
        fontWeight: '500',
    }

};