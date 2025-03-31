import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, Redirect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir
    if (!loading && !user) {
      router.replace('/auth/login');
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
    <Tabs>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          headerRight: () => (
            <Pressable onPress={() => logout()} style={{ marginRight: 15 }}>
              <FontAwesome name="sign-out" size={24} color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
