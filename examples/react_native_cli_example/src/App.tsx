import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useDevSettings } from 'react-native-add-items-in-dev-menu';

export default function App() {
  const { loading, value } = useDevSettings({name: "Fixtures"})

  if (loading) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app de exemplo com react native cli</Text>
      <Text>clique em "D" para abrir o dev menu</Text>

      <Text>Fixtures: {`${value}`}</Text>
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
