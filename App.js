import "react-native-gesture-handler";
import React from 'react';
import { Provider } from 'react-redux';
import store from "./src/components/store/store";

import MainNavigator from './src/components/store/Index'

const App = () => {
  return (
    <Provider store={store}>

        <MainNavigator />
   
    </Provider>
  );
};

export default App;
