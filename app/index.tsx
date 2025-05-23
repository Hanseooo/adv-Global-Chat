import createStyles from "@/stylesheets/createStyles";
import { ActivityIndicator, SafeAreaView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useActiveView } from "@/contexts/ActiveViewContext";
import HeroSection from "@/components/screens/HeroSection";
import Register from "@/components/screens/Register";
import Login from "@/components/screens/Login";
import { useAuth } from "@/contexts/FirebaseAuthContext";
import { useEffect } from "react";
import Home from "./Home";
import { useRouter } from "expo-router";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const auth = getAuth(app);

export default function Index() {
  const styles = createStyles()
  const { activeView, setActiveView } = useActiveView()
  const { user, loading, isAuthenticated, getToken } = useAuth();
  const Router = useRouter()

  useEffect(() => {

    if (isAuthenticated) {
      setActiveView("home");
      Router.replace('/Home')
    }
  }, [isAuthenticated])

  if (loading) {
    return (
      <SafeAreaView>
      <LinearGradient style={styles.safeArea} colors={[ 'rgb(68, 10, 10)','rgb(110, 21, 21)','rgb(68, 10, 10)', 'rgb(28, 0, 0)']}>
        <ActivityIndicator size={24} color={"rgb(240,240,240)"} />
      </LinearGradient>
    </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <LinearGradient style={styles.safeArea} colors={[ 'rgb(68, 10, 10)','rgb(110, 21, 21)','rgb(68, 10, 10)', 'rgb(28, 0, 0)']}>
          {activeView === "heroSection" && <HeroSection />}
          {activeView === "register" && <Register />}
          {activeView === "login" && <Login />}
      </LinearGradient>
    </SafeAreaView>
  );
}
