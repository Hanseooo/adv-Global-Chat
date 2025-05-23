import createStyles from '@/stylesheets/createStyles'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useActiveView } from '@/contexts/ActiveViewContext'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";
import RegisterForm from '../ui/RegisterForm';
import { signUp } from '@/utils/firebase/auth_signup';

const auth = getAuth();


type ValidInfo = {
    isNameValid: boolean,
    isEmailValid: boolean,
    isPasswordValid: boolean,
    isConfirmPasswordValid: boolean,
}
type UserInfo = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Register() {
    const {activeView, setActiveView} = useActiveView()
    const styles = createStyles()
    const [userInfo, setUserInfo] = useState<UserInfo>({username: '', email: '', password:'', confirmPassword: ''})
    const [validInfo, setIsValidInfo] = useState<ValidInfo>({isNameValid: false, isEmailValid: false, isPasswordValid:false, isConfirmPasswordValid: false})

    const symbolRegex = /[^a-zA-Z0-9]/;
    const numberRegex = /[0-9]/;

    const handleUserInfo = (userInfo: UserInfo) => {
        setUserInfo(userInfo)
    }
    useEffect(() => {
        setIsValidInfo({...validInfo, isEmailValid: userInfo.email.endsWith("@gmail.com") && !userInfo.email.includes(' ')})
    }, [userInfo.email])
    
    useEffect(() => {
        setIsValidInfo({...validInfo, isPasswordValid: symbolRegex.test(userInfo.password) && numberRegex.test(userInfo.password) && userInfo.password.length >= 8 && userInfo.password.length <=20})
    }, [userInfo.password])

    useEffect(() => {
        setIsValidInfo({...validInfo, isConfirmPasswordValid: userInfo.password === userInfo.confirmPassword})
    }, [userInfo.confirmPassword])

    useEffect(() => {
        const regex = /[^a-zA-Z0-9 ]/
        setIsValidInfo({...validInfo, isNameValid: userInfo.username.length > 3 && !regex.test(userInfo.username.trim()) && !numberRegex.test(userInfo.username.trim())})
    }, [userInfo.username])

    const handleSubmit = async () => {
        if (validInfo.isConfirmPasswordValid && validInfo.isNameValid && validInfo.isEmailValid && validInfo.isPasswordValid) {
            await signUp(userInfo.username, userInfo.email, userInfo.password)
        }
    }

  return (
    <KeyboardAvoidingView behavior={'padding'} style={[styles.formContainer]}>
            <TouchableOpacity onPress={() => setActiveView('heroSection')} style={{alignItems: "flex-end", display: "flex"}}>
            <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
        <Text style={[styles.textDefault, styles.headerText, {textAlign: "center"}]}>Register</Text>
            <RegisterForm handleUserInfo={handleUserInfo} userInfo={userInfo} validInfo={validInfo} />
        <TouchableOpacity onPress={() => {handleSubmit()}} style={[styles.hollowBtn, {marginVertical: 16}]}><Text style={[styles.textDefault, {textAlign:"center"}]}>Create Account</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveView('login')}><Text style={[styles.textDefault]}>Already have an account? <Text style={[{fontWeight: "bold"}]}>Sign In</Text>.</Text></TouchableOpacity>
    </KeyboardAvoidingView>
  )
}
