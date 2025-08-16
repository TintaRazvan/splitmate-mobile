import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Importăm AccountScreen din fișierul dedicat
import AccountScreen from './AccountScreen';

function GroupsScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Groups Page</Text></View>;
}

function FriendsScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Friends Page</Text></View>;
}

function BillsScreen() {
  return <View style={styles.screen}><Text style={styles.text}>Bills Page</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <>
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
          options={{ tabBarIcon: ({ color, size }) => <Icon name="people" color={color} size={size} /> }} 
        />
        <Tab.Screen 
          name="Friends" 
          component={FriendsScreen} 
          options={{ tabBarIcon: ({ color, size }) => <Icon name="person" color={color} size={size} /> }} 
        />
        <Tab.Screen 
          name="Bills" 
          component={BillsScreen} 
          options={{ tabBarIcon: ({ color, size }) => <Icon name="receipt" color={color} size={size} /> }} 
        />
        <Tab.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} /> }} 
        />
      </Tab.Navigator>

      {/* Buton + centrat peste tab bar */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal principal minimalizat */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentSmall}>
            <Text style={styles.modalTitle}>Choose an action</Text>

            <View style={styles.actionRow}>
              {/* Add Bill */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => { setModalVisible(false); alert('Bill added!'); }}
              >
                <Icon name="document-text-outline" size={36} color="#4D734C" />
                <Text style={styles.actionText}>Add Bill</Text>
              </TouchableOpacity>

              {/* Open Camera */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={async () => {
                  setModalVisible(false);
                  if (!permission || !permission.granted) {
                    await requestPermission();
                  }
                  setCameraVisible(true);
                }}
              >
                <Icon name="camera-outline" size={36} color="#4D734C" />
                <Text style={styles.actionText}>Open Camera</Text>
              </TouchableOpacity>
            </View>

            {/* Close */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal pentru Camera */}
      <Modal visible={cameraVisible} animationType="slide">
        <CameraView style={{ flex: 1 }} facing="back" />
        <TouchableOpacity
          style={styles.closeButtonCamera}
          onPress={() => setCameraVisible(false)}
        >
          <Text style={styles.closeText}>Close Camera</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#172621', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#D0D0D0', fontSize: 20 },
  floatingButton: {
    position: 'absolute',
    bottom: 35, // centrat vertical peste tab bar
    left: '50%',
    transform: [{ translateX: -30 }], // jumătate din dimensiunea butonului
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
    zIndex: 10,
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContentSmall: {
    backgroundColor: '#2A4038',
    padding: 20,
    borderRadius: 15,
    width: 280,
    alignItems: 'center'
  },
  modalTitle: {
    color: '#D0D0D0',
    fontSize: 18,
    marginBottom: 15
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  actionText: {
    color: '#D0D0D0',
    marginTop: 5,
    fontSize: 14
  },
  closeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8
  },
  closeText: {
    color: '#fff',
    fontSize: 14
  },
  closeButtonCamera: {
    backgroundColor: 'red',
    padding: 15,
    alignItems: 'center'
  }
});
