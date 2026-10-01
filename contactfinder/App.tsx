import { Contact, ContactField, requestPermissionsAsync } from 'expo-contacts';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SMS from 'expo-sms';

type ContactType = {
  name: string | null;
  phone: string | undefined;
}

export default function App() {
  const [contactName, setContactName] = useState("");
  const [contact, setContact] = useState<ContactType | null>();
  
  async function handleSearch() {
    //granted: boolean olio, pilkottu
    const { granted } = await requestPermissionsAsync();

    if (!granted) {
      Alert.alert("Warning", "Permission is required");
      return;
    }

    try {
    //array distraction, ensimmäinen elementti
    const [first] = await Contact.getAll({ name: contactName })

    if (first) {
      const details = await first.getDetails([ ContactField.FULL_NAME, ContactField.PHONES])
      const name = details.fullName;
      const phone = details.phones[0].number;
      setContact ({ name: name, phone: phone})
      //console.log(contact)
    }
      //console.log(first);
    } catch {

    }
  }

  async function handleSend() {
    const isAvaible = await SMS.isAvailableAsync();

    //tarkistaa onko contact?.phone on null/undefined
    if (isAvaible && contact?.phone) {
      const { result } = await SMS.sendSMSAsync(contact.phone, "Hello " + contact?.name);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter contact name...'
        value={contactName}
        onChangeText={text => setContactName(text)}
      />
      <Button title='Search' onPress={handleSearch} />
      { //jos puh ei ole olemassa nii ei näytä send buttonia
        contact?.phone &&
          <Button title='Send Msg' onPress={handleSend}/>
      }
      <Text>{contact?.name} {contact?.phone}</Text>
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
