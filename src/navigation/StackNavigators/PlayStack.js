
import { Icon } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PlayScreen from '../../screens/PlayScreen';
import MatchDetailScreen from '../../screens/MatchDetails';
import OnJoinScreen from '../../screens/OnJoinScreen';
import { fromLeft } from 'react-navigation-transitions'



export const PlayStack = createStackNavigator({
    Play:{
     screen:PlayScreen,
    
    },
  MatchDetails: MatchDetailScreen,
  OnJoin: OnJoinScreen
}
  );
  
  PlayStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = false;
    if (navigation.state.index == 0) {
      tabBarVisible = true;
    }
    return {
      tabBarVisible,
    };
  };