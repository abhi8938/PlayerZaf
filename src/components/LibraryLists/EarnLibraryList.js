import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { EarnListItem } from '../ListItems';

class EarnLibraryList extends Component {
     renderItem(Earn) {
        return <EarnListItem Earn={Earn} />;
     }

    render() {
        
        return (
            <FlatList
                data={this.props.Earn}
                renderItem={this.renderItem}
                keyExtractor={(Earn) => Earn.id.toString()}
            />
        );
    }
}

export default EarnLibraryList;
