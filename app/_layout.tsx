import { ThemeProvider } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const InitialLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        {/* <Stack.Screen name="(modals)/profileModal" options={{ presentation: "modal" }} /> */}
      </Stack>
    </>
  );
};

export const DATABASE_NAME = "finance_app.db";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Suspense fallback={<ActivityIndicator size={"large"} />}>
        <ThemeProvider>
          <InitialLayout />
        </ThemeProvider>
      </Suspense>
    </SafeAreaProvider>
  );
}
