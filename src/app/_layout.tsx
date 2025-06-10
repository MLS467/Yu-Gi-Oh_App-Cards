import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
