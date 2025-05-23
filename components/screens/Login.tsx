import { useActiveView } from '@/contexts/ActiveViewContext'
import createStyles from '@/stylesheets/createStyles'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LoginForm from '../ui/LoginForm'
import { signIn, useGoogleSignIn } from '@/utils/firebase/auth_signup'
import { useRouter } from 'expo-router'


type UserInfo = {
    email: string,
    password: string
}


export default function Login() {
    const {activeView, setActiveView} = useActiveView()
    const styles = createStyles()
    const { handleGoogleSignIn } = useGoogleSignIn()

    const [userInfo, setUserInfo] = useState({email: "", password: ""})
    const Router = useRouter()
    const handleUserInfo = (userInfo: UserInfo) => {
        setUserInfo(userInfo)

    }

    const handleLogin = async () => {
        if (userInfo.email && userInfo.password) {
            await signIn(userInfo.email, userInfo.password)
        }
    }

    const handleGoogleLogIn = async () => {
        await handleGoogleSignIn()
        setActiveView('home')
        Router.replace('/Home')
    }

  return (
    <KeyboardAvoidingView behavior={'padding'} style={[styles.formContainer]}>
        <TouchableOpacity onPress={() => setActiveView('heroSection')} style={{alignItems: "flex-end", display: "flex"}}>
            <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.textDefault, styles.headerText, {textAlign: "center", marginBottom: 8}]}>Sign In</Text>

        <LoginForm handleUserInfo={handleUserInfo} userInfo={userInfo} />

        <TouchableOpacity onPress={() => {handleLogin()}} style={[styles.hollowBtn, {marginVertical: 16}]}>
            <Text style={[styles.textDefault, {textAlign:"center"}]}>Sign In</Text>
        </TouchableOpacity>

        <Text style={[styles.textDefault, styles.centerText]}>or</Text>

        <TouchableOpacity onPress={() => handleGoogleLogIn()} style={[styles.hollowBtn, {marginVertical:12}]}>
            <View style={[styles.centerContent, {flexDirection: "row" }]}>
                <Image style={[{width: 32, height: 32}]} source={require('@/assets/images/svg/google-logo.svg')} />
                <Text style={[styles.textDefault, {textAlign:"center"}]}>
                    Continue With Google
                </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveView('register')}><Text style={[styles.textDefault, {marginVertical: 12}]}>Don't have an account? <Text style={[{fontWeight: "bold"}]}>Register</Text>.</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {}}><Text style={[styles.textDefault, styles.centerText]}>Forgot Password?</Text></TouchableOpacity>

    </KeyboardAvoidingView>
  )
}
