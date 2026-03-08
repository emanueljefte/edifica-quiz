import Colors from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { Text, TextStyle } from 'react-native'

export default function Typo({size, fontWeight = "400", color, children, style, textProps}: TypoProps) {
    const { theme, } = useTheme();
  const activeColors = Colors[theme];
    const textStyle: TextStyle = {
        fontSize: size? verticalScale(size) : verticalScale(22),
        color: color ? color : activeColors.text,
        fontWeight,
    }
    return (
    
      <Text style={[textStyle, style]} {...textProps}>{children}</Text>
    
  )
}