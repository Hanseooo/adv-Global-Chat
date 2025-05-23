import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import { updateUserDescriptionByEmail } from '@/utils/firebase/firestore'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

type SetUserDescriptionModalProps ={
    toggleEditDescription: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SetUserDescriptionModal({toggleEditDescription} : SetUserDescriptionModalProps) {
    const styles = createStyles()
    const [newDescription, setNewDescription] = useState('')
    const auth = useAuth()

  return (
    <View>
        <TextInput onChangeText={(text) => setNewDescription(text)} multiline style={[{width: "100%", color: "rgb(224, 224, 224)", padding: 8, backgroundColor: "rgba(11, 11, 12, 0.14)", borderColor: "rgba(232, 232, 232, 0.25)", borderWidth: 1, borderRadius: 12, minHeight: 72}]} />
        <View style={[{flexDirection: "row", justifyContent: "center", gap: 24, marginTop: 12}]}>
            <TouchableOpacity onPress={() => {updateUserDescriptionByEmail(auth?.user?.email, newDescription); setNewDescription(''); toggleEditDescription(false)}} style={[{borderRadius: 12, backgroundColor: "rgb(240, 240, 240)", paddingVertical: 8, paddingHorizontal: 24}]}>
                <Text style={[styles.textDark]}>
                    Save
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleEditDescription(false)} style={[{borderRadius: 12, borderColor: "rgb(240, 240, 240)", borderWidth: 1, paddingVertical: 8, paddingHorizontal: 16}]}>
                <Text style={[styles.textDefault]}>
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
