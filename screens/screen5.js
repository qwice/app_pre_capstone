import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import KO from "./ko";
import CH from "./ch";
import JA from './ja';
import WES from "./wes";
import DE from "./de";
import TOTAL from "./total"

const TopTab = createMaterialTopTabNavigator();

function Top() {
    return (
        <TopTab.Navigator screenOptions={{ tabBarActiveTintColor: "black" }}>
            <TopTab.Screen name="등록" component={TOTAL} />
            <TopTab.Screen name="한식" component={KO} />
            <TopTab.Screen name="중식" component={CH} />
            <TopTab.Screen name="일식" component={JA} />
            <TopTab.Screen name="양식" component={WES} />
            <TopTab.Screen name="후식" component={DE} />
        </TopTab.Navigator>
    );
}
export default Top;