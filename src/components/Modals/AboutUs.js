import React from "react";

import { View, Modal, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Back from "../../assets/icons/back";
import styles from "../../styles/styles";

const About = ({ show, setShow }) => {
    return (
        <Modal
            animationType="slide"
            visible={show}
            transparent
            onRequestClose={() => {
                setShow({ ...show, about: false });
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.headContainer}>
                    <TouchableOpacity
                        onPress={() => setShow({ ...show, about: false })}
                    >
                        <Back />
                    </TouchableOpacity>
                    <Text style={styles.modalHeading}>About us</Text>
                </View>
                <View
                    style={{
                        marginVertical: 50,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={require("../../assets/images/ministry.png")}
                        style={{ marginBottom: 50 }}
                    />
                    <Text style={styles.modalText}>
                        The Jan Dhan Darshak mobile application provides an
                        interface for citizen to view the Banking
                        Infrastructures in India consisting of Bank Branches,
                        ATMs and Bank Mitra locations. the data is collated by
                        Department of Financial Services from Scheduled
                        Commercial Banks both in Public and Private Sector.{" "}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default About;
