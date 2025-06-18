import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import InputField from 'components/form/InputField';
import { Button } from 'react-native-paper';
import { MotiView } from 'moti'; // ✨ هنا

const logo = require('../../../../assets/logo.png');

export default function SignIn() {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 700 }}
      className="flex-1 justify-between">
      <View className="flex-2 mb-[90px] items-center p-10 pt-20">
        <Image source={logo} contentFit="fill" style={{ width: 200, height: 125 }} />
      </View>

      <View className="flex-1 bg-white px-5 pt-16">
        <View className="mb-8">
          <Text className="text-4xl text-[#562b6a]">Welcome!</Text>
        </View>

        <View className="gap-12">
          <InputField lable="Email Address" name="email" />
          <InputField lable="Password" name="Password" />
        </View>

        <View className="mt-24 gap-12">
          <Button
            style={{ backgroundColor: '#562b6a', height: 75, borderRadius: 30 }}
            contentStyle={{ height: 75, alignItems: 'center', justifyContent: 'center' }}
            labelStyle={{ fontSize: 20, fontWeight: 'bold' }}
            textColor="white">
            Login
          </Button>

          <TouchableOpacity className="items-center">
            <Text className="w-[245px] text-xl text-[#562b6a]">Not a member? Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}
