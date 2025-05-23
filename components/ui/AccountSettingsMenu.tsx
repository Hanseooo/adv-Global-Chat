import { useActiveView } from '@/contexts/ActiveViewContext'
import createStyles from '@/stylesheets/createStyles'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function AccountSettingsMenu() {
    const styles = createStyles()
    const {activeView, setActiveView} = useActiveView()
  return (
    <>
        <Text style={[styles.headerText, styles.textDefault, {textAlign: "center", marginBottom: 12, paddingHorizontal: 24}]}>Account Settings</Text>
        <TouchableOpacity onPress={() => setActiveView('changeUsername')} style={[styles.btnDark]}>
        <Text style={[styles.textDark, {textAlign: "center"}]}>
            Change Username
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnDark]}>
        <Text style={[styles.textDark, {textAlign: "center"}]}>
            Change Password
        </Text>
        </TouchableOpacity>
    </>
  )
}
