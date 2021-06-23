import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardSection } from '../common';


class MatchCommon extends Component {
    render() {
        return (
            <View style={styles.container}>
            <CardSection>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/splash2.png')}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{this.props.data.matchTitle} {this.props.data.matchId}     </Text>
                    <Text style={styles.subtitle}>{this.props.data.matchDate} {this.props.data.matchTime}  </Text>
                </View>
            </CardSection>

            <CardSection>
                <View style={styles.detailSecondRow}>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>WIN PRIZE</Text>
                        <Text style={styles.title}>₹ {this.props.data.matchWinPrize}  </Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>PER KILL</Text>
                        <Text style={styles.title}>₹ {this.props.data.matchPerkill}  </Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>ENTRY FEE</Text>
                        <Text style={styles.title}>₹ {this.props.data.matchEntryFee}   </Text>
                    </View>
                </View>
            </CardSection>
            <CardSection>
                <View style={styles.detailSecondRow}>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>TYPE</Text>
                        <Text style={[styles.title,{ paddingLeft:wp('3%')}]}>{this.props.data.matchType}   </Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>VERSION</Text>
                        <Text style={styles.title}>{this.props.data.matchVersion}  </Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.subtitle}>MAP</Text>
                        <Text style={styles.title}>{this.props.data.matchMap}  </Text>
                    </View>
                </View>
            </CardSection>
            </View>
        );
    }
}

export default MatchCommon;

const styles = {
    container:{
backGroundColor: '#F7F7F7'
    },
    detailsContainer: {
        justifyContent: 'center',
        paddingLeft: wp('2%'),
        paddingTop: hp('1%'),

    },
    imageContainer:{
        paddingLeft:2,
        paddingRight:3
    },
    icon: {
        marginTop: wp('4%'),
        marginLeft: wp('2%'),
        width: wp('14%'),
        height: hp('8%')
    },
    title: {
        fontSize: hp('2.8%'),
        fontWeight: '800',
        paddingBottom: hp('1%'),
        paddingTop: hp('1%'),
    },
    subtitle: {
        fontSize: hp('2%'),
        color: '#808080'
    },
    detailSecondRow: {
         flex: 1,
         flexDirection: 'row',
         alignItems: 'center', 
         marginTop: hp('2%'),
        },
    detailSection: {
        flex: 3,
        height: hp('7%'),
        alignItems: 'center'
    }
};
