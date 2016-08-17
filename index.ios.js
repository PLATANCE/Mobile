/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import Routes from './src/app/Routes';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

AppRegistry.registerComponent('Mobile', () => codePush(codePushOptions)(Routes));
