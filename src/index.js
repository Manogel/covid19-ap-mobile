import React, { useState, useEffect } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import '~/config/ReactotronConfig';
import { Provider } from 'react-redux';

import createNavigator from '~/routes';

import store from './store';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default function App() {
  const [userLogged, setUserLogged] = useState(false);
  // const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    setUserLogged(false);
  }, []);

  const Routes = createNavigator(userLogged);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <Routes />
    </Provider>
  );
}
