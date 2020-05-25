import React from 'react';
import { Text, StyleSheet, View, FlatList} from 'react-native';

import Card from '../components/Card'

const spots = [{suit:'empty'},{suit:'empty'},{suit:'empty'},{suit:'empty'},{suit:'empty'}]

const CardRow = ({spots}) => {
    return (
        <View>
            <FlatList
                data={spots}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <Card suit={item.suit} value={item.value} id={item.id} />
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default CardRow;
