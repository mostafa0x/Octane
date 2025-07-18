import React, { memo, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Avatar, Button, Icon, Text } from 'react-native-paper'

interface props {
  rh: (value: number) => number
  rw: (value: number) => number
  RFValue: (value: number) => number
  isMainLoader: boolean
  isLoadingBtn: boolean
  setIsMainLoader: (value: boolean) => void
  LoginByLastLogin: () => void
  callDeleteLastLogin: () => void
  infoLogin: {
    email: string
    image?: string
  }
}

function LastAuthCard({
  rh,
  rw,
  RFValue,
  isMainLoader,
  isLoadingBtn,
  setIsMainLoader,
  LoginByLastLogin,
  callDeleteLastLogin,
  infoLogin,
}: props) {
  const avatarDef = useRef(require('../../assets/avatar.png'))

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rh(4),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(100, 8, 62, 0.2)',
          borderRadius: rw(2),
          padding: rw(1),
          width: rw(90),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: rw(2),
            flexWrap: 'wrap',
          }}>
          <Avatar.Image
            size={RFValue(30)}
            source={
              infoLogin.image
                ? {
                    uri: infoLogin.image,
                  }
                : avatarDef.current
            }
          />
          <Text
            style={{
              fontSize: RFValue(16),
              width: rw(45),
            }}>
            {infoLogin.email.split('@')[0]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: rw(28),
          }}>
          {isMainLoader ? (
            <Button
              disabled={isLoadingBtn}
              style={{
                width: rw(25),
                height: rh(5),
                borderRadius: rw(2),
                justifyContent: 'center',
              }}
              contentStyle={{
                height: '100%',
                justifyContent: 'center',
              }}
              labelStyle={{
                fontSize: RFValue(14),
                lineHeight: RFValue(18),
                textAlign: 'center',
              }}
              onPress={() => {
                setIsMainLoader(false)
                LoginByLastLogin()
              }}
              textColor="white"
              buttonColor="#8d1c47">
              Login
            </Button>
          ) : (
            <ActivityIndicator size={RFValue(20)} />
          )}
          <TouchableOpacity
            onPress={() => {
              if (isLoadingBtn) return
              setIsMainLoader(true)
              callDeleteLastLogin()
            }}>
            <Icon color={isLoadingBtn ? '#ACB5BB' : 'black'} size={RFValue(30)} source={'delete'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default memo(LastAuthCard)
