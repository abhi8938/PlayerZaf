import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, BackHandler, InteractionManager } from 'react-native';
import{ Rect } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import PlayListItem from '../ListItems/PlayListItem';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
class PlayLibraryList extends Component {

     renderItem = (data) => {
return (
        <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('MatchDetails', {data})}
        >
        <PlayListItem data={data} navigation={this.props.navigation} />
        </TouchableOpacity>
        );
     }

    render() {
      
        if(this.props.loading == true){
            return(
                <ContentLoader duration={2000} primaryColor="#F0F0F0" secondaryColor="#fff" height={700} width={wp('100%')}>
                <Rect   x="10" y="5" rx="4" ry="4" width={wp('95%')} height={hp('35%')} />
                <Rect x="10" y={hp('37%')} rx="5" ry="5" width={wp('95%')} height={hp('35%')} />
                <Rect x="10" y={hp('73.1%')} rx="5" ry="5" width={wp('95%')} height={hp('35%')} />
                </ContentLoader>
            )
        }else if(this.props.loading == false){
        return (
            <FlatList
                data={this.props.data}
                navigation={this.props.navigation}
                renderItem={this.renderItem}
                keyExtractor={(data) => data._id.toString()}
            />
        );
        }
    }
}

export default PlayLibraryList;
