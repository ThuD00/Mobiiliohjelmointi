import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Weather = {
  date: string;
  min: number;
  max: number;
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [address, setAddress] = useState<Location.LocationGeocodedAddress | null>();
  const [weather, setWeather] = useState<Weather[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCurrentLocation() {

      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Lupa ei myönnetty")
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      let address = await Location.reverseGeocodeAsync(location.coords);
      setAddress(address[0]);
    }

    getCurrentLocation();
  }, []);

  const formatDate = (date: string) => {
  const dateObject = new Date(date);
    return dateObject.toLocaleDateString('fi-FI', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric'
    });
  }

  const handleFetch = () => {
    setLoading(true);
    /*console.log(
      process.env.EXPO_PUBLIC_API_URL +
      "?latitude=" + location?.coords.latitude +
      "&longitude=" + location?.coords.longitude +
      "&daily=temperature_2m_min,temperature_2m_max" +
      "&forecast_days=7" +
      "&temperature_unit=celsius" +
      "&timezone=auto"
    );*/

   fetch(
    process.env.EXPO_PUBLIC_API_URL +
    "?latitude=" + location?.coords.latitude +
    "&longitude=" + location?.coords.longitude +
    "&daily=temperature_2m_min,temperature_2m_max" +
    "&forecast_days=7" +
    "&temperature_unit=celsius" +
    "&timezone=auto"
    )

   .then(response => {
      //console.log("Status:", response.status);
      //console.log("URL:", response.url);
    if (!response.ok) {
      throw new Error("Something went wrong in fetch");
    }
    return response.json();
   })
   .then(data => {
    //data.daily.time = 7 pv, map() = käy pv yksi kerrallaan läpi
    //index = kertoo monesko pv kyseessä on + hakee kyseisen pv min ja max °C
    const weatherData = data.daily.time.map((date: string, index: number) => ({
      date: date,
      min: data.daily.temperature_2m_min[index],
      max: data.daily.temperature_2m_max[index]
    }));
    setWeather(weatherData);
   })
   .catch(err => console.log(err))
   .finally(() => setLoading(false))
  }

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Sääennuste</Text>
      <Text style={styles.text}>{address?.city}</Text>
      <Button title="Hae säät" onPress={handleFetch}/>
      
      {
        loading ?
        <ActivityIndicator size="large"/>
      :
      <FlatList style={styles.list}
        data={weather}
        //Käytä jokaisen sääpäivän date-arvoa sen tunnisteena
        //tarvitsee listan jokaiselle riville uniikin keyn, jotta
        //se tietää, mikä listan alkio on mikäkin, jos lista muuttuu
        keyExtractor={(item) => item.date}
        renderItem={({ item }) =>
          <View style={styles.weatherCard}>
            <Text style={styles.textDate}>{formatDate(item.date)}</Text>
            <Text>Min: {item.min} °C</Text>
            <Text>Max: {item.max} °C</Text>
          </View>
        }
      />
      }
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
  },
  list: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textDate: {
    fontWeight: 'bold',
  },
  weatherCard: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 8,
    borderRadius: 10,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },  
});
