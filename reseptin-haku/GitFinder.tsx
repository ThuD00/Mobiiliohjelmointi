import { useState } from "react";
import { ActivityIndicator, StyleSheet, Button, FlatList, TextInput, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Repository = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function GitFinder() {

  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
   //return console.log(keyword);
   fetch(process.env.EXPO_PUBLIC_API_URL + "?i=" + keyword)
   .then(response => {
    if (!response.ok) {
      throw new Error("Something went wrong in fetch");
    }
    return response.json();
   })
   .then(data => setRepositories(data.meals))
   .catch(err => console.log(err))
   .finally(() => setLoading(false))
  }

  return (
    <SafeAreaView>
      <TextInput style={styles.input}
      placeholder="Type ingredient"
      value={keyword}
      onChangeText={text => setKeyword(text)}
      />
      <Button title="Search" disabled={loading} onPress={handleFetch}/>
      
      {
        loading ?
        <ActivityIndicator size="large"/>
      :
      <FlatList style={styles.list}
        data={repositories}
        renderItem={({ item }) =>
          <View style={styles.view}>
            <Text style={styles.titleText}>{item.strMeal}</Text>
            <Image 
              source={{ uri: item.strMealThumb}}
              style={styles.image}
            />
          </View>
        }
      />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 50,
  },
  input: {
    fontSize: 17,
    textAlign: "center"
  },
  view: {
    marginBottom: 20
  },
  image: {
    width: 250,
     height: 150 
  }
})