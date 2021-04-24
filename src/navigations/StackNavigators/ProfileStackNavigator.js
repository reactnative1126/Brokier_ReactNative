import React from 'react';
import { useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';

import { Profile, AgentUserProfile, AgentEditProfile, AgentViewProfile, AccountSettings, ReferredConnections, BookedViewings } from '@screens';
import { navOptionHandler } from '@utils/functions';

const StactProfile = createStackNavigator();
export default ProfileStack = () => {
  const user_info = useSelector(state => state.auth.user_info);
  return (
    <StactProfile.Navigator initialRouteName={user_info.user_role === 'regular' ? "Profile" : "AgentUserProfile"}>
      <StactProfile.Screen name="Profile" component={Profile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentUserProfile" component={AgentUserProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentEditProfile" component={AgentEditProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AgentViewProfile" component={AgentViewProfile} options={navOptionHandler} />
      <StactProfile.Screen name="AccountSettings" component={AccountSettings} options={navOptionHandler} />
      <StactProfile.Screen name="ReferredConnections" component={ReferredConnections} options={navOptionHandler} />
      <StactProfile.Screen name="BookedViewings" component={BookedViewings} options={navOptionHandler} />
    </StactProfile.Navigator>
  )
}