import { auth } from "@/context/FireBaseContext/firebase.config/Auth";
import { useAuth } from "@/Hook/useAuth";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
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

  const emailSchema = yup.object({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Formato de e-mail inválido"),
  });

  const handleForgotPassword = async (email: string) => {
    try {
      await emailSchema.validate({ email });

      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Sucesso",
        "Um link de redefinição foi enviado ao seu e-mail."
      );
    } catch (error: any) {
      if (error.name === "ValidationError") {
        Alert.alert("Erro de validação", error.message);
      } else {
        console.error(error);
        Alert.alert(
          "Erro",
          "Não foi possível enviar o e-mail. Verifique o endereço."
        );
      }
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
        handleForgotPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
