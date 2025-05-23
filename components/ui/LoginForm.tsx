import createStyles from '@/stylesheets/createStyles'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

type UserInfo = {
    email: string
    password: string
}

type LoginFormProps = {
    handleUserInfo: (userInfo: UserInfo) => void,
    userInfo: UserInfo
}

export default function LoginForm({ handleUserInfo, userInfo }: LoginFormProps) {
    const styles = createStyles()
  return (
    <>
        <View>
            <Text style={[styles.textDefault, {marginVertical: 4}]}>email</Text>
            <TextInput onChangeText={(text) => handleUserInfo({...userInfo, email: text})} value={userInfo.email} style={[styles.input]} />
        </View>
        <View>
            <Text style={[styles.textDefault, {marginVertical: 4}]}>password</Text>
            <TextInput onChangeText={(text) => handleUserInfo({...userInfo, password: text})} value={userInfo.password} secureTextEntry={true} style={[styles.input]} />
        </View>
    </>
  )
}
