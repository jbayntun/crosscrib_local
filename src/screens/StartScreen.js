import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Button
            title="Local Game"
            onPress={() => navigation.navigate('Local')}
        />
        <Button
            title="Online Game"
            //onPress={() => navigation.navigate('Local')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default StartScreen;