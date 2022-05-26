import { useEffect, useState } from 'react'
import { Alert, DevSettings, Platform } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'

import { DebugConfig } from '../config'

const Debug = {
  FIXTURE: '@debug/fixtures',
  STORYBOOK: '@debug/storybook'
}

const useDevSettings = () => {
  const [loading, setLoading] = useState(__DEV__)

  useEffect(() => {
    if (__DEV__) {
      const keys = [Debug.FIXTURE, Debug.STORYBOOK]
      /*AsyncStorage.multiGet(keys).then((result) => {
        result.forEach(([key, value]) => {
          const parsedValue = Boolean(JSON.parse(value || 'false'))
          if (key === Debug.FIXTURE) {
            DebugConfig.useFixtures = parsedValue
          }
          if (key === Debug.STORYBOOK) {
            DebugConfig.useStorybook = parsedValue
          }
        })*/
        setLoading(false)
      //})
    }
  }, [])

  useEffect(() => {
    if (!loading && __DEV__) {
      DevSettings.addMenuItem(`${getAlternateTitle(DebugConfig.useFixtures)} Fixtures`, () => {
        //AsyncStorage.setItem(Debug.FIXTURE, JSON.stringify(!DebugConfig.useFixtures))
        DevSettings.reload()
      })
      DevSettings.addMenuItem(`${getAlternateTitle(DebugConfig.useStorybook)} Storybook`, () => {
        //AsyncStorage.setItem(Debug.STORYBOOK, JSON.stringify(!DebugConfig.useStorybook))
        DevSettings.reload()
      })
    }
    DevSettings.addMenuItem(`${getAlternateTitle(DebugConfig.useStorybook)} Alert test`, () => {
        //AsyncStorage.setItem(Debug.STORYBOOK, JSON.stringify(!DebugConfig.useStorybook))
        Alert.alert('Showing secret dev screen!');
        DevSettings.reload()
    })
  }, [loading])

  return loading
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
