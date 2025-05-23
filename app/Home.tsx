import AccountSettings from '@/components/screens/AccountSettings'
import ReportedMessages from '@/components/screens/ReportedMessages'
import HomeBtn from '@/components/ui/HomeBtn'
import ProfileInfo from '@/components/ui/ProfileInfo'
import UserProfile from '@/components/ui/UserProfile'
import { useActiveView } from '@/contexts/ActiveViewContext'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import createStyles from '@/stylesheets/createStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
    const styles = createStyles()
    const { user } = useAuth()
    const { activeView, setActiveView } = useActiveView()
    const Router = useRouter()

    const [isMounted, setIsMounted] = useState(false)

    let btnLabels= ["View Profile", "Enter Chat", "Settings", "Log out"]

    if (user?.email === "hans.amoguis@hcdc.edu.ph") {
      btnLabels= ["View Profile", "Enter Chat", "Settings", "Admin Dashboard", "Log out"]
    }


    useEffect(() => {
      setIsMounted(true)
    })

    useEffect(() => {
      setActiveView('home')
    },[])

    useEffect(() => {
      if (!user && isMounted) {
        setActiveView('heroSection')
        Router.replace('/')
      }
    },[user, isMounted])

  return (
    <SafeAreaView>
      <LinearGradient style={[styles.safeArea]} colors={[ 'rgb(68, 10, 10)','rgb(110, 21, 21)','rgb(68, 10, 10)', 'rgb(28, 0, 0)']}>
      {activeView === 'home' &&
        <View style={[ {padding: 2, width: "95%", maxWidth: 350}]}>
          <ProfileInfo />
          <View style={[{width: "95%", padding: 12}]}>
            {
              btnLabels.map((label) => (
                <HomeBtn label={label} />
              ))
            }
          </View>
        </View>}
        {activeView ==='profile' && <UserProfile />}


        {(activeView === 'settings' || activeView === 'changeUsername') && <AccountSettings />}
        {activeView === 'reportedMessages' && <ReportedMessages />}
      </LinearGradient>
    </SafeAreaView>
  )
}
