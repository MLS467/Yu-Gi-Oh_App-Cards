import { styles } from "@/app/styles";
import { colors } from "@/constants/Colors";
import { useLogin } from "@/Hook/useLogin";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const context = useLogin();
  const { handleLogin, router }: any = context;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    handleLogin(data.email, data.password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("@/assets/folha.png")} />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

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
              label="Email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              mode="outlined"
              style={{ margin: 16 }}
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
              label="Senha"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              autoCapitalize="none"
              secureTextEntry={!passwordVisible}
              style={{ margin: 16 }}
              error={!!errors.password}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible((prev) => !prev)}
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

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, margin: 16 }}
        >
          <Text style={styles.textBtn}>Entrar</Text>
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => router.navigate("/Sign-Up")}
        activeOpacity={0.7}
        style={styles.btnRegister}
      >
        <Text style={styles.textRegister}>
          Não tem uma conta?{" "}
          <Text style={{ color: colors.light[200] }}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
