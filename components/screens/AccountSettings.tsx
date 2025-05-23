import { useActiveView } from '@/contexts/ActiveViewContext'
import createStyles from '@/stylesheets/createStyles'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import AccountSettingsMenu from '../ui/AccountSettingsMenu'
import ChangeUsernameInput from '../ui/ChangeUsernameInput'

export default function AccountSettings() {
    const styles = createStyles()
    const {activeView, setActiveView} = useActiveView()
  return (
    <View style={[{backgroundColor: "rgba(24, 24, 24, 0.2)", padding: 24, borderRadius: 16, marginTop: 24, borderWidth: 1, borderColor: "rgb(240, 240, 240)"}]}>
        <View style={[{flexDirection: "row", justifyContent: "space-between", marginBottom: 4, alignItems: "center"}]}>
            {activeView !== 'settings' && <TouchableOpacity onPress={() => setActiveView('settings')} style={[{}]}>
                <Ionicons name="chevron-back" size={24} color="rgb(240, 240, 240)" />
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => setActiveView('home')} style={[{marginLeft: "auto"}]}>
                <Feather name="x" size={24} color="rgb(240, 240, 240)" />
            </TouchableOpacity>
        </View>
        {activeView === 'settings' && <AccountSettingsMenu />}
        {activeView === 'changeUsername' && <ChangeUsernameInput />}
    </View>
  )
}
