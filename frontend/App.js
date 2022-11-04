import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Image,
  NativeModules,
  ActivityIndicator,
  Button,
  DrawerButton,
} from "react-native";
// navigator
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
// external components
import Ionicons from "react-native-vector-icons/Ionicons";
// custom components
import {
  MyTicketScreen,
  SearchScreen,
  LoginScreen,
  TestScreen,
  DetailScreen,
  ShoppingScreen,
  SellingItemDetailScreen,
  ProfileScreen,
  ChatRoomScreen,
  MyCouponScreen,
  LoginScreen2,
} from "./src/screens";
import Practice from "./src/components/Practice";
import { GlobalStyles } from "./src/constants/style";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const TopTab = createMaterialTopTabNavigator();

// Toast Message
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#9ED5C5",
        backgroundColor: "#cef2e7",
        width: "100%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "400",
        color: "black",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#ff686b",
        backgroundColor: "#ffa69e",
        width: "100%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "400",
        color: "black",
      }}
    />
  ),
  tomatoToast: ({ text1, props }) => (
    <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

// tab
const MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyCoupon"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MyCoupon") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shopping") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubble-sharp" : "chatbubble-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="MyCoupon"
        component={MyCoupon}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Shopping" component={SearchScreen} />
      <Tab.Screen
        name="Chat"
        component={SearchScreen}
        options={{
          title: "채팅창",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SearchScreen}
        options={{
          title: "프로필",
        }}
      />
      <Tab.Screen
        name="login"
        component={LoginScreen2}
        options={{
          title: "로그인",
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="test"
        component={TestScreen}
        options={{
          title: "테스트",
        }}
      />
    </Tab.Navigator>
  );
};
const MyCoupon = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MyCouponScreen"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="MyCouponScreen" component={MyCouponScreen} options={{title: "내 쿠폰"}} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} options={{title: "상세 페이지"}}/>
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};

// backButton
// const navigation = useNavigation();

const App = () => {
  const { MMSReadModule } = NativeModules;
  const [imgTmp, setImgTmp] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTab" component={MainTab} />
        {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
