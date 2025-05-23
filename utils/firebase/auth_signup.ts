import { auth } from "../../app/firebase/firebase";  // Ensure you import the initialized auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithCredential, getAuth } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export async function signUp(username: string, email: string, password: string): Promise<void> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });

        console.log("User created:", user);
    } catch (error:any) {
        console.error("Error creating user:", error.code, error.message);
    }
}

export async function signIn(email: string, password: string): Promise<void> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
    } catch (error:any) {
        console.error("Sign-in error:", error.code, error.message);
    }
}

export async function logout(): Promise<void> {
    try {
        await signOut(auth);
        window.open('https://accounts.google.com/logout', '_blank');
        console.log("✅ User signed out")
    } catch (error:any) {
        console.error("❌ Sign-out error:", error.code, error.message);
    }
}

export function useGoogleSignIn() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "320425429748-f4jmsrem59ho9s25qrcvjsfg8mo1l5ir.apps.googleusercontent.com",  // Your actual client ID
      iosClientId: "320425429748-2lnsf5p92sehngv3g2g3sb1vuc16btr7.apps.googleusercontent.com",  // iOS client ID
      androidClientId: "320425429748-f4jmsrem59ho9s25qrcvjsfg8mo1l5ir.apps.googleusercontent.com",  // Android client ID
      scopes: ['openid', 'profile', 'email'],  // Ensure these scopes are included
    });
  
    const auth = getAuth();
  
    const handleGoogleSignIn = async () => {
        try {
          const result = await promptAsync();
          
          if (result?.type === "success") {
            const accessToken = result.authentication?.accessToken || result.params?.access_token;
            
            if (!accessToken) {
              console.error("No access token received");
              return;
            }
            
            const credential = GoogleAuthProvider.credential(null, accessToken);
            await signInWithCredential(auth, credential);
            // No need to manage the user state here anymore
            // The AuthContext will automatically update via onAuthStateChanged
          }
        } catch (error) {
          console.error("Google Sign-In Error:", error);
        }
      };
    
      return { handleGoogleSignIn };
    }
