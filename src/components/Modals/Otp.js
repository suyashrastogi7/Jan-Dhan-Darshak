import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { verifyOtp } from "../../https/auth";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import PhoneInput from "react-native-phone-number-input";
// import RNOtpVerify from 'react-native-otp-verify';
// import Clipboard from '@react-native-community/clipboard';

const OtpScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [phone, setPhone] = useState("");
	const [otp, setOTP] = useState("");

	useEffect(() => {
		const alreadyLogin = async () => {
			const name = await SecureStore.getItemAsync("name");
			setPhone((await SecureStore.getItemAsync("phone")) || "");
			if (name) {
				navigation.push("Home");
			}
		};
		alreadyLogin();
	}, []);

	// useEffect(() => {
	//     RNOtpVerify.getHash()
	//     .then(console.log)
	//     .catch(console.log);

	//     RNOtpVerify.getOtp()
	//     .then(p => RNOtpVerify.addListener(otpHandler))
	//     .catch(p => console.log(p));
	// }, [])

	// const otpHandler = (message) => {
	//     const otp = /(\d{4})/g.exec(message)[1];
	//     setOTP(otp);
	//     RNOtpVerify.removeListener();
	//     Keyboard.dismiss();
	// }

	const handleOtp = async () => {
		if (!otp || !phone) {
			return;
		}
		try {
			const data = await verifyOtp({ otp, phone_number: phone });
			console.log(data, "data");

			if (data?.success === true) {
				let userId = data.data.user.id;
				await SecureStore.setItemAsync(
					"accessToken",
					data.data.tokens.access
				);
				await SecureStore.setItemAsync(
					"refreshToken",
					data.data.tokens.refresh
				);
				await SecureStore.setItemAsync("name", data.data.user.name);
				await SecureStore.setItemAsync("userId", `${userId}`);
				console.log(
					await SecureStore.getItemAsync("accessToken"),
					"added"
				);
				console.log(data.data, "user object");

				navigation.push("Home");
			}
		} catch (err) {
			console.log(err?.response?.data);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-200">
			<View className="flex-1 bg-gray-100">
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<XIcon color="green" className="z-50" size={30} />
				</TouchableOpacity>
				<View className="flex-1 flex-col items-center justify-center -mt-32 bg-white relative">
					<TouchableOpacity
						onPress={() => navigation.navigate("Login")}
						className="absolute top-[14%] left-5 bg-[#00CCBB] rounded-full"
					>
						<XIcon color="white" className="z-999" size={36} />
					</TouchableOpacity>

					<Image
						source={require("../../assets/images/logo.png")}
						resizeMode="contain"
						className="h-32 w-60"
					/>

					<Text
						className={`text-center text-3xl text-gray-600 p-4 font-bold`}
					>
						Verify OTP
					</Text>
					<Text className="text-center text-[15px] text-gray-500 mb-8 font-bold">
						A verification code has been sent on your phone.
					</Text>

					{/* <TextInput defaultValue={phone} editable={false} placeholder='Enter your phone number' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} /> */}
					<PhoneInput
						defaultCode="IN"
						disabled={true}
						containerStyle={{ height: 52 }}
						placeholder={phone}
						withDarkTheme
						withShadow
						autoFocus
					/>

					{/* <TextInput onChangeText={val => setOTP(val)} defaultValue={otp} placeholder='Enter OTP' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='number-pad' maxLength={14} /> */}

					<OTPInputView
						style={{ width: "86%", height: 60 }}
						pinCount={6}
						autoFocusOnLoad
						codeInputFieldStyle={styles.underlineStyleBase}
						code={otp}
						onCodeChanged={(val) => setOTP(val)}
						// onCodeFilled = {(code) => {
						//     console.log(code);
						//     handleOtp(code);
						// }}
					/>

					<TouchableOpacity
						onPress={() => handleOtp()}
						className="bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center"
						style={styles.buttonBox}
					>
						<Text className="flex-1 text-white font-bold text-lg text-center">
							Verify OTP
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default OtpScreen;
