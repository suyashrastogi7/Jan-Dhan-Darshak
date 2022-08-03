import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
    },
    splash: {
        backgroundColor: "#2C3539",
        color: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabsContainer: {
        backgroundColor: "#fff",
        height: 60,
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalContainer: {
        width: Dimensions.get("window").width,
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 25,
        position: "absolute",
        bottom: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        height: Dimensions.get("window").height / 1.4,
    },
    headContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
    },
    modalHeading: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        left: Dimensions.get("window").width / 3.3,
    },
    modalText: {
        fontSize: 18,
        textAlign: "justify",
        paddingHorizontal: 10,
    },
});

export default styles;
