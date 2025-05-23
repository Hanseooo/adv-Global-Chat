import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import createStyles from '@/stylesheets/createStyles';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import {useChatMessages} from '@/hooks/useFirestoreListener';
import PinnedMessageBubble from '../ui/PinnedMessageBubble';
import { MessageData } from '@/utils/firebase/firestore';

export default function PinnedMessage() {
    const styles = createStyles()
    const {messages, loading, error} = useChatMessages()

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.chatContainer]}>
        {
            messages.map(message => {
                if (message.isPinnedMessage)
                return (
                    <PinnedMessageBubble message={message} />
                )
            })
        }
    </ScrollView>
  )
}
