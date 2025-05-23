import createStyles from '@/stylesheets/createStyles'
import { MessageData } from '@/utils/firebase/firestore'
import { generateDate } from '@/utils/generators'
import Feather from '@expo/vector-icons/Feather'
import React, { useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'

type PinnedMessageBubbleProps = {
    message: MessageData
}

export default function PinnedMessageBubble({message} : PinnedMessageBubbleProps) {
    const styles = createStyles()
    const [showMessage, setShowMessage] = useState(false)

  return (
    <View style={[{width: "90%", alignSelf: "center", padding: 4, margin: 2}]}>
    <Text style ={[styles.textDefault, {fontSize: 12, marginVertical: 2, marginLeft: 10}]}>{generateDate(message.month, message.day, message.year)}</Text>
    <View style={[{ backgroundColor: "rgba(101, 97, 109, 0.5)", padding: 8, borderRadius: 16,}]}>
    <Pressable onPress={() => setShowMessage(!showMessage)} style={[{width: "100%",flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
        <View style={[{flexDirection: "row"}]}>
        <Image style={[{width: 42, height: 42, borderRadius: "100%", marginRight: 8}]} source={message.photoUrl ?{uri: message.photoUrl} : require('@/assets/images/blank-pfp.png')}></Image>
            <View>
                <Text style={[styles.textDefault]}>{message.displayName}</Text>
                <Text style={[styles.textDefault, {fontSize: 12, color: "rgb(220, 220, 220)"}]}>{`${message.hour}:${message.minute.toString().padStart(2, '0')} ${message.meridiem}`}</Text>
            </View>
        </View>
        <View>
            <Feather name={`chevron-${showMessage ?"down" : "right"}`} size={18} color="rgb(240,240,240)" />
        </View>
    </Pressable>
    {showMessage && <Text style={[styles.textDefault, {padding: 4, marginTop: 4}]}>{message.message}</Text>}
    </View>
</View>
  )
}
