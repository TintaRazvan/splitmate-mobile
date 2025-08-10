import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  GroupDetails: { groupId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Ecran Login
function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    // aici poți adăuga validare reală
    if(email && password){
      navigation.replace('Home');
    } else {
      alert('Introdu email și parolă');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SplitMate Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Parolă"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}

// Ecran Home (lista grupuri)
function HomeScreen({ navigation }: any) {
  const groups = [
    { id: '1', name: 'Vacanță Barcelona' },
    { id: '2', name: 'Petrecere Crăciun' },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })} style={styles.groupItem}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupuri SplitMate</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

// Ecran detalii grup
function GroupDetailsScreen({ route }: any) {
  const { groupId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalii grup: {groupId}</Text>
      {/* Aici poți adăuga lista de cheltuieli și membri */}
      <Text>(Aici vom pune detalii despre cheltuieli și balanțe)</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SplitMate' }} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} options={{ title: 'Detalii Grup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  groupItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
