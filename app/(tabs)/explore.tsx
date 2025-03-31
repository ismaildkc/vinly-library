import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Label from '@/components/Label';
import Input from '@/components/Input';

export default function ExploreScreen() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);
  
  return (
    <View style={styles.container}>
      <Text>Explore</Text>

      <Label label="Search" />
      <Input
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});