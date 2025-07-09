import { colors } from "@/constants/Colors";
import { AuthProvider } from "@/context/FireBaseContext/FireBaseProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: colors.dark[800],
              },
            }}
          />
        </AuthProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default RootLayout;
