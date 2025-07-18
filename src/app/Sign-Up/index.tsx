import { styles as homeStyle } from "@/app/Home/styles";
import { colors } from "@/constants/Colors";
import { useSignUp } from "@/Hook/useSignUp";
import { Usuario } from "@/model/User";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { styles } from "./styles";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    cadastrar,
    urlDevice,
    setUrlDevice,
    tiraFoto,
    buscaNaGaleria,
    reset,
  } = useSignUp();

  const [senhaVisible, setSenhaVisible] = useState(false);
  const [confirmarSenhaVisible, setConfirmarSenhaVisible] = useState(false);

  async function onSubmit(formData: any) {
    try {
      const usuario = new Usuario(
        formData.nome,
        formData.email,
        urlDevice || formData.fotoUrl,
        formData.senha
      );
      await cadastrar(usuario.toFirestore());
      reset();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={homeStyle.header}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Alterar foto", "Escolha uma opção:", [
              {
                text: "Galeria",
                onPress: async () => {
                  try {
                    const result = await buscaNaGaleria();
                    if (
                      !result.canceled &&
                      result.assets &&
                      result.assets.length > 0
                    ) {
                      const uri = result.assets[0].uri;
                      setUrlDevice(uri);
                    }
                  } catch (error) {
                    console.error("Erro ao obter imagem da galeria:", error);
                  }
                },
              },
              {
                text: "Tirar foto",
                onPress: async () => {
                  try {
                    const result = await tiraFoto();
                    if (
                      !result.canceled &&
                      result.assets &&
                      result.assets.length > 0
                    ) {
                      const uri = result.assets[0].uri;
                      setUrlDevice(uri);
                    }
                  } catch (error) {
                    console.error("Erro ao tirar foto:", error);
                  }
                },
              },
              { text: "Cancelar", style: "cancel" },
            ]);
          }}
          activeOpacity={0.7}
        >
          {urlDevice ? (
            <Image style={styles.logo} source={{ uri: urlDevice }} />
          ) : (
            <Image style={styles.logo} source={require("@/assets/folha.png")} />
          )}
          <Text style={styles.title}>Cadastro de Usuário</Text>
        </TouchableOpacity>
        <View style={homeStyle.arrowBack}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.light[200]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="nome"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Nome"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              error={!!errors.nome}
            />
          )}
        />
        {errors.nome && (
          <Text style={{ color: "red" }}>{errors.nome.message}</Text>
        )}

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
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="senha"
          rules={{
            required: "Senha é obrigatória",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Senha"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              secureTextEntry={!senhaVisible}
              error={!!errors.senha}
              right={
                <TextInput.Icon
                  icon={senhaVisible ? "eye-off" : "eye"}
                  onPress={() => setSenhaVisible((prev) => !prev)}
                />
              }
            />
          )}
        />
        {errors.senha && (
          <Text style={{ color: "red" }}>{errors.senha.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmar_senha"
          rules={{
            required: "Confirmação de senha é obrigatória",
            validate: (value) =>
              value === watch("senha") || "As senhas não coincidem",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Confirmar Senha"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              secureTextEntry={!confirmarSenhaVisible}
              error={!!errors.confirmar_senha}
              right={
                <TextInput.Icon
                  icon={confirmarSenhaVisible ? "eye-off" : "eye"}
                  onPress={() => setConfirmarSenhaVisible((prev) => !prev)}
                />
              }
            />
          )}
        />
        {errors.confirmar_senha && (
          <Text style={{ color: "red" }}>{errors.confirmar_senha.message}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ ...styles.button, margin: 16 }}
        >
          <Text style={styles.textBtn}>Cadastrar</Text>
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
