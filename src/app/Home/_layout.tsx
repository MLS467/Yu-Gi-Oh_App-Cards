import { colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.dark[800], // cor do fundo do drawer
            width: 170,
          },
          headerStyle: {
            backgroundColor: colors.dark[800],
          },
          headerTintColor: colors.light[200],
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.light[200],
          },
          headerTitleAlign: "left",
          drawerActiveBackgroundColor: colors.primary.default,
          drawerInactiveTintColor: colors.light[200],
          drawerActiveTintColor: colors.light[200],
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerLabel: "Home",
            drawerIcon: ({ size }) => (
              <MaterialIcons
                name="home"
                size={size}
                color={colors.light[200]}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="cardDetails/[id]"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        <Drawer.Screen
          name="SignOut"
          options={{
            title: "SignOut",
            headerTitleContainerStyle: {
              paddingLeft: 10,
            },
            headerShown: false,
            drawerLabel: "Sign Out",
            drawerActiveBackgroundColor: colors.primary.default,
            drawerActiveTintColor: "#fff",
            drawerIcon: ({ size }) => (
              <MaterialIcons
                name="logout"
                size={size}
                color={colors.light[200]}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
