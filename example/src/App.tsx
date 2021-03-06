import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { useDevSettings } from 'react-native-add-items-in-dev-menu';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  const loading = useDevSettings()

  if (loading) {
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app de exemplo com expo!</Text>
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
