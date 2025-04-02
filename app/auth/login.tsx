import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { Link, useRouter } from "expo-router";
import Button from "@/components/button";
import { useAuth } from "@/context/AuthContext";
import Type from "@/components/Type";
import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen email ve şifre girin");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Giriş Hatası", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Type type="themeTitle" style={{ textAlign: "center", marginBottom: 5 }}>
        Login
      </Type>

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

      <Button onPress={handleLogin} disabled={isLoading}>
        <Type style={{ color: Colors.light.white, fontSize: 16 }}>
          {isLoading ? "Login..." : "Login"}
        </Type>
      </Button>

      <Link href="/auth/register" asChild>
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
    justifyContent: "center",
    gap: 10,
  },
  linkButton: {
    alignItems: "center",
    padding: 10,
  },
});
