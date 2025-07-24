import { styles } from "@/app/styles";
import ForgotPasswordModal from "@/components/ForgotPassword";
import SeparatorWithText from "@/components/separate";
import YugiohLoading from "@/components/YugiohLoading";
import { colors } from "@/constants/Colors";
import { useLogin } from "@/Hook/useLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [visivel, setVisivel] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const context = useLogin();
  const {
    handleLogin,
    router,
    passwordVisible,
    setPasswordVisible,
    visible,
    setVisible,
    message,
    urlDevice,
    handleForgotPassword,
    schema,
  }: any = context;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    async function verificaCredenciais() {
      const credencial = await SecureStore.getItemAsync("credencial");
      if (credencial) {
        const { email, senha } = JSON.parse(credencial);
        try {
          await handleLogin({ email, password: senha });
          // Se quiser navegar para outra tela, use router.replace("/home") aqui
          // router.replace("/home");
        } catch (error) {
          await SecureStore.deleteItemAsync("credencial");
        }
      }
      setLoading(false);
    }
    verificaCredenciais();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };

      await handleLogin(user);

      if (checked) {
        await SecureStore.setItemAsync(
          "credencial",
          JSON.stringify({ email: user.email, senha: user.password })
        );
      } else {
        await SecureStore.deleteItemAsync("credencial");
      }

      reset();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  if (loading) {
    return <YugiohLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={
            urlDevice ? { uri: urlDevice } : require("@/assets/folha.png")
          }
          resizeMode="cover"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>

          <LinearGradient
            colors={["#FF0000", "#FFD700"]} // Vermelho para amarelo
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientLine}
          />
        </View>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Digite seu e-mail"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              mode="outlined"
              style={{ marginVertical: 10, marginHorizontal: 16 }}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={{ color: "red", marginLeft: 16 }}>
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{ required: "Senha é obrigatória" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Digite sua senha"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              style={{ marginVertical: 10, marginHorizontal: 16 }}
              error={!!errors.password}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible((prev: any) => !prev)}
                />
              }
            />
          )}
        />
        {errors.password && (
          <Text style={{ color: "red", marginLeft: 16 }}>
            {errors.password.message}
          </Text>
        )}

        <View style={styles.forgotPasswordContainer}>
          <View style={styles.containerCheck}>
            <TouchableOpacity
              style={[
                styles.checkboxBaseCheck,
                checked && styles.checkboxCheckedCheck,
              ]}
              onPress={() => setChecked(!checked)}
            >
              {checked && <Text style={styles.checkmarkCheck}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.labelCheck}>Lembrar de mim</Text>
          </View>

          <TouchableOpacity
            onPress={() => setVisivel(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {visivel && (
          <>
            <ForgotPasswordModal
              visible={visivel}
              onClose={() => setVisivel(false)}
              sendEmail={(email) => handleForgotPassword(email)}
            />
          </>
        )}

        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={{
              ...styles.button,
              borderColor: colors.primary.alt1,
              borderWidth: 1,
            }}
          >
            <Text style={styles.textBtn}>Entrar</Text>
          </Button>

          <SeparatorWithText />

          <Button
            mode="contained"
            onPress={() => router.navigate("/Sign-Up")}
            style={{
              ...styles.button,
              backgroundColor: colors.dark[800],
              borderWidth: 1,
              borderColor: colors.primary.alt1,
            }}
          >
            <Text style={{ ...styles.textBtn, color: colors.primary.alt1 }}>
              Cadastrar-se
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
//
export default Login;
