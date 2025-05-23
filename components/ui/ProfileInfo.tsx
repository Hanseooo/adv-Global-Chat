import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import React from 'react'
import { Image, Text, View } from 'react-native'

export default function ProfileInfo() {
    const styles = createStyles()
    const {user} = useAuth()
  return (
          <View style={[{flexDirection: 'row', borderBottomColor: "rgb(240, 240, 240)", borderBottomWidth: 1, padding: 8}]}>
           <Image source={user ? {uri: user.photoURL} : require('../../assets/images/blank-pfp.png')} style={[{width: 60, height: 60, marginRight: 8, borderRadius: "50%"}]} />
            <View>
              <Text style={[styles.textDefault, {fontSize: 24}]}>{user?.displayName}</Text>
              <Text style={[styles.textDefault, {fontSize: 12, color: "rgb(232, 232, 232)"}]}>{user?.email}</Text>
            </View>
          </View>
  )
}
