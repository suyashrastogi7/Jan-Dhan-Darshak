import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

import { useFonts } from "expo-font";

const Header = ({ title, subtitle, showFilters }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [search, setSearch] = useState("");

    const [loaded] = useFonts({
        InterBold: require("../assets/fonts/Inter-Bold.otf"),
        InterRegular: require("../assets/fonts/Inter-Regular.otf"),
        InterLight: require("../assets/fonts/Inter-Light.otf"),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        if (route.name === "Home") {
                            //Open Drawer Navigation
                            navigation.openDrawer();
                        } else {
                            navigation.goBack();
                        }
                    }}
                >
                    {route.name !== "Home" ? (
                        <Svg
                            width={35}
                            height={25}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#101010"
                        >
                            <Path
                                stroke="#000"
                                strokeWidth={3}
                                strokeLinecap="round"
                                d="M2 7h22M1 6.586 6.586 1M7.071 12.657 1.414 7"
                            />
                        </Svg>
                    ) : (
                        <Svg
                            width={32}
                            height={20}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M1 1h30M1 10h30M1 19h30"
                                stroke="#101010"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                        </Svg>
                    )}
                </TouchableOpacity>
                {route.name === "Home" && (
                    <Svg
                        width={21}
                        height={28}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <Path
                            d="M9.204 27.37C6.349 23.85 0 15.32 0 10.528 0 4.713 4.7 0 10.5 0 16.297 0 21 4.713 21 10.527c0 4.792-6.398 13.324-9.204 16.844a1.65 1.65 0 0 1-2.592 0ZM10.5 14.037c1.93 0 3.5-1.573 3.5-3.509a3.508 3.508 0 0 0-3.5-3.509c-1.93 0-3.5 1.574-3.5 3.51 0 1.935 1.57 3.508 3.5 3.508Z"
                            fill="#101010"
                        />
                    </Svg>
                )}
                <View style={styles.headings}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>
            {route.name === "Home" ? (
                <View style={styles.filterWrapper}>
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchBar}
                        placeholder="Search ATM near you"
                    />
                </View>
            ) : null}
            {route.name === "Home" ? (
                <View style={styles.filterButtonGroup}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Relevance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Open Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Distance</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F9F9F9",
        width: Dimensions.get("window").width,
    },
    headerWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    filterWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    back: { flex: 1, marginLeft: 30 },
    headings: {
        flex: 5,
        marginLeft: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        fontFamily: "InterBold",
    },
    subtitle: { fontSize: 14, fontFamily: "InterLight" },
    searchBar: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "#D9D9D9",
    },
    filterButtonGroup: {
        flexDirection: "row",
        paddingHorizontal: 30,
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    filterButtonText: {
        color: "#7C7C7C",
    },
});

export default Header;