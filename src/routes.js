import React from 'react';
import OTIcon from 'react-native-vector-icons/Octicons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
          { Informations },
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
            borderTopWidth: 0,
            backgroundColor: '#fff',
          },
        },
        defaultNavigationOptions: ({ navigation }) => ({
          header: () => null,
          tabBarIcon: ({ focused, tintColor }) => {
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
