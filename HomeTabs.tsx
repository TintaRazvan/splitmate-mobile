import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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

        {/* Buton + centrat peste tab bar */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal minimalist */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose an action</Text>

            <View style={styles.actionRow}>
              {/* Add Bill */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setModalVisible(false);
                  alert('Bill added!');
                }}
              >
                <Icon name="receipt" size={30} color="#fff" />
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
                <Icon name="camera" size={30} color="#fff" />
                <Text style={styles.actionText}>Open Camera</Text>
              </TouchableOpacity>
            </View>

            {/* Close */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Camera */}
      <Modal visible={cameraVisible} animationType="slide">
        <CameraView style={{ flex: 1 }} facing="back" />
        <TouchableOpacity
          style={{
            backgroundColor: '#4D734C',
            padding: 15,
            alignItems: 'center',
          }}
          onPress={() => setCameraVisible(false)}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Close Camera</Text>
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
    bottom: 35, // peste tab bar
    left: '50%',
    marginLeft: -30, // jumătate din lățimea butonului
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#2A4038',
    borderRadius: 15,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#D0D0D0',
    marginBottom: 20,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#4D734C',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  closeBtn: {
    backgroundColor: '#3A564D',
    borderRadius: 20,
    padding: 8,
    marginTop: 10,
  },
});
