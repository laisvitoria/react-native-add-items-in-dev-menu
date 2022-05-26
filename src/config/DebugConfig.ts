class DebugConfig {
    useReactotron = __DEV__
    useFixtures = false
    useStorybook = false
    useTestingScreen = false
    enableRootDetection = !__DEV__
}
  
const debugConfig = new DebugConfig()
  
export default debugConfig
  