import Colors from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { ModalWrapperProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { Platform, View } from 'react-native'

const isIOS = Platform.OS == "ios"
export default function ModalWrapper({style, children, bg }: ModalWrapperProps) {
  const { theme } = useTheme();
  const activeColors = Colors[theme];
  return (
    <View style={[{flex: 1, backgroundColor: activeColors.background || bg, paddingTop: isIOS ? verticalScale(15) : 50, paddingBottom: isIOS ? verticalScale(20) : verticalScale(50)}, style && style]}>
      {children}
    </View>
  )
}