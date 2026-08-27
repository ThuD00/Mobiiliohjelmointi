import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Todo = {
  title: string;
  description: string;
}

export default function App() {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    description: ""
  })
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (!todo.title) {
      Alert.alert("Warning", "Title is required")
      return;
    }

    setTodos([todo, ...todos]);
    setTodo({ title: "", description: ""});
  }

  //console.log(todos);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.input}
          placeholder='Enter todo title...'
          value={todo.title}
          onChangeText={text => setTodo({ ...todo, title: text })}
        />
        <TextInput style={styles.input}
          placeholder='Enter description...'
          value={todo.description}
          onChangeText={text => setTodo({ ...todo, description: text })}
        />
        <Button title="Add todo" onPress={handleAdd}/>
        <FlatList 
          style={{ width: '90%', marginTop: 10, marginLeft: 35}}
          data={todos}
          renderItem={({item }) => 
            <View style={styles.listView}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text>{item.description}</Text>
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
    justifyContent: 'flex-start',
  }, 
  titleText: {
    fontSize:24, 
    fontWeight:'bold',
  },
  listView: {
    width: '90%', 
    marginTop: 10,
    backgroundColor: 'lightblue',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  input: {
    fontSize:20,
    padding: 10,
  },
});
