/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, {Component} from 'react';
import codePush from "react-native-code-push";
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';



 class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
    );
  }
}
let codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, 
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  deploymentKey: 'TDZ8fKIoiAbei1QCrbbsqgx8G9_f2b34545a-a86b-447c-acc0-b5b85a319bc0' 
}
App = codePush(codePushOptions)(App);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
