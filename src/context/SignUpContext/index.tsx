import { SignUpContext } from "./SignUpContext";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "@/Hook/useAuth";
import { UsuarioType } from "@/model/User";
import { doc, setDoc } from "firebase/firestore";
import { ReactNode, useState } from "react";
import { db } from "../FireBaseContext/firebase.config/Auth";

const requiredMessage = "Campo obrigatório";

const schema = yup
  .object()
  .shape({
    nome: yup
      .string()
      .required(requiredMessage)
      .min(2, "O nome deve ter ao menos 2 caracteres"),
    email: yup
      .string()
      .required(requiredMessage)
      .matches(/\S+@\S+\.\S+/, "Email inválido"),
    senha: yup
      .string()
      .required(requiredMessage)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres"
      ),
    confirmar_senha: yup
      .string()
      .required(requiredMessage)
      .equals([yup.ref("senha")], "As senhas não conferem"),
  })
  .required();

const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmar_senha: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { signUp } = useAuth();
  const [requisitando, setRequisitando] = useState(false);

  const cadastrar = async (data: UsuarioType) => {
    setRequisitando(true); // começa a requisição

    try {
      const uid: any = await signUp(data.email, data.senha);

      if (!uid) {
        throw new Error("Erro ao obter UID do usuário.");
      }

      // Agora salva os dados adicionais
      if (uid) {
        await setDoc(doc(db, "users", uid), {
          nome: data.nome,
          email: data.email,
          fotoUrl: data.fotoUrl,
          criadoEm: new Date(),
        });

        alert("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro inesperado: " + error.message);
        console.error("Erro no cadastro:", error);
      } else {
        alert("Erro inesperado");
        console.error("Erro no cadastro:", error);
      }
    } finally {
      setRequisitando(false); // finaliza a requisição, com sucesso ou erro
    }
  };

  return (
    <SignUpContext.Provider
      value={{
        cadastrar,
        requisitando,
        control,
        handleSubmit,
        formState: { errors },
        reset,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
