import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{headerShown: false}}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color="green" />
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingScreen}
          options={{
            tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color="green" />
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

