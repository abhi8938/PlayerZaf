import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableHighlight, FlatList, Modal, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getParticipants } from './../ApiRequests/GetRequest';

class MatchDetailScreen extends Component {
    static navigationOptions = {
        header:null
    };
   
    state ={
        players:[],
        visible: false,
        loading:false,
        modalVisible:false
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
    async getPlayerList(matchId){
        this.setModalVisible(!this.state.modalVisible);
        const playerList = await getParticipants(matchId);
        this.setState({ players: playerList.data, visible:!this.state.visible});
        this.setModalVisible(!this.state.modalVisible);
   }
   async getPlayerListAgain(matchId){
    this.setModalVisible(!this.state.modalVisible);
    const playerList = await getParticipants(matchId);
    this.setState({ players: playerList.data});  
    this.setModalVisible(!this.state.modalVisible); 
   }

renderListItem = (data) =>{
    const index = data.index + 1;
return(
    <View style={{flex:1}}>
        <Text>{index}. {data.item.playerName}</Text>
    </View>
)
}

   renderParticipants = (matchId) =>{
       if(!this.state.visible){
           return (  <View style={styles.participantLoadContainer}>
            <TouchableHighlight
            onPress = {()=>{this.getPlayerList(matchId)}}
            >
                <View style={styles.loadButton}>
                <Icon name = 'md-refresh'
                      color = {'#097275'}
                      size={24} 
                 />
            <Text style={styles.participantText}>LOAD PARTICIPANTS   </Text>
            </View>
            </TouchableHighlight> 
         </View>)
       } else {
           return(
               <View style={styles.participantContainer}>
                   <FlatList
                data={this.state.players}
                renderItem={this.renderListItem}
                keyExtractor={(data) => data._id.toString()}
            />
            </View>
           )
       }
   }

   renderBottomButton = (item,entryfee,matchId, participants) =>{
       if(item.matchStatus == 'OPEN' && participants <= 99 ){
       return(
        <TouchableHighlight
        onPress={() => this.props.navigation.navigate('OnJoin',{entryfee,matchId})}
        style={[styles.buttonBottom,{ backgroundColor:'#097275'}]}
        >
            <Text style={styles.buttonText}>Join Now  </Text>
        </TouchableHighlight>
       )
    }else{
        return(
            <TouchableHighlight
            disabled
            style={[styles.buttonBottom,{ backgroundColor:'#A9A9A9'}]}
            >
                <Text style={styles.buttonText}>Match Full </Text>
            </TouchableHighlight>
           )
    }
   }
    render() {
        const { item } =this.props.navigation.state.params.data;
        const entryfee = this.props.navigation.state.params.data.item.matchEntryFee
        const matchId = this.props.navigation.state.params.data.item.matchId
        const participants = item.matchParticipants;
        const refresh = this.state.visible ? (
            <View style={styles.refreshContainer}>
            <TouchableHighlight
            onPress={() => {this.getPlayerListAgain(matchId)}}
            style={styles.refreshButton}
            >
            <View style={styles.refreshButton}>
            <Icon name = 'md-refresh'
                  color = {'#000'}
                  size = {16} />
             <Text style={{ paddingLeft:4}}>Refresh</Text>
             </View>
            </TouchableHighlight>
        </View>
        ):null; 
     
        return (
          <View>
            <ScrollView style={{ height:hp('90.6%') }}>
            <View style={{ flex:1, backgroundColor: '#5f5f5'}}>
                <View style={styles.Container}>
                    <View style={styles.BannerContainer}>
                        <Image
                           source={{uri: 'https://cultureofgaming.com/wp-content/uploads/2018/01/PUBG-Banner.jpg'}}
                            style={{
                               width:wp('100%'), 
                               height:hp('33%'),
                            //    overflow:'hidden',
                               padding: 0,
                            }}
                           resizeMode={'stretch'}
                        />
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.Title}>{item.matchTitle}-{item.matchId}</Text>
                    </View>
                    <View style={styles.firstContainer}>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Type: </Text>
                              <Text style={styles.value}>{item.matchType} </Text>
                          </Text>
                        </View>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Version: </Text>
                              <Text style={styles.value}>{item.matchVersion} </Text>
                          </Text>
                        </View>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Map: </Text>
                              <Text style={styles.value}> {item.matchMap}   </Text>
                          </Text>
                        </View>
                    </View>
                    <View style={styles.secondContainer}>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Match Type: </Text>
                              <Text style={styles.value}> Paid </Text>
                          </Text>
                        </View>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>EntryFee: ₹</Text>
                              <Text style={styles.value}>{item.matchEntryFee} </Text>
                          </Text>
                        </View>
                    </View>
                    <View style={styles.secondContainer}>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Match Schedule: </Text>
                              <Text style={styles.value}>{item.matchDate} at {item.matchTime}     </Text>
                          </Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.Title}>Prize Details </Text>
                    </View>
                    <View style={styles.secondContainer}>
                    <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Winning Prize: ₹</Text>
                              <Text style={styles.value}> {item.matchWinPrize} </Text>
                          </Text>
                        </View>
                        <View style={styles.element}>
                          <Text>
                              <Text style={styles.label}>Per Kill: ₹</Text>
                              <Text style={styles.value}> {item.matchPerkill}  </Text>
                          </Text>
                        </View>
                        </View>
                        <View style={styles.titleContainer}>
                        <Text style={styles.Title}>About this Match </Text>
                    </View>
                    <View style={styles.guidlinesContainer}>
                        <Text style={styles.guidelines}>• If in anyway you failed to join the room by the match start time then we are not responsible for it. Refund in such cases would not be processed. So make sure to join on time. </Text>
                        <Text style={styles.guidelines}>• Do not share the room ID and password with anyone who has not joined the match. If you are found doing so, your account may get terminated and all the winnings will be lost. </Text>
                        <Text style={styles.guidelines}>• Griefing at teaming is against the game rules any participant found doing so will be disqualified and their prizes will be lost. </Text>
                        <Text style={styles.guidelines}>• Room ID and Password will be shared through SMS as well as in the app  before 15 minutes of the match start time. </Text>
                        <Text style={styles.guidelines}>• Match will start after 15 minutes of Sharing Room ID and Password. </Text>
                        <Text style={styles.guidelines}>• Make sure to grab ID and Password before the match start time. </Text>
                        <Text style={styles.guidelines}>• Make sure you join the match Room ASAP, before the match starts. </Text>
                        <Text style={styles.guidelines}>• This match is paid match. To participate, you have to pay the entry fee amount. There are total 100 spots available. Join it before all the spots are filled. </Text>
                        <Text style={styles.guidelines}>• Please note that the listed entry fee is per individual and not the squad / duo team. </Text>
                        <Text style={styles.guidelines}>• Spots are given on the first come first basis. </Text>
                        <Text style={styles.guidelines}>• Last standing man gets the chicken dinner award. </Text>
                        <Text style={styles.guidelines}>• You will be also rewarded for each kill.  Check the rewards details above. </Text>
                        <Text style={styles.guidelines}>• Use only mobile device to join the match do not use any hacks or emulators. </Text>
                        <Text style={styles.guidelines}>• If anyone found violating these rules then immediate action will be taken and respective account may get banned and rewards may be abandoned. </Text>
                        <Text style={styles.guidelines}>• If you have any queries please contact us on support@playerzaf.com </Text>
                        <Text style={styles.guidelines}>• Also if you want to arrange give away or sponsor any such match then drop us a mail at contact@playerzaf.com </Text>
                    </View>
                    <View style={styles.titleContainer}>
                    <View style={{ flex:1}}>
                        <Text style={styles.Title}>Participants</Text>
                        </View>
                       {refresh}
                    </View>
                  {this.renderParticipants(item.matchId)}
                    </View>
            </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
            {this.renderBottomButton(item, entryfee, matchId, participants)}
            </View>
            <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
              }}>
                <View style={styles.modalView}>
                    <ActivityIndicator
                     color = '#000'
                     size = "large"
                     style = {styles.activityIndicator}/>
                    <Text style={styles.loaderText}>Just a sec  </Text>
                </View>
              </Modal>
           </View>
        );
    }
}

export default MatchDetailScreen;

const styles = StyleSheet.create({
      loaderText:{
        fontSize:14,
        color:'#000',
        fontWeight:'400'
      },
      activityIndicator: {
          margin:0,
          padding:0,
   },
    modalView:{
        height:hp('8%'),
        width: wp('28%'),
        flexDirection:'row',
        marginLeft: wp('39%'),
        marginTop: hp('38%'),
        elevation: 5,
        backgroundColor:'#fff',
        padding:wp('5%'),
        justifyContent:'center',
        borderRadius:7
      },
    refreshButton:{
     height:hp('3%'),
     flexDirection:'row',
    },
    refreshContainer:{
        flex:1,
        alignItems:'flex-end',
        paddingTop:5,
        paddingRight:10
     },
    participantContainer:{
         paddingBottom:20
    },
    Container:{
        marginTop:0,
        paddingTop:0,
    },
    BannerContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f2784a',
        marginBottom: hp('2%'),
        padding: 0,
        margin: 0
    },
    Title:{
        color:'#097275',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleContainer:{
        flex:1,
        flexDirection:'row',
      paddingTop:10,
      paddingBottom: 5,
    },
    dataContainer:{
        paddingLeft:10
    },
    firstContainer:{
        flexDirection:'row',
        paddingBottom:5,
        marginBottom:5
    },
    element:{
        backgroundColor:'#fff',
        alignItems:'center',
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
        elevation:2,
        padding:10,
        height: hp('6%'),
        marginRight: 5,
    },
    label:{
        fontSize:14
    },
    value:{
        fontSize:16,
        fontWeight:'bold'
    },
    secondContainer:{
        flexDirection:'row',
        paddingBottom:5,
        marginBottom:5
    },
    guidelines:{
        fontSize:13,
        marginBottom:8
    },
    participantLoadContainer:{
        alignItems:'center',
        paddingTop:15,
        paddingBottom:15
    },
    loadButton:{
     flexDirection: 'row',
     padding: 5,
     paddingLeft:10,
     paddingRight: 10,
     backgroundColor:'#ccc',
     alignItems:'center',
     borderRadius: 3,
     justifyContent:'center'
    },
    participantText:{
        fontSize:12,
        fontWeight:'bold',
        color:'#097275',
        paddingLeft:5,
    },
    buttonBottom:{
        height:hp('6%'),
       
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText:{
        color:'#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
