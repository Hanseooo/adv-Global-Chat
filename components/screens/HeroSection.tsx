import { useActiveView } from '@/contexts/ActiveViewContext'
import createStyles from '@/stylesheets/createStyles'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function HeroSection() {
    const { activeView, setActiveView } = useActiveView()

    const styles = createStyles()
  return (
    <View style={[styles.centerContent]}>
    <Text style={[styles.headerText, styles.textDefault, {marginVertical: 24}]}>Global Chat</Text>
      <View style={[{width: "75%"}]}>
        <TouchableOpacity onPress={() => setActiveView('login')} style={[styles.solidBtn, {margin: 4}]}>
            <Text style={[styles.textDark, styles.centerText]}>Sign in</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveView("register")} style={[styles.hollowBtn, {margin: 4}]}>
        <Text style={[styles.textDefault, styles.centerText]}>Create Account</Text>
      </TouchableOpacity>
      </View>
  </View>
  )
}
