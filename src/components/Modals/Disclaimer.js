import React from "react";

import { View, Modal, Text, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Back from "../../assets/icons/back";
import styles from "../../styles/styles";

const Disclaimer = ({ show, setShow }) => {
    return (
        <Modal
            animationType="slide"
            visible={show}
            transparent
            onRequestClose={() => {
                setShow({ ...show, disclaimer: false });
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.headContainer}>
                    <TouchableOpacity
                        onPress={() => setShow({ ...show, disclaimer: false })}
                    >
                        <Back />
                    </TouchableOpacity>
                    <Text style={styles.modalHeading}>Disclaimer</Text>
                </View>
                <ScrollView>
                    <View
                        style={{
                            marginVertical: 50,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.modalText}>
                            The Information contained in the mobile application
                            is provided and maintained by various Scheduled
                            commercial banks. No guarantee is given as to the
                            accuracy or currency of any of the data. Therefore,
                            in no event shall Department of Financial Services
                            or its constituents be liable for any special,
                            indirect, or consequential damages or any damages
                            whatsoever resulting from loss of use, data, or
                            profits, whether in an action of contract,
                            negligance, or other action, arising out of or in
                            connection with the use of the information herein
                            provided. the website is desgned to served as a
                            secondary representation of banking infrastructure,
                            and secondary representation of Banking
                            infrastructure, and is compiled from the Scheduled
                            Commercial Banks which are the primary sources for
                            the Scheduled Commercial banks which are the primary
                            sources for this public information. Users of this
                            website are hereby notified that these primary
                            sources should be consulted for verification of the
                            information presented here. And Department of
                            Financial Services or its constituents and the
                            software developer, NIC, assume no legal
                            responsibility for the Information on the website.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default Disclaimer;
