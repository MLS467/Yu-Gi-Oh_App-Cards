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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
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

  const signUp = async (email: string, password: string): Promise<any> => {
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

      return userCredential.user.uid;
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setLoading,
    loading,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
