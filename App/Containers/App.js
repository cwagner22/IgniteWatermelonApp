import "../Config";
import DebugConfig from "../Config/DebugConfig";
import React, { Component } from "react";
import { Provider } from "react-redux";
import RootContainer from "./RootContainer";
import createStore from "../Redux";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { mySchema } from "../Models/schema";
import Blog from "../Models/Blog";

// create our store
const store = createStore();

// WatermelonDB
const adapter = new SQLiteAdapter({
  dbName: "test",
  schema: mySchema
});

const database = new Database({
  adapter,
  modelClasses: [Blog]
});

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DatabaseProvider database={database}>
          <RootContainer database={database} />
        </DatabaseProvider>
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default (DebugConfig.useReactotron ? console.tron.overlay(App) : App);
