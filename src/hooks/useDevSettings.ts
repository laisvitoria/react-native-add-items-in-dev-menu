import { useEffect, useState } from 'react'
import { DevSettings, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Options = {
  name: string;
  action?: () => void;
};

const useDevSettings = ({
  name,
  action
}: Options) => {
  const [loading, setLoading] = useState(__DEV__)
  const [value, setValue] = useState(false)

  useEffect(() => {
    if (__DEV__) {
      const keys = [`@debug/${name.toLowerCase()}`]
      AsyncStorage.multiGet(keys).then((result) => {
        result.forEach(([key, value]) => {
          const parsedValue = Boolean(JSON.parse(value || 'false'))
          if (key === `@debug/${name.toLowerCase()}`) {
            setValue(parsedValue)
          }
        })
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    if (!loading && __DEV__) {
      DevSettings.addMenuItem(`${getAlternateTitle(value)} ${name}`, () => {
        //action()
        AsyncStorage.setItem(`@debug/${name.toLowerCase()}`, JSON.stringify(!value))
        DevSettings.reload()
      })
    }
  }, [loading])

  return { loading, value };
}

const getAlternateTitle = (value: boolean) => {
  if (Platform.OS === 'android') {
    return 'Toggle'
  }
  if (!value) {
    return 'Enable'
  }
  return 'Disable'
}

export default useDevSettings
