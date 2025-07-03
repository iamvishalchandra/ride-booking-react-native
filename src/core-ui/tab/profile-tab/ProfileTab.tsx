import InputFieldComponent from "@/src/component/InputField.component";
import { icons } from "@/src/constant/icons.constant";
import { UserResource } from "@clerk/types";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";

interface IProfileTab {
  user: UserResource | null | undefined;
}

const ProfileTab = ({ user }: IProfileTab) => {
  const [info, setInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0]?.emailAddress,
    phone: user?.phoneNumbers[0]?.phoneNumber,
  });

  return (
    <View className="w-full bg-general-500">
      <View>
        <Text className="w-full my-5 ml-4 text-2xl text-left font-JakartaBold">
          Your Profile
        </Text>
        <View className="flex items-center justify-center">
          <View>
            <View
              className={`rounded-full flex items-center w-[125px] h-[125px] justify-center bg-white relative`}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
              }}
            >
              <Image
                className="w-[120px] h-[120px] rounded-full"
                source={{
                  uri: "https://avatars.githubusercontent.com/u/74787825?v=4",
                }}
              />
              <View className="absolute flex items-center justify-center bg-white rounded-full w-7 h-7 right-4 bottom-2">
                <Image source={icons.galleryEdit} className="w-6 h-6" />
              </View>
            </View>
          </View>
        </View>
        <View className=" bg-white w-[90%] m-6 mt-16 rounded-2xl p-4 ">
          {info?.firstName && (
            <InputFieldComponent
              label="First Name"
              labeStyle="text-[#858585]"
              value={info.firstName!}
              placeHolder="Enter First Name"
              required={true}
              editable={false}
              showEditIcon
            />
          )}
          {info?.lastName && (
            <InputFieldComponent
              label="Last Name"
              labeStyle="text-[#858585]"
              value={info.lastName!}
              placeHolder="Enter Last Name"
              required={true}
              editable={false}
              showEditIcon
            />
          )}
          {info?.email && (
            <InputFieldComponent
              label="Email"
              labeStyle="text-[#858585]"
              value={info.email!}
              placeHolder="Enter Email"
              required={true}
              editable={false}
              showEditIcon
            />
          )}
          {info?.email && (
            <InputFieldComponent
              label="Email Status"
              labeStyle="text-[#858585]"
              value="Verified"
              placeHolder="Email Status"
              required={true}
              editable={false}
              showEditIcon={false}
              inputStyle="text-green-500"
            />
          )}
          {info?.phone && (
            <InputFieldComponent
              label="Contact Number"
              labeStyle="text-[#858585]"
              value={info.phone!}
              placeHolder="Enter Contact Number"
              required={true}
              editable={false}
              showEditIcon
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileTab;
