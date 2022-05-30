import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useDevSettings } from 'react-native-add-items-in-dev-menu';

export default function App() {
  const { loading, value, values } = useDevSettings([{name: "Fixtures"}, {name: "Storybook"}])

  if (loading) {
    return <View />
  }
  
  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app de exemplo com react native cli</Text>
      <Text>clique em "D" para abrir o dev menu</Text>
      {values?.map(value => {
        <Text>
        {console.log("NA TELA: ", value?.name)}
        {value?.name}{value.value}
        </Text>
      })}
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
