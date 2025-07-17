import { db } from "@/context/FireBaseContext/firebase.config/Auth";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { deleteUser, getAuth } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./style";

const UserScreen = () => {
  const { id } = useLocalSearchParams();
  const route = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", fotoUrl: "" });

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          // Garante que id é string
          const userId = id;
          if (!userId) return;

          const userRef = doc(db, "users", userId);

          const userSnap = await getDoc(userRef);

          console.log(userSnap.data());

          if (userSnap.exists()) {
            setUser(userSnap.data());
            setForm({
              nome: userSnap.data().nome || "",
              email: userSnap.data().email || "",
              fotoUrl: userSnap.data().fotoUrl || "",
            });
          }
        } catch (error) {
          Alert.alert("Erro", "Não foi possível buscar o usuário.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, [id])
  );

  async function handleDelete(): Promise<void> {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Erro", "Nenhum usuário autenticado.");
        return;
      }

      const uid = id;

      await deleteDoc(doc(db, "users", uid));
      console.log("Documento do usuário deletado da coleção 'users'.");

      await deleteUser(user);
      console.log("Usuário autenticado deletado com sucesso.");
      Alert.alert("Sucesso", "Usuário deletado com sucesso!");
      route.push("/");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Erro",
          "É necessário fazer login novamente para deletar o usuário."
        );
      } else {
        Alert.alert("Erro", "Erro ao deletar o usuário.");
      }
      throw error;
    }
  }

  const handleEdit = async () => {
    try {
      setLoading(true);
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, form);
      Alert.alert("Sucesso", "Usuário atualizado!");
      setEditing(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível editar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2561D9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {form.fotoUrl ? (
            <Image
              source={{ uri: form?.fotoUrl || "" }}
              style={styles.avatarImg}
            />
          ) : (
            <Text style={styles.avatarText}>{form.nome.charAt(0)}</Text>
          )}
        </View>
      </View>
      <TextInput
        style={styles.input}
        value={form.nome}
        editable={editing}
        onChangeText={(text) => setForm({ ...form, nome: text })}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={form.email}
        editable={editing}
        onChangeText={(text) => setForm({ ...form, email: text })}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={form.fotoUrl}
        editable={editing}
        onChangeText={(text) => setForm({ ...form, fotoUrl: text })}
        placeholder="Foto URL"
      />
      <View style={styles.buttonRow}>
        {editing ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditing(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;
