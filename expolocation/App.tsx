import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import { useEffect, useState } from 'react';

export default function App() {
  const [location, setlocation] = useState<Location.LocationObject | null>();
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>();
  useEffect(() => {
    //Suoritettava koodi
    async function getCurrentLocation() {
      //asynkroninen operaatio
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Lupa ei myönnetty")
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setlocation(location);

      let address = await Location.reverseGeocodeAsync(location.coords);
      setAddress(address[0]);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your location: {location?.coords.latitude} {location?.coords.longitude}</Text>
      <Text>{address?.city} {address?.street}</Text>
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
});
