import { useEffect, useState } from 'react'
import { DevSettings, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Item = {
  name: string;
  action?: () => void;
};

type Items = Item[];

const useDevSettings = (items: Items) => {
  const [loading, setLoading] = useState(__DEV__)
  const [value, setValue] = useState<any>()
  const [values, setValues] = useState<any[]>([])

  useEffect(() => {
    const keys: string[] = []
    let res: string | undefined = ''
    let itemsResult: any[] = []
    if (__DEV__) {
      items?.map(item => {
        keys.push(`@debug/${item.name.toLowerCase()}`)
      })
      AsyncStorage.multiGet(keys).then((result) => {
        result.forEach(([key, value]) => {
          const parsedValue = Boolean(JSON.parse(value || 'false'))
          res = keys.find(item => key === item.toLowerCase())
          itemsResult.push({name: res?.toLowerCase().slice(7), enabled: parsedValue})
        })
        setValues([...values, ...itemsResult])
      })
    }
    setLoading(false)
    }, [!items])

  console.log("values: ", values)
  // entra qui quando clica no item
  useEffect(() => {
    if (!loading && __DEV__ && !!values) {
      items?.map(item => {
        DevSettings.addMenuItem(`${getAlternateTitle(values.find(value => value?.name === item.name.toLowerCase())?.enabled)} ${item.name}`, () => {
          item.action && item.action()
          AsyncStorage.setItem(`@debug/${item.name.toLowerCase()}`, JSON.stringify(!values.find(value => value?.name === item.name.toLowerCase())?.enabled))
          DevSettings.reload()
        })
      })
    }
  }, [loading, !items, values])

  return { loading, value, values };
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
