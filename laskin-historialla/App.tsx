import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../laskin-historialla/types'
import CalculatorScreen from './CalculatorScreen';
import HistoryScreen from '../laskin-historialla/HistoryScreen';
  
const Stack = createNativeStackNavigator<RootStackParamList>();
  
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}