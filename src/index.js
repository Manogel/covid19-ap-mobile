import React, { useState, useEffect } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import '~/config/ReactotronConfig';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import createNavigator from '~/routes';
import NavigationService from '~/services/navigation';

import '~/scripts/validations';

import { store, persistor } from './store';

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
      <PersistGate loading={() => null} persistor={persistor}>
        <StatusBar backgroundColor="#0069c0" barStyle="light-content" />
        <Routes
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </Provider>
  );
}
