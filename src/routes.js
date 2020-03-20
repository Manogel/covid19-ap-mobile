import React from 'react';
import OTIcon from 'react-native-vector-icons/Octicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Detail from '~/pages/Detail';
import Informations from '~/pages/Informations';
import Map from '~/pages/Map';

import { colors } from './styles';

const defaultStackNavigationOptions = {
  headerStyle: {
    height: 90,
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerBackTitle: null,
  headerBackTitleVisible: false,
  headerTitleAlign: 'left',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Routes = () =>
  createAppContainer(
    createBottomTabNavigator(
      {
        Mapa: createStackNavigator(
          { Map },
          { defaultNavigationOptions: defaultStackNavigationOptions }
        ),
        Informações: createStackNavigator(
          { Informations, Detail },
          { defaultNavigationOptions: defaultStackNavigationOptions }
        ),
      },
      {
        tabBarOptions: {
          showLabel: true,
          activeTintColor: colors.primary,
          activeBackgroundColor: '#fff',
          inactiveTintColor: '#999',
          style: {
            height: 55,
            borderTopWidth: 1,
            backgroundColor: '#fff',
            borderTopColor: '#f7f7f7',
          },
        },
        defaultNavigationOptions: ({ navigation }) => ({
          header: () => null,
          tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            switch (routeName) {
              case 'Mapa':
                return <OTIcon name="location" size={25} color={tintColor} />;
              case 'Informações':
                return <OTIcon name="tasklist" size={25} color={tintColor} />;

              default:
                break;
            }
          },
        }),
        // initialRouteName: userLogged ? 'Main' : 'Main',
      }
    )
  );

export default Routes;
