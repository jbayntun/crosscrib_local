import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const StartScreen = ({ navigation }) => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

  return (
    <View style={styles.container}>
        <View style={styles.input}>
            <Text style={styles.content}>Player 1: </Text>
            <TextInput
                style={styles.content}
                placeholder="Name"
                value={player1}
                onChangeText={(text) => setPlayer1(text)}
                autoCorrect={false}
            />
        </View>
        <View style={styles.input}>
            <Text style={styles.content}>Player 2: </Text>
            <TextInput
                style={styles.content}
                placeholder="Name"
                value={player2}
                onChangeText={(text) => setPlayer2(text)}
                autoCorrect={false}
            />
        </View>
        <Text></Text>
        <Button
            title="Let's Go!"
            onPress={() => navigation.navigate('Local', {player1: player1, player2: player2})}
            style={styles.button}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F0EEEE',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 15,
    padding: 5,
    flexDirection: 'row',
  },
  content: {
    margin: 2,
    fontSize: 24,
    padding: 1,
    flex: 1,
  },
  button:{
    marginHorizontal: 15,
    marginVertical: 30,
  }
});

export default StartScreen;