import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [number, setNumber] = useState("");
  const [counter, setCounter] = useState(0);
  const [randomNumber, setRandomNumber] = useState(() => (Math.floor(Math.random() * 100) + 1));
  const [msg, setMsg] = useState("Guess a number between 1-100");
  const [gameover, setGameover] = useState(false);

  const handleGuess = () => {
    const num = parseInt(number, 10);

    if (isNaN(num)) {
      Alert.alert("Please enter a valid number");
      return;
    }

    const counts = counter + 1;
    setCounter(counts);

    if (num > randomNumber) {
      setMsg(`Your guess ${num} is too high`);
    } else if (num < randomNumber) {
      setMsg(`Your guess ${num} is too low`);
    } else {
      Alert.alert(`You guessed the number in ${counts} guesses`);
      setGameover(true);
    }

    setNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.msgText}>{msg}</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter a number'
        keyboardType='number-pad'
        onChangeText={setNumber}
        value={number}
      />
      <View style={styles.buttonContainer}>
        <Button title='Make Guess' onPress={handleGuess}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  msgText: {
    fontSize:20, 
    fontWeight:'bold'
  },
  input: {
    fontSize:20,
    padding: 10,
  
  },
  buttonContainer: {
    justifyContent: 'space-around',
    width: '50%',
  }
});
