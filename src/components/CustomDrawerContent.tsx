// components/CustomDrawerContent.tsx
import { colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { UserContext } from "@/context/ScreenContext/userContext";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useContext } from "react";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { userData } = useContext(UserContext);
  const navigation = useRouter();

  const navUser = () => {
    navigation.navigate(`/user/${userData?.uid || "defaultUserId"}`);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Topo */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={navUser}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={styles.avatar}>
            {userData.fotoUrl ? (
              <Image
                source={{ uri: userData.fotoUrl }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            ) : (
              <Text style={styles.avatarText}>
                {userData.nome ? userData.nome.charAt(0) : "?"}
              </Text>
            )}
          </View>
          <Text
            style={{
              marginLeft: 10,
              color: colors.light[100],
              fontWeight: "bold",
            }}
          >
            {userData.nome || "Usuário"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Navegação */}
      <View style={styles.navSection}>
        <Text style={styles.navTitle}>NAVEGAÇÃO</Text>
        <DrawerItemList {...props} />
      </View>

      {/* Sign Out */}
      <View style={styles.footer}>
        <DrawerItem
          label="Sign Out"
          labelStyle={{ color: colors.primary.default }}
          icon={({ size }) => (
            <Feather
              name="log-out"
              size={size}
              color={colors.primary.default}
            />
          )}
          onPress={() => {
            // ação de logout
            props.navigation.navigate("SignOut");
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderYU[100],
  },
  avatar: {
    backgroundColor: colors.primary.alt1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: colors.dark[800],
    fontWeight: "bold",
  },
  logoText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.light[100],
    fontFamily: "YugiOh",
  },
  navSection: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  navTitle: {
    color: colors.dark[300],
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: colors.dark[700],
  },
});
