import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image, PermissionsAndroid, Modal} from 'react-native';
// import PushNotificationWorker from './PushNotificationWorker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RNFS from 'react-native-fs';
import ReactNativeAPK  from 'react-native-apk';
import AnimatedLoader  from 'react-native-animated-loader';
import { getUserCard } from '../ApiRequests/GetRequest';
import { updatedApp } from './../ApiRequests/PostRequests';
async function requestWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Write Permission',
        message:
          'Cool Photo App needs access to your Write ' +
          'so you can take awesome pictures.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Write');
    } else {
      console.log('Write permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
async function requestReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Read Permission',
        message:
          'Cool Photo App needs access to your Read ' +
          'so you can take awesome pictures.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Read');
    } else {
      console.log('Read permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
export default class update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDone: false,
      progress:0,
      modalVisible:false,
      loading:false
    };
  }
  downloadFileProgress = (data) =>{
    const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
    if(this.state.progress != percentage){
    this.setState({ progress:percentage},()=>{
      console.log(`${this.state.progress}%`)
    })
  }else{
    return
  }
    
    if(percentage == 100){
      console.log('completed');
    } //call another function here
  }
  downloadFileBegin = () =>{
    this.setState({modalVisible:true, loading:false});
    console.log("Download Begin");
  }
  componentDidMount() {
    // PushNotificationWorker();
    console.log(`file://${RNFS.ExternalDirectoryPath}/com.playerzaf.apk`)
  }

  onDownloadImage = async () =>{
  await requestWritePermission();
  await requestReadPermission();
  this.setState({ loading:true});
  RNFS.downloadFile({
    fromUrl: 'http://playerzaf.com/download/PlayerZaf.apk',
    toFile: `${RNFS.ExternalDirectoryPath}/com.playerzaf.apk`,
    begin: this.downloadFileBegin,
    progress: this.downloadFileProgress,
  }).promise.then(async (r) => {
    console.log(r);
    if(r.statusCode == 200){
      this.setState({ isDone: true, modalVisible:false, loading:true });
      const user = await getUserCard();
      const update = await updatedApp(false, user.userName);
      this.setState({ isDone: true, modalVisible:false, loading:false });
      console.log(update);
     ReactNativeAPK.installApp(`${RNFS.ExternalDirectoryPath}/com.playerzaf.apk`);  
  }else{
    this.setState({ modalVisible:false});
    alert('Download Failed');
  }
  });
  }
  render() {
    return (

      <View style={{ flex:1, alignItems:"center", justifyContent:'space-evenly', padding:20, backgroundColor:'#f2784a'}}>
      <View style={{ flex:2, paddingTop:hp('20%')}}>
       <Text style={styles.heading}>New Update</Text>
       <Text style={[styles.heading, {fontSize:wp('6%')}]}>Version 2.1</Text>
       </View>
       <View style={styles.updateSection}>
       <Text style={styles.guidelines}>• Required Update</Text>
       <Text style={styles.guidelines}>• Design update</Text>
       <Text style={styles.guidelines}>• Notification Integrated</Text>
       <Text style={styles.guidelines}>• Bug Fixes</Text>
       <Text style={styles.guidelines}>• Code Optimized</Text>
       </View>
       <View style={styles.actionContainer}>
       <TouchableOpacity
       onPress={this.onDownloadImage}
       style={styles.notNow}
       >
         <Text style={[styles.buttonText, { borderColor: '#23283B'}]}>Update</Text>
       </TouchableOpacity>
       </View>
       <AnimatedLoader
                visible={this.state.loading}
                overlayColor="rgba(58, 104, 121,0.55)"
             animationStyle={styles.lottie}
            speed={1}
            source={require('../assets/svg/animate2.json')}
            />
       <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          >
                <View style={styles.modalView}>                
                   <Text style={styles.loaderText}>Downloading({this.state.progress}%)</Text>
                </View>
              </Modal>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie:{
    width:wp('25%'),
    height:hp('12%')
  },
  loaderText:{
    fontSize:wp('5.3%'),
    fontWeight:'800',
    color:'#000',
    fontWeight:'400'
  },
  activityIndicator: {
      margin:0,
      padding:0,
},
modalView:{
    height:hp('9%'),
    width: wp('53%'),
    flexDirection:'row',
    marginLeft: wp('25%'),
    marginTop: hp('40%'),
    elevation: 5,
    backgroundColor:'#F0F0F0',
    padding:wp('3%'),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7
  },
  updateSection:{
    width:wp('85%'),
    flex:3,
    alignItems:'flex-start'
},
guidelines:{
  fontWeight:'500',
  fontSize:20,
  marginBottom:8
},
actionContainer:{
  flex:2,
  flexDirection: 'row',
  width:wp('85%'),
  paddingBottom: 15,
},
buttonText:{
 fontSize:wp('5%'),
 fontWeight:'400',
 color:'#000'
},
notNow:{
  flex:1,
    height: hp('6%'),
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 2,
    alignItems: 'center',
    margin: 5
},
heading:{
  fontSize:wp('8%'),
  color:'#000000',
  fontWeight:'600'
}
});