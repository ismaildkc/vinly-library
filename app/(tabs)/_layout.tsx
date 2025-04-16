import { Pressable } from "react-native";
import { useEffect } from "react";
import { Tabs } from "expo-router";
import { useRouter, Redirect } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/src/constants/Colors";
import { Size } from "@/src/constants/Sizes";

export default function TabLayout() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  // Yükleme sırasında bir şey gösterme
  if (loading) {
    return null;
  }

  // Kullanıcı oturum açmamışsa, yönlendirme yapmadan önce null döndür
  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.primaryDark,
          borderTopColor: Colors.light.primaryLight,
          borderTopWidth: 1,
          height: 100,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.light.yellow,
        tabBarInactiveTintColor: Colors.light.gray,
        tabBarLabelStyle: {
          fontSize: Size.fontSize.xs,
          fontWeight: "light",
        },
      }}
    > 
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="compact-disc" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="disc-player" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable onPress={() => logout()} style={{ marginRight: 15 }}>
              <FontAwesome name="sign-out" size={24} color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="record-player" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
