import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
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
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Profil</ThemedText>
      
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">Kullanıcı Bilgileri</ThemedText>
        <ThemedText>Email: {user?.email}</ThemedText>
        <ThemedText>Kullanıcı ID: {user?.uid}</ThemedText>
      </ThemedView>
      
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <ThemedText style={styles.buttonText}>Çıkış Yap</ThemedText>
      </TouchableOpacity>
    </ThemedView>
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