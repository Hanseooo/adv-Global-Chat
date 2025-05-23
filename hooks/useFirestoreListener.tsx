import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, FirestoreError } from "firebase/firestore";
import { db } from '../app/firebase/firebase';
import { MessageData, ReportMessage } from '../utils/firebase/firestore'; // Import your MessageData type

export const useChatMessages = (collectionName = "chats") => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let unsubscribe:any; // Declare unsubscribe outside the try block

    const loadMessages = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("timestamp"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const messagesList: MessageData[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              userId: data.userId || null, 
              id: doc.id,
              displayName: data.displayName || null,
              photoUrl: data.photoUrl || null,
              message: data.message || null,
              month: data.month,
              day: data.day,
              year: data.year,
              hour: data.hour,
              minute: data.minute,
              meridiem: data.meridiem,
              isPinnedMessage: data.isPinnedMessage,
              timestamp: data.timestamp,
            };
          }) as MessageData[];
          setMessages(messagesList);
          setLoading(false);
        }, (error) => {
          setError(error);
          setLoading(false);
          console.error("Error listening to Firestore: ", error);
        });

      } catch (error:any) {
        setError(error);
        setLoading(false);
        console.error("Error in loadMessages: ", error);
      }
    };

    loadMessages();

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe from the snapshot listener
      }
    };
  }, [collectionName]);

  return { messages, loading, error };
};


export const useReportedMessages = (collectionName = "reportedMessages") => {
  const [messages, setMessages] = useState<ReportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let unsubscribe:any; // Declare unsubscribe outside the try block

    const loadMessages = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy("timestamp"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const messagesList: ReportMessage[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              isModalOpen: data.isModalOpen,
              message: data.message,
              reporterId: data.reporterId,
              reporterDisplayName: data.reporterDisplayName,
              reason: data.reason,
              timestamp: data.timestamp,
            };
          }) as ReportMessage[];
          setMessages(messagesList);
          setLoading(false);
        }, (error) => {
          setError(error);
          setLoading(false);
          console.error("Error listening to Firestore: ", error);
        });

      } catch (error:any) {
        setError(error);
        setLoading(false);
        console.error("Error in loadMessages: ", error);
      }
    };

    loadMessages();

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe from the snapshot listener
      }
    };
  }, [collectionName]);

  return { messages, loading, error };
};

