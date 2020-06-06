import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';

const EndRoundScreen = () => {
    const player1 = navigation.getParam('player1');
    const player2 = navigation.getParam('player2');

    return <View>
        <Text>Round Over!!  Everyone's a Winner :)</Text>

    </View>
};

const styles = StyleSheet.create({});

export default EndRoundScreen;