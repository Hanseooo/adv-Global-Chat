import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import { changeDisplayName, updateMessageDisplayName } from '@/utils/firebase/firestoreCrud'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function ChangeUsernameInput() {
    const styles = createStyles()
    const [newUsername, setNewUsername] = useState('')
    const [isUsernameValid, setUsernameValid] = useState<boolean | null>(null)
    const { user } = useAuth()

    const handleSubmitUsername = async () => {
        if (newUsername.trim() === '' ||newUsername.length < 4 || !user) {
            setUsernameValid(false)
            return
        }
        await changeDisplayName(newUsername)
        await updateMessageDisplayName(user!.uid, newUsername)
        setUsernameValid(true)
    }

  return (
    <>
        <Text style={[styles.headerText, styles.textDefault, {textAlign: "center", marginBottom: 12, paddingHorizontal: 24}]}>Change Username</Text>
        <View style={[{paddingHorizontal: 24}]}>
            <Text style={[styles.textDefault, {fontSize: 16, marginVertical: 4}]}>New Username:</Text>
            <TextInput onChangeText={(e) => setNewUsername(e)} placeholder="" style={[styles.input]} />
            {isUsernameValid !== null ? <Text style={[styles.textDefault, {alignSelf: "center", fontSize: 12}]}>{isUsernameValid === true ? "Username changed succesfully!" : "Invalid Username"}</Text> : null}
        </View>
        <TouchableOpacity onPress={() => handleSubmitUsername()} style={[{width: "30%", alignSelf: "center"}]}><Text style={[styles.btnDark, {marginTop: 20, textAlign: "center"}]}>Submit</Text></TouchableOpacity>
    </>
  )
}
