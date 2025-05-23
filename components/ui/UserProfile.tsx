import createStyles from '@/stylesheets/createStyles'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import ProfileInfo from './ProfileInfo'
import { TouchableOpacity } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import SetUserDescriptionModal from './modals/SetUserDescriptionModal'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useActiveView } from '@/contexts/ActiveViewContext'
import { getUserByEmailFromFirestore, UserEmailType } from '@/utils/firebase/firestore'
import { Timestamp } from 'firebase/firestore'

const formatTimestampToDateString = (timestamp: Timestamp | undefined | null): string => {
  if (!timestamp) {
    return 'N/A'; // Return placeholder if timestamp is missing
  }
  try {
    const date = timestamp.toDate();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  } catch (e) {
    console.error("Error formatting timestamp:", e);
    return 'Invalid Date';
  }
};

export default function UserProfile() {
    const styles = createStyles()
    const [editDescription, toggleEditDescription] = useState(false)
    const [userData, setUserData] = useState<UserEmailType | null>(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);
    const {activeView, setActiveView} = useActiveView()
    const auth = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth || !auth.user || !auth.user.email) {
        console.log("Auth user or email not available yet.");
        setIsLoading(false);
        // Optionally set userData to null or a default empty state here too
        setUserData(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const email = auth.user.email;
        // Fetch the entire user object
        const fetchedUserData = await getUserByEmailFromFirestore(email);

        // Set the entire fetched object in state
        setUserData(fetchedUserData);

        if (fetchedUserData) {
            console.log("User data fetched successfully.");
        } else {
            console.log(`User with email ${email} not found.`);
        }

      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data.");
        setUserData(null); // Clear data on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData(); // Call the async function inside useEffect

  }, [auth?.user?.email, editDescription, userData]); 


  return (
    <View style={[styles.centerContent,{borderWidth: 1, borderColor: "rgb(240, 240, 240)", paddingVertical: 8,paddingHorizontal: 16,  borderRadius: 12, backgroundColor: "rgba(42, 42, 45, 0.16)"}]}>
        <TouchableOpacity onPress={() => setActiveView('home')} style={[{alignSelf: "flex-end", }]}>
            <EvilIcons name="close" size={24} color="rgb(240, 240, 240)" />
        </TouchableOpacity>
        <View style={[{marginRight: 12}]}>
            <ProfileInfo />
        </View>
        <View style={[{width: "100%", padding: 8}]}>
            <Text style={[styles.textDefault, {margin: 4, alignSelf: "flex-start"}]}>About me</Text>
            {editDescription === false && <Pressable onPress={() => toggleEditDescription(!editDescription)} style={[{width: "100%", padding: 8, backgroundColor: "rgba(11, 11, 12, 0.14)", borderColor: "rgba(232, 232, 232, 0.25)", borderWidth: 1, borderRadius: 12, minHeight: 72}]}>
                <Text style={[styles.textDefault, {textAlign: "left", marginHorizontal: 2}]}>{userData?.description}</Text>
            </Pressable>}
            {editDescription === true && <SetUserDescriptionModal  toggleEditDescription = {toggleEditDescription} />}
            <Text style={[styles.textDefault, styles.centerText, {marginTop: 12}]}>Join Date: {formatTimestampToDateString(userData?.creationTime)} </Text>
        </View>
    </View>
  )
}
