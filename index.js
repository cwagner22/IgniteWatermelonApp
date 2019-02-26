import "./App/Config/ReactotronConfig";
import { AppRegistry } from "react-native";
import App from "./App/Containers/App";
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent("IgniteWatermelonApp", () => App);
