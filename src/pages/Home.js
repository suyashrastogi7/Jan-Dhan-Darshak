import React, { useState } from "react";
import { Image } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomMenu from "../components/CustomMenu";

import MapBox from "./MapBox";

//Modals
import TrackRequest from "../components/Modals/TrackRequest";
import MissingBankSuggestion from "../components/Modals/MissingBankSuggestion";
import Help from "../components/Modals/Help";

const Drawer = createDrawerNavigator();

const Home = ({ navigation }) => {
    const [current, setCurrent] = useState("test");
    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <CustomMenu {...props} naigation={navigation} />
            )}
            initialRouteName="Find"
        >
            <Drawer.Screen
                name="Find"
                component={MapBox}
                options={{
                    headerShown: false,
                    drawerIcon: () => (
                        <Image source={require("../assets/icons/icon.png")} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Missing Bank Suggestion"
                component={MissingBankSuggestion}
                options={{
                    headerShown: false,
                    drawerIcon: () => (
                        <Image
                            source={require("../assets/icons/missingbank.png")}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Track Request/ Suggestion"
                component={TrackRequest}
                options={{
                    headerShown: false,
                    drawerIcon: () => (
                        <Image source={require("../assets/icons/icon.png")} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default Home;
