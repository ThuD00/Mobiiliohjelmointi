import { StatusBar } from 'expo-status-bar';
import { getDatabase, onValue, push, ref } from 'firebase/database';
import { app } from './firebaseConfig';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';

type Item = {
  product: string;
  amount: string;
}

const db = getDatabase(app);

export default function App() {
  const [productItem, setProductItem] = useState<Item>({} as Item);
  const [products, setProducts] = useState<Item[]>([]);
  
  useEffect(() => {
    //ref: Mene Firebase-tietokannan /items-kohtaan 
    //onValue: Kuuntele /items-kohtaa ja kerro 
    //minulle aina, kun sen data muuttuu
    onValue(ref(db, "/items"), (snapshot) => {
      //Tällä saadaan Firebaseen tallennettu varsinainen data
      const data = snapshot.val();
      if (data) {
        //Firebase antaa datan tuollaisena objektina, 
        //jossa on nuo satunnaiset ID:t
        setProducts(Object.values(data));
      }
      else {
        setProducts([]);
      }
      //console.log(Object.values(data));
    })
  }, []);

  const handleSave = () => {
    if (!productItem.product.trim()) {
      //alert
      Alert.alert("Error", "Input is empty!")
      return;
    }
    //Lisää productItem Firebase-tietokannan /items-kohtaan
    //push tekee automaattisesti uuden yksilöllisen ID:n
    push(ref(db, '/items'), productItem);
    setProductItem({
      product: "",
      amount: ""
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter product title'
        value={productItem.product}
        onChangeText={text => setProductItem({ ...productItem, product: text })}
      />
      <TextInput
        placeholder='Enter product amount'
        value={productItem.amount}
        onChangeText={text => setProductItem({ ...productItem, amount: text })}
      />
      <Button title='Save' onPress={handleSave}/>
      <FlatList 
       data={products}
       renderItem={({ item }) =>
        <View>
          <Text>{item.product}</Text>
          <Text>{item.amount}</Text>
        </View>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
