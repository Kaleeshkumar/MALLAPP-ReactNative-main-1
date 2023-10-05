import { AppRegistry } from "react-native";
import App from "./App";
import {name as appname}from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appname,() => App);
