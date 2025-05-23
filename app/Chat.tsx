import createStyles from '@/stylesheets/createStyles'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import ChatBubble from '@/components/ui/ChatBubble';
import MyChatBubble from '@/components/ui/MyChatBubble';
import ChatInput from '@/components/ui/ChatInput';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import { useActiveView } from '@/contexts/ActiveViewContext';
import { getMessagesFromFirestore, MessageData } from '@/utils/firebase/firestore';
import {useChatMessages} from '@/hooks/useFirestoreListener';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import PinnedMessage from '@/components/screens/PinnedMessage';
import ReportMessageModal from '@/components/ui/modals/ReportMessageModal';
import { useReportMessage } from '@/contexts/ReportMessageContext';


export default function Chat() {
    const styles = createStyles()
    const Router = useRouter()
    const scrollViewRef = useRef<ScrollView>(null);
    const { user } = useAuth();
    const [isMounted, setIsMounted] = useState(false)
    const [togglePinnedMessages, setTogglePinnedMessages] = useState(true)
    const {reportMessage} = useReportMessage()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const isFirstRender = useRef(true);


    const { activeView, setActiveView } = useActiveView()
    // const [messageDocs, setMessageDocs] = useState<MessageData[]>([])
    const {messages, loading, error} = useChatMessages()
    
    useEffect(() => {
      setIsMounted(true)
    })

    useEffect(() => {
      if (!user && isMounted) {
        setActiveView('heroSection')
        Router.replace('/')
      }
    },[user, isMounted])

    useEffect(() => {
      setActiveView('chat')
      scrollViewRef.current?.scrollToEnd({animated: true})
    },[messages])

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
    
      if (reportMessage?.isModalOpen === false) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 3000);
      }
    }, [reportMessage?.isModalOpen]);

    if (loading) {
      return (
          <SafeAreaView style={[styles.safeArea, {backgroundColor: "rgb(35, 35, 42)"}]}>
            <ActivityIndicator color="rgb(240, 240,240)"  />
          </SafeAreaView>
      )
    }
 

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: "rgb(35, 35, 42)", justifyContent: "space-between"}]}>
      <View style={[{padding: 24, alignSelf: "flex-start", flexDirection: "row", justifyContent: "space-between", width: "100%"}]}>
        <TouchableOpacity onPress={() => {Router.back(); setTogglePinnedMessages(false)}}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="rgb(240,240,240)"/>
        </TouchableOpacity>
        <Text style={[styles.textDefault, {fontWeight: "bold", fontSize: 16}]}>{togglePinnedMessages ? "Messages" : "Pinned Messages"}</Text>
        <TouchableOpacity onPress={() => setTogglePinnedMessages(!togglePinnedMessages)} style={[{alignSelf: "flex-end", marginBottom: 6}]}>
              <Entypo name="pin" size={24} color="rgba(240, 240, 240, 0.85)" />
        </TouchableOpacity>
      </View>
      <ReportMessageModal  />
      {
            <View style={[{backgroundColor: "rgb(40, 43, 49)", padding: 16, borderColor: "rgb(240, 240, 240)", borderWidth: 1, display: showSuccessModal === true ? "flex" : "none", width: "75%", borderRadius: 12}]}>
              <Text style={[styles.centerText, styles.textDefault]}>Report has been submitted</Text>
            </View>
      }
      {togglePinnedMessages === true ? (<ScrollView showsVerticalScrollIndicator={false} style={[styles.chatContainer]}>
      {messages.map((message) =>    
          message.userId === user?.uid ? (
            <MyChatBubble text={message.message}
            isPinnedMessage={message.isPinnedMessage}
            messageObject={message}
            messageId={message.id}
            />
          ) : (
            <ChatBubble
              text={message.message}
              displayName={message.displayName}
              photoUrl={message.photoUrl}
              isPinnedMessage={message.isPinnedMessage}
              messageObject={message}
              messageId={message.id}
            />
          )
        )}
      </ScrollView>) :
      (
        <PinnedMessage />
      )}
      {togglePinnedMessages === true && <ChatInput />}
      {togglePinnedMessages === false && <View style={{height: 32}}></View>}
    </SafeAreaView>
  )
}
