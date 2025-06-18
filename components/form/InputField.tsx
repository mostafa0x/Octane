import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

interface props {
  lable: string;
  name: string;
}

export default function InputField({ lable, name }: props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = name === 'Password';

  return (
    <View className="gap-4">
      <Text className="text-xl text-[#562b6a]">{lable}</Text>
      <View className="flex-row items-center rounded-3xl border-2 border-[#562b6a] px-4 py-2">
        <TextInput
          style={{ flex: 1, height: 50 }}
          secureTextEntry={isPassword && !showPassword}
          placeholder={lable}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={26} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
