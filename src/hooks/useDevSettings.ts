import { useEffect, useState } from 'react'
import { DevSettings, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Item = {
  name: string
  action?: () => void
};

type Items = Item[]

type Value = {
  name: string,
  enabled: boolean
}

const useDevSettings = (items: Items) => {
  const [loading, setLoading] = useState(__DEV__)
  const [values, setValues] = useState<Value[]>([])

  useEffect(() => {
    const keys: string[] = []
    let res: string | undefined = ''
    let itemsResult: any[] = []
    if (__DEV__) {
      items?.map(item => {
        item.action === undefined &&
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

  useEffect(() => {
    if (!loading && __DEV__ && !!values) {
      items?.map(item => {
        item.action === undefined ?
        DevSettings.addMenuItem(`${getAlternateTitle(values.find(value => value?.name === item.name.toLowerCase())?.enabled)} ${item.name}`, () => {
          AsyncStorage.setItem(`@debug/${item.name.toLowerCase()}`, JSON.stringify(!values.find(value => value?.name === item.name.toLowerCase())?.enabled))
          DevSettings.reload()
        })
        :
        DevSettings.addMenuItem(`${getAlternateTitle(values.find(value => value?.name === item.name.toLowerCase())?.enabled)} ${item.name}`, () => {
          item.action && item.action()
          DevSettings.reload()
        })
      })
    }
  }, [loading, !items, values])

  const state: {[key:string]: boolean} = {}
  for (let i=0; i < values.length; i++) {
    if (values.length !== 0) {
      state[getKeyTransformed(values[i].name)] = values[i].enabled
    }
  }

  return { loading, state };
}

const getAlternateTitle = (value: boolean | undefined) => {
  if (Platform.OS === 'android') {
    return 'Toggle'
  }
  if (!value) {
    return 'Enable'
  }
  return 'Disable'
}

const getKeyTransformed = (key: string): string => {
  let transformedKey = key.replace(
    /(^\w{1})|(\s+\w{1})/g, // seleciona a primeira letra de cada palavra
    letter => letter
      .toUpperCase()
      .replace(" ", "")
  )

  return `use${transformedKey}`
}

export default useDevSettings
