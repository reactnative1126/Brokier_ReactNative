import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { PropertiesHome } from "@screens";
import { navOptionHandler } from "@utils/functions";

const StactHome = createStackNavigator();
export default HomeStack = () => {
  return (
    <StactHome.Navigator initialRouteName="PropertiesHome">
      <StactHome.Screen
        name="PropertiesHome"
        component={PropertiesHome}
        options={navOptionHandler}
      />
    </StactHome.Navigator>
  );
}
