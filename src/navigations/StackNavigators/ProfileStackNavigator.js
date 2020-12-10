import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Profile, AgentUserProfile, AgentEditProfile, AgentViewProfile, AccountSettings } from '@screens';
import { navOptionHandler } from '@utils/functions';

const StactProfile = createStackNavigator();
export default ProfileStack = () => {
  return (
    <StactProfile.Navigator initialRouteName="Profile">
      <StactProfile.Screen name="Profile" component={Profile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentUserProfile" component={AgentUserProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentEditProfile" component={AgentEditProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentViewProfile" component={AgentViewProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AccountSettings" component={AccountSettings} options={navOptionHandler} />
    </StactProfile.Navigator>
  )
}