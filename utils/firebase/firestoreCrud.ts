import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from '../../app/firebase/firebase';
import { MessageData } from "./firestore";
import { updateProfile } from "@firebase/auth";


export async function editChatFields(documentId: string, field: string, messageObject: MessageData) {
    try {
        const documentRef = doc(db, "chats", documentId);
        switch (field) {
            case 'isPinnedMessage':
                const newValue = {...messageObject, isPinnedMessage: !messageObject.isPinnedMessage}
                await updateDoc(documentRef, newValue);
                // console.log("updating " + newValue)
                break;
            default: 
                throw new Error('Invalid field name provided. Valid fields  is "isPinnedMessage".')
        }
    }
    catch (error) {
        console.error("Error updating chat fields:", error);
    }
}

export async function deleteChatDocument(documentId: string | null | undefined) {
  if (!documentId || documentId === undefined) return;

    try {
        const documentRef = doc(db, "chats", documentId); 
        await deleteDoc(documentRef); 
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
}

export async function updateMessageDisplayName(uid: string, displayName: string) {
    try {
        const collectionRef = collection(db, "chats");
        const q = query(collectionRef, where("uid", "==", uid)); 
    
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
          console.log("No documents found with UID:", uid);
          return;
        }
        querySnapshot.forEach(async (documentSnapshot) => {
          const documentRef = doc(db, "chats", documentSnapshot.id);
          await updateDoc(documentRef, {...documentSnapshot, displayName: displayName});

        });
    
      } catch (error) {
        console.error("Error updating document:", error);
      }
}

export async function deleteSubmittedReport(documentId: string | null | undefined) {
  if (!documentId || documentId === undefined) return;

  try {
      const documentRef = doc(db, "reportedMessages", documentId); 
      await deleteDoc(documentRef); 
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
}


export const changeDisplayName = async (newDisplayName: string) => {
  try {
      const user = auth.currentUser;
      if (user) {
          await updateProfile(user, {
              displayName: newDisplayName,
          });
          console.log('Display name updated successfully!');
      }
      else {
          console.log('No user currently signed in.');
      }
  }
  catch (error) {
      console.error('Error updating display name:', error);
      throw error;
  }
};





