import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Favorite } from '@screens';
import { navOptionHandler } from '@utils/functions';

const StactFavorite = createStackNavigator();
export default FavoriteStack = () => {
  return (
    <StactFavorite.Navigator initialRouteName="Favorite">
      <StactFavorite.Screen name="Favorite" component={Favorite} options={navOptionHandler} />
    </StactFavorite.Navigator>
  )
}