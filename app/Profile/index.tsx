import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Button, Icon } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const backImg = require('../../assets/backn.png')
const nfcIcon = require('../../assets/nfc.png')

export default function Profile() {
  const router = useRouter()
  return (
    <Animatable.View
      animation="fadeIn"
      duration={200}
      easing="ease-in-out"
      style={{ flex: 1, height: '100%' }}>
      <View className=" absolute left-[0px] top-[0px] z-50 w-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className=" absolute left-[10px] top-0 z-10">
          {/* <Image
            style={{ width: 50, height: 50 }}
            contentFit="cover"
            source={require('../../assets/LogowithoutTXT.png')}
          /> */}
          <View className="mt-2">
            <Icon size={40} color="white" source={'keyboard-backspace'} />
          </View>
        </TouchableOpacity>
        <View className=" absolute left-[60px] top-[10px] z-10">
          <Text style={{ color: '#F1FFF3', fontSize: 24 }}>
            Profile
            <Text style={{ color: '#F1FFF3', fontSize: 24 }}> sasa</Text>
          </Text>
        </View>
        <View className="h-[60px] w-full rounded-b-3xl bg-black opacity-40"></View>
      </View>
      {/* BackImages */}
      <View className="absolute left-[0] top-[200px] " style={{ width: '100%' }}>
        <Image style={{ width: '100%', height: 200 }} contentFit="fill" source={backImg} />
      </View>
      <View style={{ width: '100%', height: 300 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      {/********/}
      <View className=" absolute left-[157] top-[180px] z-10">
        <TouchableOpacity activeOpacity={0.8}>
          <Avatar.Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqE4v4MvZzIxhYbK1Lesgd_2stB50hahczw&s',
            }}
            size={200}
          />
        </TouchableOpacity>
      </View>

      <View className="h-full rounded-t-[70px] bg-white  p-20  px-6 pb-[85px] pt-28">
        {/* Header */}
        <View className="items-center">
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Username</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            ID: <Text style={{ fontSize: 12 }}>5454</Text>
          </Text>
        </View>
        <View className="mt-10 gap-10">
          <View className="flex-row items-center gap-4">
            <View className="h-[60px] w-[60px] items-center justify-center rounded-[22px] bg-[#6DB6FE]">
              <Icon size={40} source={'email-outline'} />
            </View>
            <Text style={{ width: '100%', fontSize: 16 }}>sasa@gmail.com</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <View className="h-[60px] w-[60px] items-center justify-center rounded-[22px] bg-[#6DB6FE]">
              <Icon size={40} source={'information-outline'} />
            </View>
            <Text style={{ width: '100%', fontSize: 16 }}>About me !</Text>
          </View>
          <TouchableOpacity className="flex-row items-center  gap-4">
            <View className="h-[60px] w-[60px] items-center justify-center rounded-[22px] bg-[#6DB6FE]">
              <Icon size={40} source={'help'} />
            </View>
            <Text style={{ width: '100%', fontSize: 16 }}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center  gap-4">
            <View className="h-[60px] w-[60px] items-center justify-center rounded-[22px] bg-[#eb9053]">
              <Icon size={40} source={'information-outline'} />
            </View>
            <Text style={{ width: '100%', fontSize: 16 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  )
}

//  <View className="bgColor flex-1">
//       <View className="h-[80px] w-full flex-row items-center border-b-2 border-gray-200 ">
//         <Icon size={50} source={'keyboard-backspace'} />
//         <Text style={{ width: '100%', fontSize: 22 }}>Profile</Text>
//       </View>
//       <View className="mt-10 p-7 ">
//         <View className="items-center gap-10">
//           <Avatar.Image size={200} />
//           <Button labelStyle={{ fontSize: 22, color: 'green' }}>Edit</Button>
//         </View>
//         <View className="mt-5 gap-10">
//           <View className="flex-row items-center gap-5">
//             <Icon size={30} source={'account-outline'} />
//             <View>
//               <Text style={{ fontSize: 20 }}>Name</Text>
//               <Text style={{ color: '#474646' }}>Sasa</Text>
//             </View>
//           </View>
//           <View className="flex-row items-center gap-5">
//             <Icon size={30} source={'information-outline'} />
//             <View>
//               <Text style={{ fontSize: 20 }}>About</Text>
//               <Text style={{ color: '#474646' }}>front dev X</Text>
//             </View>
//           </View>
//           <View className="flex-row items-center gap-5">
//             <Icon size={30} source={'email-outline'} />
//             <View>
//               <Text style={{ fontSize: 20 }}>Email</Text>
//               <Text style={{ color: '#474646' }}>testemail@gmail.com</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View className="mt-[100px] justify-end">
//         <Button buttonColor="red">Log Out</Button>
//       </View>
//     </View>
