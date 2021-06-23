import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import{ Rect } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import { Header } from '../common';
import HeaderButton from '../common/HeaderButton';
import PlayLibraryList from '../components/LibraryLists/PlayLibraryList';
import { getPlayMatches, getUserCard} from '../ApiRequests/GetRequest';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class PlayScreen extends React.Component {
 
  constructor(props){
    super(props)
   this.state= {
        PlayMatches: [],
        loading:true,
    }

}

componentDidMount(){
    this.didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
       async payload => {
         this.setState({ loading: true});
         const user = await getUserCard();
         console.log(`user:${user.update}`);
         if (user.update == true){
           this.props.navigation.navigate('updateScreen');
         }else {
          const Matches = await getPlayMatches();
          const playMatches = [];
          Matches.forEach(element => {
                  playMatches.push(element);
          });
          this.setState({ PlayMatches:playMatches, loading:false});
        }
        }
      );
}
componentWillUnmount(){
  this.didBlurSubscription.remove();
}

  static navigationOptions = {
        headerTitle: <Header />,
        headerRight: <HeaderButton />,
        headerStyle: {
          backgroundColor: '#f2784a',
          elevation: 0,
          height: 60,
          margin: 0,
        
        }
        
    };
  

  render() {

              return (
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <PlayLibraryList loading={this.state.loading} data={this.state.PlayMatches} navigation={this.props.navigation} /> 
                </ScrollView>
            );
   
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2784a',
    borderTopWidth: 0,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  header: {
backgroundColor: '#f2784a'
  }
});
