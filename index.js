/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';
import { LogBox } from 'react-native';

import { Text } from "react-native";
Text.defaultProps = {
  allowFontScaling: false,
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
if (__DEV__) {
  const ignoreWarns = ["VirtualizedLists should never be nested inside plain ScrollViews","Cannot read property 'isConfigured' of undefined"];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}
LogBox.ignoreLogs([
  '[Reanimated] Reduced motion setting is enabled on this device.',
]);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreLogs(['Warning: ...']);

LogBox.ignoreAllLogs();

YellowBox.ignoreWarnings(['Warning: ...']);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
