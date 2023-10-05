import { View, Text } from 'react-native'
import React from 'react'
import { Surface } from 'react-native-paper'

const AppHeader = () => {
  return (
    <Surface>
        <View>left</View>
        <View>center</View>
        <View>right</View>
    </Surface>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    header :{
        height:50,
        elvation:4,
        justifyContent :'space-between',
        aligitem:'center',
        
    }

})