import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';

function GroupsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Groups Page</Text>
    </View>
  );
}

function FriendsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Friends Page</Text>
    </View>
  );
}

function BillsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Bills Page</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Account Page</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <>
      <View style={{ flex: 1 }}>
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

       
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.text}>Choose an action</Text>
            <Button
              title="Add Bill"
              onPress={() => {
                setModalVisible(false);
                alert('Bill added!');
              }}
            />
            <Button
              title="Open Camera"
              onPress={async () => {
                setModalVisible(false);
                if (!permission || !permission.granted) {
                  await requestPermission();
                }
                setCameraVisible(true);
              }}
            />
            <Button title="Close" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

     
      <Modal visible={cameraVisible} animationType="slide">
        <CameraView style={{ flex: 1 }} facing="back" />
        <Button title="Close Camera" onPress={() => setCameraVisible(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#172621', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#D0D0D0', fontSize: 20 },
  floatingButton: {
    position: 'absolute',
    bottom: 35, 
    left: '50%',
    marginLeft: -30, 
    width: 60,
    height: 60,
    backgroundColor: '#4D734C',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#2A4038', padding: 20, borderRadius: 10, width: 300, alignItems: 'center' },
});
