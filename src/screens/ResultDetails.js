import React, { PureComponent } from 'react';
import { FlatList, View, StyleSheet, ScrollView, Text } from 'react-native';
import { CardSection, Spinner } from '../common';
import { getResult } from '../ApiRequests/GetRequest';
import ResultDetailsListItem from '../components/ListItems/ResultDetailsListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
class ResultDetails extends PureComponent {
  
    state = {
        PlayerResults: [],
        loading:true
    }
    async componentDidMount(){
       this.setState({loading:true});
    const matchId= this.props.navigation.state.params.data.item.matchId;
    const result = await getResult(matchId);
    var playerResult = result.playerResults;
    playerResult.sort(function(a, b){
        var keyA = parseInt(a.rank),
            keyB = parseInt(b.rank);
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA == keyB) return 1
        if(keyA > keyB) return 1;
        return 0;
    });
    this.setState({ PlayerResults: playerResult, loading:false});
    }
    renderPlayerList = (data) =>{
        return <ResultDetailsListItem data={data} />
         
    }
    renderWinnerList = (data) =>{
       
        if(data.item.winner == true){
            return <ResultDetailsListItem data={data} />
        }   
  }
    render() {
        const { item } = this.props.navigation.state.params.data;
        return (
            <ScrollView style={{flex:1}}>

                <View style={styles.container}>

                    <View style={styles.titleContainer}>
                        <View style={styles.title} >
                            <Text style={styles.titleText}>{item.matchTitle}  -{item.matchId}    </Text>
                        </View>
                        <View style={styles.Date}>
                            <Text style={styles.dateText}>Organised on {item.matchDate} at {item.matchTime}</Text>
                        </View>
                    </View>
                    <View style={styles.detailSecondRow}>
                        <View style={styles.detailSection}>
                            <Text style={styles.subtitle}>WIN PRIZE</Text>
                            <Text style={styles.title}>₹{item.matchWinPrize}  </Text>
                        </View>
                        <View style={styles.detailSection}>
                            <Text style={styles.subtitle}>PER KILL</Text>
                            <Text style={styles.title}>₹{item.matchPerkill}   </Text>
                        </View>
                        <View style={styles.detailSection}>
                            <Text style={styles.subtitle}>ENTRY FEE</Text>
                            <Text style={styles.title}>₹{item.matchEntryFee}  </Text>
                        </View>
                    </View>
                    <View style={styles.WinnerSection}>
                        <View style={styles.WinnerHeading}>
                            <Text style={styles.WinnerHeadingText}>
                                WINNER WINNER CHICKEN DINNER
                        </Text>
                        </View>
                        <View style={styles.WinnerHeadingContainer}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: wp('4%') }}>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>#</Text>
                                </View>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Player Name</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: wp('10%'), }}>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Kills </Text>
                                </View>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Winnings </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                        <FlatList
                          data={this.state.PlayerResults}
                          renderItem={this.renderWinnerList}
                          keyExtractor={(data) => data._id.toString()}
                         />
                        </View>
                    </View>
                    <View style={styles.WinnerSection}>
                        <View style={styles.WinnerHeading}>
                            <Text style={styles.WinnerHeadingText}>FULL RESULT   </Text>
                        </View>
                        <View style={styles.WinnerHeadingContainer}>
                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10, }}>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>#</Text>
                                </View>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Player Name</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 50, }}>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Kills </Text>
                                </View>
                                <View style={styles.WinnerSections}>
                                    <Text style={{ color: '#fff' }}>Winnings </Text>
                                </View>
                            </View>
                        </View>
                        <View>  
                        <FlatList
                          data={this.state.PlayerResults}
                          renderItem={this.renderPlayerList}
                          keyExtractor={(data) => data._id.toString()}
                         />
                        </View>

                    </View>

                </View>

            </ScrollView>
        )
    }
}

export default ResultDetails;


const styles = StyleSheet.create({
    WinnerSections: {
        marginLeft: 20,
        marginRight: 20
    },
    WinnerHeadingText: {
        fontWeight: 'bold',
    },
    WinnerHeading: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E2AD38',
        margin: 8,
        marginBottom: 0,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
    },
    WinnerHeadingContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 8,
        marginTop: 0,
        marginBottom: 0,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#097275'
    },
    container: {
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2784a'
    },
    detailSecondRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        margin: 8,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: '#fff',
        elevation: 5
    },
    detailSection: {
        flex: 3,
        height: 50,
        paddingTop: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        paddingBottom: 4,
        paddingTop: 5,
    },
    subtitle: {
        fontSize: 13,
        color: '#808080'
    },
    titleContainer: {
        alignItems: 'center',
        margin: 8,
        backgroundColor: '#fff',
        paddingTop: 4,
        paddingBottom: 5,
        justifyContent: 'center',
        elevation: 5
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
});

