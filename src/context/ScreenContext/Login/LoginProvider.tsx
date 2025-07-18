import { useAuth } from "@/Hook/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import * as yup from "yup";
import LoginContext from "./LoginContext";

const LoginProvider = ({ children }: any) => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  type LoginProps = {
    email: string;
    password: string;
  };

  const showAlert = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Formato de e-mail inválido"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "Senha deve ter ao menos 6 caracteres"),
  });

  const handleLogin = async ({ email, password }: LoginProps) => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : "Erro ao fazer login.";
      Alert.alert("Erro", errorMessage);
      alert(errorMessage); // EXCLUIR AQUI
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        handleLogin,
        router,
        passwordVisible,
        setPasswordVisible,
        visible,
        setVisible,
        message,
        schema,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
