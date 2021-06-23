import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import MeUsercard from '../ListItems/MeUserCard';
import MePlayerStats from '../ListItems/MePlayerStats';
import MeNavlist from '../ListItems/MeNavList';
import { getUserCard } from '../../ApiRequests/GetRequest';

class MeLibraryList extends PureComponent {  
    constructor(props){
        super(props)
        this.state={ 
            clientDetails: {},
            loading:true 
        }
    }
   
 componentDidMount(){
    this.didBlurSubscription = this.props.navigation.addListener(
        'willFocus',
       async payload => {
        this.setState({ loading:true});
   const client = await getUserCard();
    this.setState({ clientDetails: client});
    this.setState({ loading:false});
});
}
componentWillUnmount(){
    this.didBlurSubscription.remove();
}

    render() {
        return (
            <ScrollView>
                <MeUsercard details={this.state.clientDetails} />
                <MePlayerStats details={this.state.clientDetails} />
                <MeNavlist details={this.state.clientDetails} navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}
export default MeLibraryList;
