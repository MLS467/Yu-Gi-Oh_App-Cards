// components/CustomDrawerContent.tsx
import { colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";

import type { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Topo */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>YG</Text>
        </View>
        <Text style={styles.logoText}>
          Yu-Gi-<Text style={{ color: colors.primary.alt1 }}>Oh!</Text>
        </Text>
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
    borderBottomColor: colors.dark[700],
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
