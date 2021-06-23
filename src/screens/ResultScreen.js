import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '../common';
import HeaderButton from '../common/HeaderButton';
import { getResultMatches, getUserCard, getJoined } from '../ApiRequests/GetRequest';
import ResultLibraryList from '../components/LibraryLists/ResultLibraryList';


export default class ResultScreen extends React.PureComponent {
  constructor(props){
    super(props);
    this.state= {
        ResultMatches: [],
        loading:true
    }

}

 componentDidMount(){
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
           async payload => {
            this.setState({ loading:true});
    const Matches = await getResultMatches();
    const resultMatches = [];
    Matches.forEach(element => {
       resultMatches.push(element); 
    });
    resultMatches.sort(function(a, b){
      var keyA = (a.matchId).substring(6),
          keyB = (b.matchId).substring(6)
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA == keyB) return 1
      if(keyA > keyB) return 1;
      return 0;
  });
    this.setState({  ResultMatches: resultMatches,loading:false});
});
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
      borderBottomWidth: 0,
    }
    
  }

  render() {
    return (
     <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ResultLibraryList data={this.state.ResultMatches} loading={this.state.loading} navigation={this.props.navigation}  />
        </ScrollView>
      </View>
      );
  }
}

const styles = {
  container: {
    flex: 1,
    borderTopWidth: 0,
    backgroundColor: '#f2784a',
  },
  contentContainer: {
    paddingTop: 10,
  }
};
