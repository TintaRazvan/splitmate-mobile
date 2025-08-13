import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

function GroupsScreen(){
    return <View style={styles.screen}><Text style={styles.text}>Groups Page</Text></View>;
}

function FriendsScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Friends Page</Text></View>;
}

function AddScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Add New Item</Text></View>;
}

function BillsScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Bills Page</Text></View>;
}

function AccountScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Account Page</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#172621', borderTopWidth: 0, height: 70 },
        tabBarActiveTintColor: '#4D734C',
        tabBarInactiveTintColor: '#D0D0D0',
      }}
    >
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="people" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <TouchableOpacity style={styles.floatingButton}>
              <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Bills"
        component={BillsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="receipt" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#172621', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#D0D0D0', fontSize: 20 },
  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: '#4D734C',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});