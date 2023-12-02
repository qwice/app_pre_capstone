import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from '@expo/vector-icons'; 

import { FoodProvider } from './screens/FoodContext';

import Splash from "./screens/splash";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import KaKaoLogin from "./screens/kakaoLogin";

import Screen1 from "./screens/screen1";
import Screen2 from "./screens/screen2";
import Screen3 from "./screens/screen3";
import Screen4 from "./screens/screen4";

import KO from "./screens/ko";
import CH from "./screens/ch";
import JA from './screens/ja';
import WES from "./screens/wes";
import DE from "./screens/de";
import TOTAL from "./screens/total"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

function Top({route}) {

    const receivedType = route.params?.receivedType || '';

    return (
        <TopTab.Navigator screenOptions={{ tabBarActiveTintColor: "black" }}>
            <TopTab.Screen name="등록" initialParams={{ receivedType }}
                children={() => <TOTAL receivedType={receivedType} />}
            />
            <TopTab.Screen name="한식" component={KO} />
            <TopTab.Screen name="중식" component={CH} />
            <TopTab.Screen name="일식" component={JA} />
            <TopTab.Screen name="양식" component={WES} />
            <TopTab.Screen name="후식" component={DE} />
        </TopTab.Navigator>
    );
}

const Stack = createStackNavigator();

function StackScreen() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={BottomStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function DietRecord() {
    return (
        <Stack.Navigator initialRouteName="Screen1">
            <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }} />
            <Stack.Screen name="TOP" component={Top} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();

function BottomStack() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
            }}
        >
            <BottomTab.Screen
                name="홈"
                component={DietRecord}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={30} />,
                }}
            />
            <BottomTab.Screen
                name="식단"
                component={Screen2}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="chat-alert" color={color} size={30} />,
                }}
            />
            <BottomTab.Screen
                name="기록"
                component={Screen3}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" size={24} color={color} />,
                }}
            />
             <BottomTab.Screen
                name="정보"
                component={Screen4}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="brightness-5" color={color} size={30} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <FoodProvider>
                <StackScreen>
                    <BottomStack />
                </StackScreen>
            </FoodProvider>
        </NavigationContainer>
    );
}

export default Navigation;
