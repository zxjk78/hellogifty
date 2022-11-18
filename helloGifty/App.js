/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
// navigator
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';

// Screen
import {
  TestScreen,
  ChattingRoomScreen,
  ChattingScreen,
  DetailScreen,
  LoadingScreen,
  LoginScreen2,
  MyCouponScreen,
  MyTicketScreen,
  ProfileScreen,
  SearchScreen,
  SellingItemDetailScreen,
  ShoppingScreen,
  SignupScreen,
} from './src/screens';
import {Button, IconButton} from 'react-native-paper';
// Toast Message
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#9ED5C5',
        backgroundColor: '#cef2e7',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ff686b',
        backgroundColor: '#ffa69e',
        width: '100%',
      }}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      }}
    />
  ),
  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyCoupon = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MyCouponScreen"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="MyCouponScreen"
          component={MyCouponScreen}
          options={{title: '내 쿠폰'}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{title: '상세 페이지'}}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};
const Shopping = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Shoppings"
        component={ShoppingScreen}
        options={{title: '검색'}}
      />
      <Stack.Screen
        name="ShoppingDetail"
        component={SellingItemDetailScreen}
        options={{title: '판매상세'}}
      />
    </Stack.Navigator>
  );
};

const Chat = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          initialRouteName: 'ChattingRoomScreen',
        }}>
        <Stack.Screen
          name="ChattingRoomScreen"
          component={ChattingRoomScreen}
          options={{title: '채팅목록', unmountOnBlur: true}}
        />
        <Stack.Screen
          name="Chatting"
          component={ChattingScreen}
          options={({navigation}) => ({
            title: '채팅방',
            headerLeft: () => (
              <IconButton
                icon="arrow-left-thick"
                onPress={() => navigation.navigate('ChattingRoomScreen')}
              />
            ),
          })}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};
const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyCoupon"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen
        name="MyCoupon"
        component={MyCoupon}
        options={{headerShown: false, title: '내 쿠폰', unmountOnBlur: true}}
      />
      {/* <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: '쇼핑',
        }}
      /> */}
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: '쇼핑',
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: '채팅',
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '프로필',
          unmountOnBlur: true,
        }}
      />

      {/* <Tab.Screen
        name="test"
        component={TestScreen}
        options={{
          title: '테스트',
        }}
      /> */}
    </Tab.Navigator>
  );
};
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen2} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    // setIsLoading(true);
    (async () => {
      const tmp = await AsyncStorage.getItem('accessToken');
      if (tmp) {
        setIsLoggedIn(true);
      }
    })();
    // setIsLoading(false);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          initialRouteName: isLoggedIn ? 'MainTab' : 'Auth',
        }}>
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
