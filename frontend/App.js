import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Image,
  NativeModules,
  ActivityIndicator,
} from 'react-native';
// navigator
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// external components
import Ionicons from 'react-native-vector-icons/Ionicons';
// custom components
import { MyTicketScreen, SearchScreen, LoginScreen } from './src/screens';

import Practice from './src/components/Practice';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Tab = createBottomTabNavigator();

const App = () => {
  const { MMSReadModule } = NativeModules;
  const [imgTmp, setImgTmp] = useState(null);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'MyCoupon') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Shopping') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubble-sharp' : 'chatbubble-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen
          name="MyCoupon"
          component={MyTicketScreen}
          options={{
            title: '내 쿠폰',
          }}
        />
        <Tab.Screen
          name="Shopping"
          component={SearchScreen}
          options={{
            title: '내 쿠폰',
          }}
        />
        <Tab.Screen
          name="Chat"
          component={SearchScreen}
          options={{
            title: '채팅창',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SearchScreen}
          options={{
            title: '프로필',
          }}
        />
        <Tab.Screen
          name="login"
          component={LoginScreen}
          options={{
            title: '임시로그인',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </View>
  );
};

export default App;
