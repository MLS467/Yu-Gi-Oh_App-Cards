import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
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
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      Alert.alert("Logout", "Logout realizado com sucesso!");
    } catch (error: any) {
      console.error("Error during sign-out:", error);
      Alert.alert("Erro", "Erro ao fazer logout.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user) {
        Alert.alert("Erro", "Verifique seu e-mail ou senha.");
        alert("Verifique seu e-mail ou senha."); // EXCLUIR AQUI
        return;
      }

      const user = userCredential.user;

      if (!user.emailVerified) {
        await firebaseSignOut(auth);
        setUser(null);
        throw new Error(
          "E-mail não verificado. Verifique sua caixa de entrada."
        );
      }

      Alert.alert("Login realizado com sucesso!");
      router.replace("/Home");
    } catch (error: any) {
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

      await sendEmailVerification(userCredential.user);
      alert("Verifique seu e-mail para ativar sua conta."); // EXCLUIR AQUI
      Alert.alert(
        "Cadastro realizado com sucesso!",
        "Verifique seu e-mail para ativar sua conta."
      );

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
