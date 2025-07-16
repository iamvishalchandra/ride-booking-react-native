import { PaymentProps } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { images } from "../constant/image.constant";
import { fetchAPI } from "../lib/fetch.lib";
import { useLocationStore } from "../store/useLocation.store";
import { ButtonComponent } from "./index.component";

const PaymentComponent = ({
  amount,
  driverId,
  email,
  fullName,
  rideTime,
}: PaymentProps) => {
  if (Platform.OS === "web") return;
  const { useStripe } = require("@stripe/stripe-react-native");
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLongitude,
    destinationLatitude,
    destinationAddress,
  } = useLocationStore();

  const payableAmount = parseInt(amount) * 85 * 100;

  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disablePaymentButton, setDisablePaymentButton] = useState(true);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`/(api)/(stripe)/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName || email.split("@")[0],
        email,
        rideTime,
        amount: payableAmount,
        driverId,
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    await fetchPaymentSheetParams()
      .then(async ({ customer, ephemeralKey, paymentIntent }) => {
        setDisablePaymentButton(false);
        await initPaymentSheet({
          merchantDisplayName: "Ride Booking.",
          returnURL: "ridebooking://book-ride",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey.secret,
          paymentIntentClientSecret: paymentIntent.client_secret,
          allowsDelayedPaymentMethods: true,
          primaryButtonLabel: `Pay $${amount}`,
        })
          .then(() => setLoading(true))
          .catch((err: any) => console.log(`Init Payment Sheet Error: `, err));
      })
      .catch((err) => console.log(`Fetch Payment Sheet Error: `, err));
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      return Alert.alert(`Error code: ${error.code}`, error.message);
    }

    setSuccess(true);

    try {
      await fetchAPI("/(api)/ride/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin_address: userAddress,
          destination_address: destinationAddress,
          origin_latitude: userLatitude,
          origin_longitude: userLongitude,
          destination_latitude: destinationLatitude,
          destination_longitude: destinationLongitude,
          ride_time: rideTime.toFixed(0),
          fare_price: payableAmount,
          payment_status: "paid",
          driver_id: driverId,
          user_id: userId,
        }),
      });
    } catch (error) {
      console.log(`Create Ride Error: `, error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const { width } = useWindowDimensions();
  const modalWidthLeftMargin = Math.round((width * 5) / 100);

  return (
    <>
      <ButtonComponent
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
        disabled={disablePaymentButton}
      />
      {success && (
        <View className="relative">
          <Modal
            visible={true}
            onRequestClose={() => setSuccess(false)}
            animationType="slide"
            backdropColor="#0000"
          >
            <View
              style={{ left: modalWidthLeftMargin }}
              className={`absolute flex flex-col items-center justify-center w-[90%] bg-white top-1/4 p-7 rounded-2xl`}
            >
              <Image source={images.check} className="mt-5 w-28 h-28" />
              <Text className="mt-5 text-2xl text-center font-JakartaBold">
                Ride Confirmed!
              </Text>
              <Text className="mt-3 text-sm text-center text-general-200 font-JakartaMedium">
                Driver is on the way and will meet you at your selected pickup
                point. Please meet driver at arrival.
              </Text>
              <ButtonComponent
                title="Go Home"
                onPress={() => {
                  setSuccess(false);
                  router.push("/(root)/(tabs)/home");
                }}
                className="w-full mt-5"
              />
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default PaymentComponent;
