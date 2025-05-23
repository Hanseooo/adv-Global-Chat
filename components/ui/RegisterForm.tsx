import createStyles from '@/stylesheets/createStyles'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

type UserInfo = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

type ValidInfo = {
    isNameValid: boolean,
    isEmailValid: boolean,
    isPasswordValid: boolean,
    isConfirmPasswordValid: boolean,
}

type RegisterFormProps = {
    userInfo: UserInfo,
    handleUserInfo: (userInfo:UserInfo) => void,
    validInfo: ValidInfo,

}

export default function RegisterForm( { userInfo, handleUserInfo, validInfo }: RegisterFormProps ) {
    const styles = createStyles()
  return (
    <>
    <View>
        <Text style={[styles.textDefault, {marginVertical: 4}]}>username</Text>
        <TextInput value={userInfo.username} onChangeText={(text) => handleUserInfo({...userInfo, username:text})} style={[styles.input]} />
        {userInfo.username && <Text style={styles.errorText}>{validInfo.isNameValid ? "" : "username must be at least 4 characters long and contain only letters."}</Text>}

    </View>
    <View>
        <Text style={[styles.textDefault, {marginVertical: 4}]}>email</Text>
        <TextInput value={userInfo.email} onChangeText={(text) => handleUserInfo({...userInfo, email:text})} style={[styles.input]} />
        {userInfo.email && <Text style={styles.errorText}>{validInfo.isEmailValid ? "" : "email must be a valid email address."}</Text>}

    </View>
    <View>
        <Text style={[styles.textDefault, {marginVertical: 4}]}>password</Text>
        <TextInput value={userInfo.password} onChangeText={(text) => handleUserInfo({...userInfo, password:text})} style={[styles.input]} secureTextEntry />
        {userInfo.password && <Text style={styles.errorText}>{validInfo.isPasswordValid ? "" : "password must be at least 8 characters long and contain at least one symbol and one number."}</Text>}

    </View>
    <View>
        <Text style={[styles.textDefault, {marginVertical: 4}]}>confirm password</Text>
        <TextInput value={userInfo.confirmPassword} onChangeText={(text) => handleUserInfo({...userInfo, confirmPassword:text})} style={[styles.input]} secureTextEntry />
        {userInfo.confirmPassword && <Text style={styles.errorText}>{validInfo.isConfirmPasswordValid ? "" : "passwords do not match."}</Text>}
    </View>
</>
  )
}
