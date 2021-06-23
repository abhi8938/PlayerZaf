import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Header } from '../common';
import HeaderButton from '../common/HeaderButton';
import OnGoingLibraryList from '../components/LibraryLists/OnGoingLibraryList';

export default class OngoingScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header />,
    headerRight: <HeaderButton />,
    headerStyle: {
      backgroundColor: '#f2784a',
      elevation: 0,
      height: 60,
      margin: 0,
    }
    
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <OnGoingLibraryList navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    borderTopWidth: 0,
    backgroundColor: '#f2784a',
  },
});
