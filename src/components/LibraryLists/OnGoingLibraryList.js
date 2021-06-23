import React, { Component } from 'react';
import { FlatList , TouchableOpacity, } from 'react-native';
import{ Rect } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import { OnGoingListItem } from '../ListItems';
import { getOngoingMatches } from '../../ApiRequests/GetRequest';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
class OnGoingLibraryList extends Component {
   
    state= {
        OngoingMatches: [],
        loading:true
    }

    componentDidMount(){
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
           async payload => {
            this.setState({ loading:true});
        const Matches = await getOngoingMatches();
        const ongoingMatches = [];
        Matches.forEach(element => {
                ongoingMatches.push(element);
        });
       this.setState({ OngoingMatches: ongoingMatches})
       this.setState({ loading:false});
    });
        }
        
    componentWillUnmount(){
        this.didBlurSubscription.remove();
    }



     renderItem = (data) => {
        return (
            <TouchableOpacity 
            activeOpacity={0.3}
            onPress={() => this.props.navigation.navigate('MatchDetails', {data})}
            >
        <OnGoingListItem data={data} />
        </TouchableOpacity>
        );
     }

    render() {
      
        if(this.state.loading == true){
            return(
                <ContentLoader duration={2000} primaryColor="#F0F0F0" secondaryColor="#fff" height={700} width={wp('100%')}>
                <Rect x="10" y="5" rx="4" ry="4" width={wp('95%')} height={hp('35%')} />
                <Rect x="10" y={hp('37%')} rx="5" ry="5" width={wp('95%')} height={hp('35%')} />
                <Rect x="10" y={hp('73.1%')} rx="5" ry="5" width={wp('95%')} height={hp('35%')} />
                </ContentLoader>
            )
        }else if(this.state.loading == false){
        return (
            <FlatList
                data={this.state.OngoingMatches}
                navigation={this.props.navigation}
                renderItem={this.renderItem}
                keyExtractor={(data) => data._id.toString()}
            />
        );
        }
    }
}


export default OnGoingLibraryList;
