import { useAuth } from "@/Hook/useAuth";
import * as SecureStore from "expo-secure-store";

const SignOut = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      await SecureStore.deleteItemAsync("credencial");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  handleSignOut();
  return null; // Retorna null porque não há UI para renderizar neste componente
};

export default SignOut;
