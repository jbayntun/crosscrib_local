import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const StartScreen = ({ navigation }) => {
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, margin: 25}}>Enter Player Names: </Text>
        <View style={styles.input}>
            <TextInput
                style={styles.content}
                placeholder="Player 1"
                value={player1}
                onChangeText={(text) => setPlayer1(text)}
                autoCorrect={false}
                autoFocus={true}
                maxLength={12}
            />
        </View>
        <View style={styles.errorHolder}>
            {(player1 === '') ? <Text style={styles.error}>Player name can't be empty!</Text>:null}
        </View>
        <View style={styles.input}>
            <TextInput
                style={styles.content}
                placeholder="Player 2"
                value={player2}
                onChangeText={(text) => setPlayer2(text)}
                autoCorrect={false}
                maxLength={12}
            />
        </View>
        <View style={styles.errorHolder}>
            {(player2 === '') ? <Text style={styles.error}>Player name can't be empty!</Text>:null}
        </View>
        <Button
            title="    Let's Go!    "
            onPress={() => {
                if(player1 && player2)
                {
                    navigation.navigate('Local', {player1: player1, player2: player2})
                }
                if(player1 == null)
                {
                    setPlayer1('');
                }

                if(player2 == null)
                {
                    setPlayer2('');
                }
            }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F0EEEE',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 5,
    flexDirection: 'row',
  },
  content: {
    margin: 2,
    fontSize: 24,
    padding: 1,
    flex: 1,
  },
  error: {
      backgroundColor: '#ffc1cc',
      width: '90%',
      borderRadius: 5,
      padding: 4,
  },
  errorHolder: {
    height:'6%',
    marginHorizontal: 10,
    marginVertical: 6,
    }
});

export default StartScreen;