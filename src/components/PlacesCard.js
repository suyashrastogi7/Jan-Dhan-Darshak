import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	Share,
	Linking,
	Alert,
	Pressable,
} from "react-native";
import { API_KEY, BASE_URL } from "@env";
import axios from "axios";
import DetailModal from "./DetailModal";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const PlaceCard = ({ item, location, horizontal, type, rand, type_atm }) => {
	const [show, setShow] = useState(false);
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [colors, setColors] = useState([]);
	const [label, setLabel] = useState("");

	function getDistance(lat2, lon2) {
		let lat1 = location.latitude;
		let lon1 = location.longitude;
		const R = 6371e3; // metres
		const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
		const φ2 = (lat2 * Math.PI) / 180;
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lon2 - lon1) * Math.PI) / 180;
		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c;
		return d / 1000;
	}
	async function getPlaceDetail(place_id) {
		const { data } = await axios.get(
			`${BASE_URL}maps/api/place/details/json?place_id=${place_id}&key=${API_KEY}`
		);
		return data.result;
	}
	async function LaunchModal(place_id) {
		const result = await getPlaceDetail(place_id);
		console.log(result);
		setData(result);
		setShow(true);
	}
	const labelData = [
		{
			label: "Share Transactions",
			color: ["rgba(252, 153, 5, 0.79)", "rgba(252, 153, 5, 0.4)"],
		},
		{
			label: "Agricultural Purposes",
			color: ["rgba(52, 153, 76, 0.79)", "rgba(52, 153, 76, 0.4)"],
		},
		{
			label: "Ecommerce Transactions",
			color: ["rgba(255, 210, 51, 0.79)", "rgba(255, 210, 51, 0.4)"],
		},
		{
			label: "Women Only",
			color: ["rgba(255, 0, 168, 0.79)", "rgba(255, 0, 168, 0.4)"],
		},
		{
			label: "TATA Group",
			color: ["rgba(255, 255, 255, 0.79)", "rgba(255, 255, 255, 0.4)"],
		},
		{
			label: "Third Party",
			color: ["rgba(35, 9, 9, 0.79)", "rgba(35, 9, 9, 0.4)"],
		},
	];
	async function handleCall(place_id) {
		const result = await getPlaceDetail(place_id);
		result.formatted_phone_number
			? Linking.openURL(`tel:${result.international_phone_number}`)
			: Alert.alert("No Phone Number Available");
	}
	async function share(name) {
		try {
			const result = await Share.share({
				message: `Hey, I wan to share this location of ${name}, Click on the link to view it. \n https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
				title: "I am sharing this location with you",
				url: `https://www.google.com/maps/search/?api=1&query=${item.geometry.location.lat},${item.geometry.location.lng}&query_place_id=${item.place_id}`,
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	}
	return (
		<Pressable
			style={[
				{
					marginHorizontal: 10,
					backgroundColor: "#fff",
					borderRadius: 10,
					elevation: 5,
				},
				{
					borderRadius: horizontal ? 10 : 0,
					paddingTop: !type.atm ? 20 : 0,
					paddingBottom: type.atm ? 10 : 0,
				},
			]}
			onPress={() => LaunchModal(item.place_id)}
		>
			{show ? (
				<DetailModal
					item={data}
					type={type}
					show={show}
					setShow={setShow}
				/>
			) : null}
			<View>
				{type.atm ? (
					<LinearGradient
						// Button Linear Gradient
						colors={labelData[rand].color}
						style={styles.button}
					>
						<Text style={{ fontSize: 12 }}>
							{labelData[rand].label}
						</Text>
					</LinearGradient>
				) : (
					<View></View>
				)}
				<View style={[styles.resultItemContainer]}>
					{item.photos ? (
						<Image
							source={{
								uri: `${BASE_URL}maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0]?.photo_reference}&key=${API_KEY}`,
							}}
							resizeMode="cover"
							style={styles.resultItemImage}
						/>
					) : (
						<Image
							source={require("../assets/images/not-found.jpg")}
							style={styles.resultItemImage}
						/>
					)}
					<View style={{ position: "absolute", top: -19, right: 10 }}>
						<TouchableOpacity
							onPress={() => {
								share(item.name);
							}}
						>
							<Image
								source={require("../assets/icons/share_outlined.png")}
								style={{
									height: 30,
									width: 30,
									backgroundColor: "#fff",
								}}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
					<View style={{ marginLeft: 15 }}>
						<Text style={styles.name}>
							{item.name.substring(0, 25)}...
						</Text>
						<Text style={styles.branch}>Branch name</Text>
						<Text style={styles.distance}>
							{getDistance(
								item.geometry.location.lat,
								item.geometry.location.lng
							).toPrecision(2)}{" "}
							KM Away
						</Text>
						<Text
							style={[
								styles.openStatus,
								item.opening_hours?.open_now
									? { color: "#34994C" }
									: { color: "#DB0E0E" },
							]}
						>
							{item.opening_hours?.open_now
								? "Open Now"
								: "Closed Now"}
						</Text>
					</View>
				</View>
			</View>
			{horizontal ? (
				<View
					style={{
						backgroundColor: "#FFFFFF",
						flexDirection: "row",
						// paddingBottom: 10,
						paddingHorizontal: 16,
					}}
				>
					<TouchableOpacity
						style={[styles.directionButton]}
						onPress={() => {
							navigation.navigate("Directions", {
								latitude: item.geometry.location.lat,
								longitude: item.geometry.location.lng,
								place_id: item.place_id,
								name: item.name,
							});
						}}
					>
						<Image
							source={require("../assets/icons/direction.png")}
							style={{ height: 15, width: 15 }}
						/>
						<Text
							style={{
								color: "#fff",
								marginLeft: 10,
								fontSize: 15,
							}}
						>
							Directions
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.directionButton,
							{
								marginLeft: 10,
								backgroundColor: "#fff",
								borderColor: "#2C81E0",
								borderWidth: 1,
							},
						]}
						onPress={() => {
							handleCall(item.place_id);
						}}
					>
						<Image
							source={require("../assets/icons/call.png")}
							style={{
								width: 25,
								height: 25,
							}}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				</View>
			) : null}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	resultItemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: Dimensions.get("window").width / 1.2,
		padding: 12,
		paddingTop: 0,
		marginTop: -1,
	},
	name: {
		fontSize: 16,
		fontWeight: "700",
		color: "#000",
		marginBottom: 3,
		width: Dimensions.get("window").width / 2.5,
	},
	branch: {
		fontSize: 14,
		fontWeight: "400",
		color: "#8E8E8E",
		marginBottom: 3,
	},
	distance: {
		fontSize: 14,
		fontWeight: "400",
		color: "#8E8E8E",
		marginBottom: 3,
	},
	openStatus: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 3,
	},
	directionButton: {
		backgroundColor: "#2C81E0",
		borderRadius: 30,
		flex: 1,
		flexDirection: "row",
		paddingVertical: 8,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	resultItemImage: {
		height: 90,
		width: 100,
		borderRadius: 15,
	},
	button: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderTopRightRadius: 99,
		borderBottomRightRadius: 99,
		borderTopLeftRadius: 50,
		width: 160,
		zIndex: 10,
		backgroundColor: "#FFFFFF",
	},
});

export default PlaceCard;
