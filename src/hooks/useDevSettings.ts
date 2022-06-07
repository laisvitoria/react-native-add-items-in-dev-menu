import { useEffect, useState, useMemo } from 'react'
import { DevSettings } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Item = {
  name: string
  action?: () => void
  enableReload?: boolean
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
          itemsResult.push({
            name: res?.toLowerCase().slice(7),
            enabled: parsedValue
          })
        })
        setValues([...values, ...itemsResult])
      })
    }
    setLoading(false)
  }, [!items])

  useEffect(() => {
    if (!loading && __DEV__ && !!values) {
      items?.map(item => {
        let itemIsEnabled = values.find(value => value?.name === item.name.toLowerCase())?.enabled
        DevSettings.addMenuItem(`${!item.action ? "Toggle" : ""} ${item.name}`, () => {
          item.action 
          ? item.action()
          : AsyncStorage.setItem(`@debug/${item.name.toLowerCase()}`, JSON.stringify(!itemIsEnabled))
          item.enableReload && DevSettings.reload()
        })
      })
    }
  }, [loading, !items, values])

  const state: {[key:string]: boolean} = {}
  useMemo(() => (
    values.forEach(value => {
      state[getKeyTransformed(value.name)] = value.enabled
    })
  ), [values])

  return { loading, state };
}

const selectTheFirstLetter = /(^\w{1})|(\s+\w{1})/g

const getKeyTransformed = (key: string): string => {
  let transformedKey = key.replace(
    selectTheFirstLetter,
    letter => letter
      .toUpperCase()
      .replace(" ", "")
  )

  return `use${transformedKey}`
}

export default useDevSettings
