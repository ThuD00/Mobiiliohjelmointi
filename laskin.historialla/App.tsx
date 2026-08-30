import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState<number>();
  const [history, setHistory] = useState<string[]>([]);

  const handlePlus = () => {
    const num1 = parseFloat(number) 
    const num2 = parseFloat(number2) 

    if (isNaN(num1) || isNaN(num2)) return;

    const res = num1 + num2
    const calc = `${num1} + ${num2} = ${res}`
    
    setResult(res)
    //Uusi laskutoimitus listan alkuun
    setHistory([calc, ...history])
    setNumber('')
    setNumber2('')
  }

  const handleMinus = () => {
    const num1 = parseFloat(number)
    const num2 = parseFloat(number2)
    if (isNaN(num1) || isNaN(num2)) return;

    const res = num1 - num2
    const calc = `${num1} - ${num2} = ${res}`
    
    setResult(res)
    //Uusi laskutoimitus listan alkuun
    setHistory([calc, ...history])
    setNumber('')
    setNumber2('')
  }
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.resultText}>Result: {result}</Text>
        <TextInput 
          style={styles.input}
          placeholder = 'Enter first number here...'
          keyboardType='decimal-pad'
          onChangeText={setNumber}
          value={number}
        />
        <TextInput 
          style={styles.input}
          placeholder = 'Enter second number here...'
          keyboardType='decimal-pad'
          onChangeText={setNumber2}
          value={number2}
        />
        <View style={styles.buttonContainer}>
          <Button title="-" onPress={handleMinus}/>
          <Button title="+" onPress={handlePlus}/>
        </View>
        <Text style={styles.resultText}>History</Text>
        <FlatList 
            style={{ width: '90%', marginTop: 10, marginLeft: 35}}
            data={history}
            renderItem={({item}) => 
              <View style={styles.listView}>
                <Text style={styles.input}>{item}</Text>
              </View>
            }
          />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
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
    paddingTop: 30,
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
  },
  listView: {
    width: '90%', 
    marginTop: 10,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
