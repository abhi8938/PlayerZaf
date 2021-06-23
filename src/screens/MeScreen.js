import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MeLibraryList from '../components/LibraryLists/MeLibraryList';

export default class MeScreen extends React.Component {
  static navigationOptions = {
    header: null
    
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <MeLibraryList navigation= {this.props.navigation} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
