import { colors } from "@/constants/Colors";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  useEffect(() => {
    // (opcional) trava splash enquanto carrega o tema
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.dark[800],
            },
          }}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default RootLayout;
