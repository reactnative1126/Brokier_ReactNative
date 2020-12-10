import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PropertiesDetail, PropertiesSearch } from '@screens';
import BottomTabNavigator from '@navigations/BottomTabNavigator';
import AuthStack from '@navigations/StackNavigators/AuthStackNavigator';
import { navOptionHandler } from '@utils/functions';

const StackApp = createStackNavigator();
export default AppContainer = () => {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName={"App"}>
        <StackApp.Screen name="Auth" component={AuthStack} options={navOptionHandler} />
        <StackApp.Screen name="App" component={BottomTabNavigator} options={navOptionHandler} />
        <StackApp.Screen name="PropertiesDetail" component={PropertiesDetail} options={navOptionHandler} />
        <StackApp.Screen name="PropertiesSearch" component={PropertiesSearch} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}