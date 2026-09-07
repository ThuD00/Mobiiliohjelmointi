import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { RootStackScreenProps } from './types';

export default function HistoryScreen ({route}: RootStackScreenProps<'History'>) {
  
  const { history } = route.params;
  
  return (
    <View style={styles.container}>
      <FlatList 
        style={{ width: '90%', marginTop: 10, marginLeft: 35}}
        data={history}
        renderItem={({item}) => 
        <View style={styles.listView}>
            <Text style={styles.input}>{item}</Text>
        </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize:20,
    padding: 10,
  
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
