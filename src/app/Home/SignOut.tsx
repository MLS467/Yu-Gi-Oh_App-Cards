import { useAuth } from "@/Hook/useAuth";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

const SignOut = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        await SecureStore.deleteItemAsync("credencial");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    };
    handleSignOut();
  }, []);

  return null;
};

export default SignOut;
