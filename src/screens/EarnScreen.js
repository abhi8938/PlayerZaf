import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Header } from '../common';
import HeaderButton from '../common/HeaderButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EarnLibraryList from '../components/LibraryLists/EarnLibraryList';

export default class EarnScreen extends React.Component {
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
      <View style={styles.container}>
        <Image
                    source={require('../assets/images/refer2.jpg')} 
                    style={{
                        width:wp('100%'),
                        overflow: 'hidden'
                    }}
                    resizeMode={'contain'}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('3%'),
    padding:0,
    borderTopWidth: 0,
    backgroundColor: '#f2784a',
  },
});
