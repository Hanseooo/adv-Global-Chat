import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import { sendMessageToFirestore } from '@/utils/firebase/firestore'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { timeStamp } from 'console'
import { Firestore, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function ChatInput() {
    const styles = createStyles()
    const [text, setText] = useState('')
    const {user} = useAuth()

    const handleSendChat = async () => {
      if (text.trim() === '') return
      if (text.length <= 250 && user) {
        const date = new Date()
        const data = {
          userId: user.uid,
          id: null,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          message: text,
          month: date.getMonth() + 1,
          day: date.getDate(),
          year: date.getFullYear(),
          hour: date.getHours() % 12 || 12,
          minute: date.getMinutes(),
          meridiem: date.getHours() >= 12 ? 'PM' : 'AM',
          isPinnedMessage: false,
          timestamp: serverTimestamp()
        }
        sendMessageToFirestore(data)
        setText('')
      }
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={[styles.centerContent, {width: "90%", marginBottom: 12}]}>
        <View style={[styles.chatInputContainer]}>
            <TextInput multiline={true} numberOfLines={text.length > 42 ? 2 : 1} value={text} onChangeText={setText}  placeholder="message" placeholderTextColor="rgb(160,160,160)"  style={[styles.chatInput, ]} /> {/*Platform.OS === 'web' && { outlineStyle: 'none' } */}
              <TouchableOpacity onPress={() => handleSendChat()}>
                <MaterialIcons style={[{alignSelf: 'center'}]} name="send" size={18} color="rgb(160,160,160)" />
              </TouchableOpacity>
        </View>
        <Text style={[styles.textDefault, {fontSize: 12, alignSelf: "flex-end", padding: 8}, {color: text.length > 250 ? "rgb(193, 0, 0)" : "rgb(175, 175, 175)"}]}>{text.length}/250 characters</Text>
  </KeyboardAvoidingView>
  )
}
