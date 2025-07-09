import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext, AuthProviderProps } from "./context";
import { auth } from "./firebase.config/Auth"; // Importando o auth do arquivo index

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        router.replace("/Home");
      } else {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user) {
        throw new Error("User not found after sign-in.");
      }

      console.log("Login successful:", userCredential.user);
      Alert.alert("Login", "Login realizado com sucesso!");
      // A navegação será feita automaticamente pelo onAuthStateChanged
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      Alert.alert("Logout", "Logout realizado com sucesso!");
      // A navegação será feita automaticamente pelo onAuthStateChanged
    } catch (error: any) {
      console.error("Error during sign-out:", error);
      Alert.alert("Erro", "Erro ao fazer logout.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user) {
        throw new Error("User not found after sign-up.");
      }

      console.log("Sign-up successful:", userCredential.user);
      Alert.alert("Cadastro", "Cadastro realizado com sucesso!");
      // A navegação será feita automaticamente pelo onAuthStateChanged
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      Alert.alert("Erro", "Erro ao fazer cadastro. Tente novamente.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
