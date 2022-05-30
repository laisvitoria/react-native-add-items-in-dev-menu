import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';

import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useDevSettings } from 'react-native-add-items-in-dev-menu';

export default function App() {
  const { loading, values } = useDevSettings([
    {name: "Fixtures"},
    {name: "Storybook"},
    {name: "Clear AssyncStorage", action: async () => await AsyncStorage.clear()},
    {name: "Dizer olá num alert", action: () => Alert.alert("olá")},
    {name: "Teste"}
  ])

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
      console.log(JSON.parse(value))
      return JSON.parse(value);
    } catch(e) {
      // read error
      console.log("deu erro", e)
    }
  }

  if (loading) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app de exemplo com react native cli</Text>
      <Text>clique em "D" para abrir o dev menu</Text>
      <FlatList
        data={values}
        renderItem={({item}) => <Text>{item?.name}:{item.enabled.toString()}</Text>}
      />
      <View>
        <TouchableOpacity onPress={() => setStringValue('Lais')}>
          <Text>SET NAME</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getMyStringValue()}>
          <Text>GET NAME</Text>
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
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
