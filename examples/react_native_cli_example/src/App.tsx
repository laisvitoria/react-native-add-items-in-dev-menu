// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

import { StyleSheet, View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useDevSettings } from 'react-native-add-items-in-dev-menu';

export default function App() {
  const { loading, state } = useDevSettings([
    {name: "Fixtures"},
    {name: "Storybook"},
    {name: "Clear AssyncStorage", action: async () => await AsyncStorage.clear()},
    {name: "Dizer olá num alert", action: () => Alert.alert("olá")},
    {name: "Teste"}
  ])

  const [name, setName] = React.useState('')

  const setStringValue = async (value: string) => {
    console.log(value)
    try {
      await AsyncStorage.setItem('@name', JSON.stringify(value))
    } catch(e) {
      // save error
    }
    console.log('Done.')
  }

  const getMyStringValue = async () => {
    try {
      let value = await AsyncStorage.getItem('@name')
      setName(JSON.parse(value))
      return JSON.parse(value);
    } catch(e) {
      // read error
      console.log("deu erro", e)
    }
  }

  if (loading) {
    return <View />
  }

  console.log(state)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao app de exemplo com react native cli</Text>
      <Text style={styles.subtitle}>clique em "D" para abrir o dev menu</Text>
      <View style={styles.containerButton}>
        <Text>{name}</Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => setStringValue('Lais')}>
          <Text style={styles.textButton}>SET NAME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => getMyStringValue()}>
          <Text style={styles.textButton}>GET NAME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 20,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#d0688c',
    margin: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12
  },
  textButton: {
    color: '#ffffff',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 12
  }
});
