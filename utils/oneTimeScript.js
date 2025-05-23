const admin = require('firebase-admin');

async function createDocumentsForExistingUsers() {
    try {
        // Initialize Firebase Admin SDK
        admin.initializeApp({
            credential: admin.credential.cert('./world-chat-v2-firebase-adminsdk-fbsvc-0820ac1527.json')
        });

        const db = admin.firestore();

        const users = await admin.auth().listUsers();
        users.users.forEach(async (user) => {
            const docRef = db.collection('users').doc(user.uid);
            const doc = await docRef.get();

            if (!doc.exists) {
                await docRef.set({
                    email: user.email,
                    creationTime: admin.firestore.FieldValue.serverTimestamp(),
                    displayName: user.displayName || '', // Use an empty string if displayName is null
                    description: '',
                    lastLogIn: admin.firestore.FieldValue.serverTimestamp()
                });
                console.log(`Created document for user: ${user.uid}`);
            } else {
                console.log(`Document already exists for user: ${user.uid}`);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

createDocumentsForExistingUsers();
