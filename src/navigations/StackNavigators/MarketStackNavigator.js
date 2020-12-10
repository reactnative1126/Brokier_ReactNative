import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Market } from '@screens';
import { navOptionHandler } from '@utils/functions';

const StactMarket = createStackNavigator();
export default MarketStack = () => {
  return (
    <StactMarket.Navigator initialRouteName="Market">
      <StactMarket.Screen name="Market" component={Market} options={navOptionHandler} />
    </StactMarket.Navigator>
  )
}