import { useState } from "react";
import { Button, FlatList, TextInput, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Repository = {
  id: number;
  full_name: string;
  description: string;
}

export function GitFinder () {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  
  //console.log(repositories)

  const handleFetch = () => {
    setLoading(true);
    //console.log(keyword); testi et toimiiko käyttäjä input
    //uudempi tapa:
    //fetch(`${process.env.EXPO_PUBLIC_API_URL}${keyword}`)
    fetch(process.env.EXPO_PUBLIC_API_URL + "?q=" + keyword)
    //console.log(response) testi
    .then(response => {
      if (!response.ok) {
        throw new Error("Something went wrong in fetch");
      }
      return response.json();
    })
    .then(data => setRepositories(data.items))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  }

  return (
    <SafeAreaView style={{ marginHorizontal:15}}>
      <TextInput 
        placeholder="Enter keyword..."
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Search" disabled={loading} onPress={handleFetch}/>
      {
        loading ?
        <ActivityIndicator size="large"/>
        //justifyContent center nii saa sen keskelle
      :
        <FlatList 
          data={repositories}
          renderItem={({ item }) => 
            <View style={{marginBottom: 10}}>
              <Text style={styles.titleText}>{item.full_name}</Text>
              <Text>{item.description}</Text>
            </View>
          }
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
})