import { colors } from "@/constants/Colors";
import { HomeProvider } from "@/context/HomeContext/HomeContext";
import { MaterialIcons } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeProvider>
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.dark[800],
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
            drawerInactiveTintColor: colors.dark[300],
            drawerActiveTintColor: colors.light[200],
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "Home",
              drawerLabel: "Home",
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="myDeck/index"
            options={{
              title: "My Deck",
              headerShown: true,
              headerTitleStyle: {
                color: colors.light[200],
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: colors.dark[800],
              },
              headerTintColor: colors.light[200],
              drawerLabel: "My Deck",
              drawerActiveTintColor: "#fff",
              drawerActiveBackgroundColor: colors.primary.default,
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="card-travel" size={size} color={color} />
              ),
            }}
          />

          <Drawer.Screen
            name="HomeCard"
            options={{
              title: "Detalhes",
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="myDeck/DeckCard"
            options={{
              title: "Detalhes",
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="cardDetails/[id]"
            options={{
              title: "Detalhes",
              drawerItemStyle: { display: "none" },
            }}
          />

          <Drawer.Screen
            name="myDeck/detailsMyDeck/[id]"
            options={{
              title: "Detalhes My Deck",
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
              drawerIcon: ({ size, color }) => (
                <MaterialIcons name="logout" size={size} color={color} />
              ),
            }}
          />
        </Drawer>
      </HomeProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
