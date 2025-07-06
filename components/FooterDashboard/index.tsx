import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Icon } from 'react-native-paper'
import { Router } from 'expo-router'
import { useThemeContext } from 'Providers/ThemeContext'
import { responsiveWidth as rw, responsiveHeight as rh } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  pathName: string
  height: number
  router: Router
}

function FooterDashboard({ pathName, height, router }: Props) {
  const { themeMode } = useThemeContext()
  const isDark = themeMode === 'dark'

  return (
    <View style={[styles.container, { borderColor: isDark ? '#444' : '#ccc' }]}>
      <FooterButton
        icon="account-outline"
        isActive={pathName === '/Dashboard'}
        onPress={() => pathName !== '/Dashboard' && router.replace('/Dashboard')}
        theme={themeMode}
      />
      <FooterButton
        icon="file-find-outline"
        isActive={pathName === '/Dashboard/Reports'}
        onPress={() => pathName !== '/Dashboard/Reports' && router.replace('/Dashboard/Reports')}
        theme={themeMode}
      />
      <FooterButton
        icon="file-upload-outline"
        isActive={pathName === '/Dashboard/UploadCompanys'}
        onPress={() =>
          pathName !== '/Dashboard/UploadCompanys' && router.replace('/Dashboard/UploadCompanys')
        }
        theme={themeMode}
      />
    </View>
  )
}

const FooterButton = ({
  icon,
  isActive,
  onPress,
  theme,
}: {
  icon: string
  isActive: boolean
  onPress: () => void
  theme: string
}) => {
  const isDark = theme === 'dark'
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconWrapper,
        isActive && {
          backgroundColor: isDark ? '#000' : '#000',
        },
      ]}>
      <Icon size={RFValue(28)} color={isActive ? 'white' : 'black'} source={icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: rh(0.5),
    height: rh(8),
    backgroundColor: '#fff',
    borderTopRightRadius: rw(12),
    borderTopLeftRadius: rw(12),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 2.5,
    paddingHorizontal: rw(5),
  },
  iconWrapper: {
    padding: rh(1.2),
    borderRadius: rw(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default memo(FooterDashboard)
