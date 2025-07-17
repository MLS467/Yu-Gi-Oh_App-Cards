import YugiohLoading from "@/components/YugiohLoading";
import { colors } from "@/constants/Colors";
import CrudProvider from "@/context/Crud/CrudProvider";
import { AuthProvider } from "@/context/FireBaseContext/FireBaseProvider";
import { HomeProvider } from "@/context/HomeContext/HomeContext";
import LoginProvider from "@/context/ScreenContext/Login/LoginProvider";
import SignUpProvider from "@/context/SignUpContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/Hook/useAuth";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente que usa o contexto DENTRO do AuthProvider
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <YugiohLoading />;
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
        //  ROTAS PÚBLICAS (usuário não logado)
        <>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="Sign-Up/index" options={{ headerShown: false }} />
        </>
      ) : (
        // ROTAS PROTEGIDAS (usuário logado)
        <>
          <Stack.Screen name="Home/index" options={{ headerShown: false }} />

          <Stack.Screen
            name="Home/cardDetails/[id]"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home/myDeck/detailsMyDeck/[id]"
            options={{ headerShown: false }}
          />
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

  const [fontsLoaded] = useFonts({
    YugiOh: require("../../assets/font/matrix.ttf"),
  });

  if (!fontsLoaded) {
    return <View />; // ou uma tela de loading
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <LoginProvider>
            <CrudProvider>
              <HomeProvider>
                <SignUpProvider>
                  <AppNavigator />
                </SignUpProvider>
              </HomeProvider>
            </CrudProvider>
          </LoginProvider>
        </AuthProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default RootLayout;
