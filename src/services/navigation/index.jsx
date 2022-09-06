import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Entypo from 'react-native-vector-icons/Entypo';

import Home from '../../screens/Home';
import Calculations from '../../screens/Calculations';
import CalculationDetail from '../../screens/CalculationDetail';
import {PAGES, ScreenHeight} from '../../shared/constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const renderIcon = (name, color, size, label) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Entypo name={name} color={color} size={size} />
        <Text style={{fontSize: 15, color: color}}>{label}</Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...styles.tabBarNavigator,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name={PAGES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            renderIcon(
              'home',
              focused ? 'blue' : '#121212',
              focused ? 35 : 30,
              PAGES.HOME,
            ),
        }}
      />
      <Tab.Screen
        name={PAGES.CALCULATIONS}
        component={Calculations}
        options={{
          tabBarIcon: ({focused}) =>
            renderIcon(
              'calculator',
              focused ? 'blue' : '#121212',
              focused ? 35 : 30,
              PAGES.CALCULATIONS,
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={PAGES.HOME}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={PAGES.HOMESCREEN} component={TabNavigator} />
      <Stack.Screen name={PAGES.CALCULATIONSSCREEN} component={Calculations} />
      <Stack.Screen
        name={PAGES.CALCULATIONDETAIL}
        component={CalculationDetail}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarNavigator: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    right: 30,
    height: ScreenHeight * 0.1,
    elevation: 0,
    borderRadius: 15,
    backgroundColor: '#C5C5C5',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
