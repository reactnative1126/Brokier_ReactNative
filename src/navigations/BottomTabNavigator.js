import React from "react";
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

import HomeStack from "./StackNavigators/HomeStackNavigator";
import FavoriteStack from "./StackNavigators/FavoriteStackNavigator";
import MortgageStack from "./StackNavigators/MortgageStackNavigator";
import MarketStack from "./StackNavigators/MarketStackNavigator";
import ProfileStack from "./StackNavigators/ProfileStackNavigator";

import { colors } from "@constants/themes";

const Tab = createBottomTabNavigator();
export default BottomTabNavigator = () => {
  const tabVisible = useSelector(state => state.auth.tabVisible);
  const logged = useSelector(state => state.auth.logged);
  return (
    <Tab.Navigator initialRouteName="Home" activeColor={colors.BLACK}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarVisible: tabVisible,
          tabBarLabel: "Find Homes",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 35, height: 35, paddingTop: 5 }}>
              <Icon
                name={focused ? "map-search" : "map-search-outline"}
                type="material-community"
                size={25}
                color={focused ? colors.BLACK : colors.GREY.DEEP}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            logged ? navigation.reset({ routes: [{ name: 'Favorite' }] }) : navigation.navigate('Auth')
          }
        })}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 35, height: 35, paddingTop: 5 }}>
              <Icon
                name={focused ? "heart" : "heart-outline"}
                type="material-community"
                size={25}
                color={focused ? colors.BLACK : colors.GREY.DEEP}
              />
              {/* <View style={styles.badge}>
                <Text style={styles.badgeText}>{3}</Text>
              </View> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Mortgage"
        component={MortgageStack}
        options={{
          tabBarLabel: "Mortgage",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 35, height: 35 }}>
              <Icon
                name="dollar"
                type="foundation"
                size={35}
                color={focused ? colors.BLACK : colors.GREY.DEEP}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketStack}
        options={{
          tabBarLabel: "Market Stats",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 35, height: 35, paddingTop: 5 }}>
              <Icon
                name="finance"
                type="material-community"
                size={25}
                color={focused ? colors.BLACK : colors.GREY.DEEP}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            logged ? navigation.navigate('Profile') : navigation.navigate('Auth')
          }
        })}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 35, height: 35, paddingTop: 5 }}>
              <Icon
                name="account"
                type="material-community"
                size={25}
                color={focused ? colors.BLACK : colors.GREY.DEEP}
              />
              <View style={[styles.badge, { right: -5 }]}>
                <Text style={styles.badgeText}>{1}</Text>
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: 5,
    backgroundColor: "red",
    borderRadius: 7.5,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
