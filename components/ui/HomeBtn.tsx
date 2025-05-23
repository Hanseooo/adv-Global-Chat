import { useActiveView } from '@/contexts/ActiveViewContext'
import createStyles from '@/stylesheets/createStyles'
import { logout } from '@/utils/firebase/auth_signup'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons'

type HomeBtnProps = {
    label: string,
  }

export default function HomeBtn({label} : HomeBtnProps) {
    const styles = createStyles()
    const Router = useRouter()
    const {activeView, setActiveView} = useActiveView()

    const handleBtnFunctions = async () => {
      switch(label) {
        case 'View Profile':
          setActiveView('profile')
          break;
        case 'Enter Chat':
          setActiveView('chat')
          Router.push('/Chat')
          break;
        case 'Settings':
          setActiveView('settings')
          break;
        case 'Log out':
          await logout()
          break;
        case 'Admin Dashboard':
          setActiveView('reportedMessages')
          break;
        default:
          throw new Error('Invalid label')
      }
    }

    const btnIcons = () => {
      switch(label) {
        case 'View Profile':
          return (<Ionicons name="person" size={20} color="rgb(240, 240, 240)" style={[{margin: 4}]} />)
        case 'Enter Chat':
          return (<Ionicons name="chatbox-ellipses" size={20} color="rgb(240, 240, 240)" style={[{margin: 4}]} />)
        case 'Settings':
          return (<Ionicons name="settings-sharp" size={20} color="rgb(240, 240, 240)" style={[{margin: 4}]} />)
        case 'Log out':
          return (<Ionicons name="exit" size={20} color="rgb(240, 240, 240)" style={[{margin: 4}]} />)
        case 'Admin Dashboard':
          return (<MaterialIcons name="admin-panel-settings" size={20} color="rgb(240, 240, 240)" style={[{margin: 4}]} />)
          default:
          throw new Error('Invalid label')
      }
    }

  return (
    <TouchableOpacity onPress={async () => await handleBtnFunctions()} style={[styles.homeBtn]}>
      <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            {
              btnIcons()
            }
          <Text style={[styles.textDefault, {fontWeight: 500}]}>{label}</Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={16} color="rgb(240, 240, 240)" />
      </View>
    </TouchableOpacity>
  )
}




