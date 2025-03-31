import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Çıkış Hatası', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      
      <View style={styles.card}>
        <Text>Kullanıcı Bilgileri</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Kullanıcı ID: {user?.uid}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF3B30',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 