import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");

  const handlePlus = () => {
    const num1 = parseFloat(number) 
    const num2 = parseFloat(number2) 
    setResult(String(num1 + num2));
  }

  const handleMinus = () => {
    const num1 = parseFloat(number)
    const num2 = parseFloat(number2)
    setResult(String(num1 - num2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Result: {result} </Text>
      <TextInput 
        style={styles.input}
        placeholder = 'Enter some number here...'
        keyboardType='decimal-pad'
        onChangeText={setNumber}
        value={number}
      />
      <TextInput 
        style={styles.input}
        placeholder = 'Enter some number here...'
        keyboardType='decimal-pad'
        onChangeText={setNumber2}
        value={number2}
      />
      <View style={styles.buttonContainer}>
        <Button title="-" onPress={handleMinus}/>
        <Button title="+" onPress={handlePlus}/>
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
  resultText: {
    fontSize:25, 
    fontWeight:'bold'
  },
  input: {
    fontSize:20,
    padding: 10,
  
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '20%',
    
  }
});
