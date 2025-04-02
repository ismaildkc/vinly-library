import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { useAuth } from '@/context/AuthContext';
import Type from '@/components/Type';
import Input from '@/components/Input';
import Button from '@/components/button';
import { Colors } from '@/constants/Colors';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen email ve şifre girin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Kayıt Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Type type="themeTitle" style={{ textAlign: "center", marginBottom: 5 }}>Sign Up</Type>
      
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button 
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Type style={{ color: Colors.light.white, fontSize: 16 }}>
          {isLoading ? 'Register...' : 'Rregister'}
        </Type>
      </Button>
      
      <Link href="/auth/login" asChild>
        <TouchableOpacity style={styles.linkButton}>
          <Type>Don't have an account? Sign up</Type>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 70,
    justifyContent: "center",
    gap: 10,
  },
  linkButton: {
    alignItems: 'center',
    padding: 10,
  },
}); 