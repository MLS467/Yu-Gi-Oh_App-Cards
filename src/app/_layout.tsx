import { colors } from "@/constants/Colors";
import CrudProvider from "@/context/Crud/CrudProvider";
import { AuthProvider } from "@/context/FireBaseContext/FireBaseProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/Hook/useAuth";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente que usa o contexto DENTRO do AuthProvider
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.dark[800],
        }}
      >
        <ActivityIndicator size="large" color={colors.light[200]} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.dark[800],
        },
      }}
    >
      {!user ? (
        // ROTAS PÚBLICAS (usuário não logado)
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Sign-Up/index" options={{ headerShown: false }} />
        </>
      ) : (
        // ROTAS PROTEGIDAS (usuário logado)
        <>
          <Stack.Screen name="Home/index" options={{ headerShown: false }} />
          {/* Adicione outras rotas protegidas aqui */}

          <Stack.Screen
            name="/Home/cardDetails/[id]"
            options={{ headerShown: false }}
          />
          {/* Adicione outras rotas protegidas aqui */}
        </>
      )}
    </Stack>
  );
};

const RootLayout = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <CrudProvider>
            <AppNavigator />
          </CrudProvider>
        </AuthProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default RootLayout;
