import { useMenuContext } from 'Providers/MenuProvider'
import { TouchableOpacity, View } from 'react-native'
import { Text, IconButton, Icon, Button } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { Image } from 'expo-image'
import { useState } from 'react'
import { FlashList } from '@shopify/flash-list'
const backImg = require('../assets/backn.png')
const nfcIcon = require('../assets/nfc.png')

const data = [
  { id: 1, name: 'svcxva', type: 'dsadsa' },
  { id: 2, name: 'sasscxada', type: 'dsadsa' },
  { id: 25, name: 'sasscxada', type: '123fd123fd123fd123fdx' },
  { id: 24, name: 'sasscxada', type: 'dsadsa' },
  { id: 222, name: 'sasscxada', type: 'dsadsa' },
  { id: 228, name: 'sasscxada', type: 'dsadsa' },
  { id: 248, name: 'sasscxada', type: 'dsadsa' },
]
export default function Home() {
  const { openDrawer } = useMenuContext()
  const [activeList, setActiveList] = useState('daily')

  function handleActive(name: string) {
    const nameLower = name.toLocaleLowerCase()
    setActiveList(name)
  }

  return (
    <Animatable.View
      className=" flex-1 bg-black"
      animation="fadeIn"
      duration={800}
      easing="ease-in-out">
      <View className="absolute left-[0] top-[200px] " style={{ width: '100%' }}>
        <Image style={{ width: '100%', height: 200 }} contentFit="fill" source={backImg} />
      </View>
      {/* Lines */}
      <View className=" absolute left-[233] top-[350] z-50 h-[145px] w-[2px]  rounded-2xl bg-white"></View>
      <View className=" absolute left-[258] top-[425] z-50 h-0.5 w-[161] rounded-2xl bg-white"></View>
      {/* Info */}
      <View className=" absolute left-[0px] top-[0px] z-50"></View>
      {/*Body */}
      <View style={{ height: 300 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      {/* Card */}
      <View className="h-full items-center rounded-t-[70px] bg-white px-[36px]  py-[28px] pb-[85px]">
        <View className="h-[200px] w-[400px] flex-row  rounded-[31px] bg-[#00D09E] px-[36px] py-[28px]">
          <View></View>
          <View className=" justify-center">
            <View className=" ml-4 mt-2 items-center ">
              <Progress.Circle
                size={100}
                progress={0.5}
                showsText={false}
                color="#0068FF"
                unfilledColor="#F1FFF3"
                borderWidth={0}
                thickness={3.25}
              />
              <View className=" absolute left-[3] top-[2]">
                <Icon source={nfcIcon} size={100} />
              </View>
              <Text className="mt-2 text-xl text-[#093030]">NFC tracker</Text>
            </View>
          </View>
          <View className=" ml-[50px] flex-col justify-between">
            <View className=" flex-row items-center gap-3">
              <Icon size={60} source={nfcIcon} />
              <View className=" flex-col">
                <Text className="text-[15px]  text-[#052224]">Submitted</Text>
                <Text style={{ fontSize: 18, color: '#052224', fontWeight: 'bold' }}>5000</Text>
              </View>
            </View>
            <View className=" flex-row items-center gap-3">
              <Icon size={60} color="#0068FF" source={nfcIcon} />
              <View className=" flex-col">
                <Text className="text-[15px]  text-[#052224]">Submitted</Text>
                <Text style={{ fontSize: 18, color: '#0068FF', fontWeight: 'bold' }}>+5000</Text>
              </View>
            </View>
          </View>
        </View>
        {/* SearchBox */}
        <View className="mt-[46px] h-[90px] w-[400px] flex-row items-center justify-center gap-[20px] rounded-[22px] bg-[#DFF7E2] px-[12.5px] py-[5px]">
          <TouchableOpacity onPress={() => handleActive('daily')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'daily' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Daily
            </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleActive('weekly')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'weekly' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Weekly
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActive('monthly')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'monthly' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Monthly
            </Button>
          </TouchableOpacity>
        </View>
        {/* List */}
        <View style={{ height: 320, width: '100%' }}>
          <FlashList
            contentContainerStyle={{ paddingBottom: 20 }}
            data={data}
            estimatedItemSize={70}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ height: 320, width: '100%' }}>
                <FlashList
                  contentContainerStyle={{ paddingBottom: 20 }}
                  data={data}
                  estimatedItemSize={70}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View className="w-full flex-row items-center gap-5  border-b border-gray-200 p-4">
                      <Icon size={50} source={'play'} />
                      <View className="gap-2">
                        <Text
                          style={{
                            fontSize: 18,
                            width: 100,
                            fontWeight: 'bold',
                            color: '#052224',
                          }}>
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 15, color: '#0068FF' }}>434</Text>
                      </View>
                      <View className="h-10 w-[1px] bg-[#00D09E]"></View>
                      <Text style={{ padding: 0 }}>4000</Text>
                      <View className="h-10 w-[1px] bg-[#00D09E]"></View>
                      <View className=" gap-2">
                        <Text
                          style={{
                            fontSize: item.type.length > 15 ? 12 : 15,
                            fontWeight: 'bold',
                            color: '#052224',
                          }}>
                          {item.type}
                        </Text>
                        <Text style={{ fontSize: 15, color: '#052224' }}>434</Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Animatable.View>
  )
}
