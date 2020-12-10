import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Mortgage } from '@screens';
import { navOptionHandler } from '@utils/functions';

const StactMortgage = createStackNavigator();
export default MortgageStack = () => {
  return (
    <StactMortgage.Navigator initialRouteName="Mortgage">
      <StactMortgage.Screen name="Mortgage" component={Mortgage} options={navOptionHandler} />
    </StactMortgage.Navigator>
  )
}