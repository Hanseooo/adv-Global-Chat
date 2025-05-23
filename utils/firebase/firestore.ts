
import { collection, getDocs, where, query, orderBy, addDoc, FieldValue, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../../app/firebase/firebase'; // Assuming you have a separate file for your firebase config


export type MessageData = {
    userId: string | null,
    id: string | null,
    displayName: string | null,
    photoUrl: string | null,
    message: string | null,
    month: number,
    day: number,
    year: number,
    hour: number,
    minute: number,
    meridiem: string,
    isPinnedMessage: boolean,
    timestamp: FieldValue
}

export type ReportMessage = {
  id: string | null,
  isModalOpen: boolean,
  message: MessageData | null | undefined,
  reporterId: string | null | undefined,
  reporterDisplayName: string | null | undefined,
  reason: string | null | undefined,
  timestamp: any,
}

export const getMessagesFromFirestore = async () => {
    try {
      const q = query(collection(db, "chats"), orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
  
      const messagesList: MessageData[] = querySnapshot.docs.map(doc => {
        const data = doc.data(); // Get the document data
        return {
          userId: data.userId,
          id: doc.id, // Add the id
          displayName: data.displayName || null, // Handle potentially missing fields
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
  
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages: ", error);
      return []; // Return an empty array in case of error
    }
  };

export const sendMessageToFirestore = async (messageData:MessageData) => {
    try {
      const docRef = await addDoc(collection(db, "chats"), messageData);
      console.log("Document written with ID: ", docRef.id);
      return docRef; // Return the DocumentReference for further use
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // Re-throw the error for handling in the calling component
    }
  };

  
  export const submitReportMessageToFirestore = async (reportedMessages:ReportMessage) => {
    try {
      const docRef = await addDoc(collection(db, "reportedMessages"), reportedMessages);
      console.log("Document written with ID: ", docRef.id);
      return docRef; // Return the DocumentReference for further use
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // Re-throw the error for handling in the calling component
    }
  };


  export const getReportedMessagesFromFirestore = async () => {
    try {
      const q = query(collection(db, "reportedMessages"), orderBy("timestamp"));
      const querySnapshot = await getDocs(q);
  
      const messagesList: ReportMessage[] = querySnapshot.docs.map(doc => {
        const data = doc.data(); // Get the document data
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
  
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages: ", error);
      return []; // Return an empty array in case of error
    }
  };

export type UserEmailType = {
   id: string; // The Firestore document ID
   email: string;
   description?: string; // Mark as optional
   creationTime?: Timestamp; // Mark as optional
   [key: string]: any; // Include if you might have other fields not explicitly listed
};

interface UserDocumentData {
  email: string;
  description?: string;
  creationTime?: Timestamp;
  [key: string]: any; // Match UserEmailType structure for data part
}


export const getUserByEmailFromFirestore = async (email: string | null): Promise<UserEmailType | null> => {
  try {
    if (email === null) {
      console.log("Email parameter is null, cannot fetch user.");
      return null;
    }

    const usersCollectionRef = collection(db, "users");


    const q = query(usersCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with that email: ${email}.`);
      return null;
    }


    const userDoc = querySnapshot.docs[0];

    const userData = userDoc.data() as UserDocumentData;

    return {
      id: userDoc.id, 
      email: userData.email,
      description: userData.description,
      creationTime: userData.creationTime,
    } as UserEmailType; 

  } catch (error) {
    console.error(`Error fetching user by email ${email}: `, error);

    return null;
  }
};



export const updateUserDescriptionByEmail = async (email:string | null | undefined, newDescription:string) => {
  try {
    const usersCollectionRef = collection(db, "users");

    const q = query(usersCollectionRef, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with email: ${email}. Cannot update description.`);
      return false; // Indicate failure - user not found
    }


    const userDocRef = querySnapshot.docs[0].ref;

    await updateDoc(userDocRef, {
      description: newDescription
    });

    console.log(`Description updated successfully for user with email: ${email}`);
    return true; 

  } catch (error) {
    console.error(`Error updating description for user with email ${email}: `, error);
    return false; 
  }
};
