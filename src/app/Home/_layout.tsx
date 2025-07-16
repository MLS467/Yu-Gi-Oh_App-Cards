import CustomDrawerContent from "@/components/CustomDrawerContent";
import { colors } from "@/constants/Colors";
import { HomeProvider } from "@/context/HomeContext/HomeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            drawerStyle: {
              backgroundColor: colors.dark[800],
              width: "70%",
            },
            headerStyle: {
              backgroundColor: colors.dark[700],
              elevation: 0,
              shadowColor: "transparent",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            },
            headerTintColor: colors.light[200],

            headerTitle: "",
            headerTitleAlign: "left",
            drawerActiveBackgroundColor: colors.primary.default,
            drawerInactiveTintColor: colors.dark[300],
            drawerActiveTintColor: colors.light[200],

            // Ícone personalizado no lugar do hambúrguer
            headerLeft: () => (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  marginLeft: 15,
                  height: 50,
                  alignItems: "center",
                }}
                onPress={() => navigation.toggleDrawer()}
              >
                <MaterialCommunityIcons
                  name="page-layout-sidebar-left"
                  size={20}
                  color={colors.light[200]}
                />
              </TouchableOpacity>
            ),
          })}
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
              drawerItemStyle: { display: "none" },
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
