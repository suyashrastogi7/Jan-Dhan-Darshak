import React, { useState } from "react";
import { View, Image, Dimensions, StyleSheet, Text } from "react-native";

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";

//Modals
import About from "./Modals/AboutUs";
import Disclaimer from "./Modals/Disclaimer";

const CustomMenu = (props) => {
    const navigation = useNavigation();
    const [show, setShow] = useState({
        about: false,
        disclaimer: false,
        language: false,
        locations: false,
    });
    return (
        <View style={styles.container}>
            {show.about ? <About show={show.about} setShow={setShow} /> : null}
            {show.disclaimer ? (
                <Disclaimer show={show.disclaimer} setShow={setShow} />
            ) : null}
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logo.png")}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.heading}>Jan Dhan Darshak</Text>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Change Language"
                    onPress={() => {
                        console.log("open modal");
                    }}
                    icon={() => (
                        <Image
                            source={require("../assets/icons/changelanguage.png")}
                        />
                    )}
                />
                <DrawerItem
                    label="Saved Locations"
                    onPress={() => {
                        console.log("open modal");
                    }}
                    icon={() => (
                        <Image source={require("../assets/icons/icon.png")} />
                    )}
                />
                <DrawerItem
                    label="Disclaimer"
                    onPress={() => {
                        props.navigation.closeDrawer();
                        setShow({ ...show, disclaimer: true });
                    }}
                    icon={() => (
                        <Image
                            source={require("../assets/icons/disclaimer.png")}
                        />
                    )}
                />
                <DrawerItem
                    label="About Us"
                    onPress={() => {
                        props.navigation.closeDrawer();
                        setShow({ ...show, about: true });
                    }}
                    icon={() => (
                        <Image source={require("../assets/icons/about.png")} />
                    )}
                />
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        height: Dimensions.get("window").height / 4,
        justifyContent: "center",
        alignItems: "center",
    },
    image: { height: 150, width: 90 },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
});

export default CustomMenu;
