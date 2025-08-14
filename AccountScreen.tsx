import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountScreen: React.FC = () => {
  const userName = 'John Doe';
  const userEmail = 'john.doe@email.com';
  const totalBills = 12;
  const friendsCount = 8;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Card în stil Banca Transilvania */}
      <LinearGradient
        colors={['#4D734C', '#172621']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity>
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userEmail}>{userEmail}</Text>
        <View style={styles.cardStats}>
          <View>
            <Text style={styles.statNumber}>{totalBills}</Text>
            <Text style={styles.statLabel}>Total Bills</Text>
          </View>
          <View>
            <Text style={styles.statNumber}>{friendsCount}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Opțiuni cont */}
      <View style={styles.optionsContainer}>
        <OptionItem icon="person" label="Edit Profile" onPress={() => {}} />
        <OptionItem icon="lock-closed" label="Change Password" onPress={() => {}} />
        <OptionItem icon="card" label="Payment Methods" onPress={() => {}} />
        <OptionItem icon="log-out" label="Logout" onPress={() => {}} danger />
      </View>
    </ScrollView>
  );
};

interface OptionItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
}

const OptionItem: React.FC<OptionItemProps> = ({ icon, label, onPress, danger }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={styles.optionLeft}>
      <Icon name={icon} size={22} color={danger ? '#ff4d4d' : '#4D734C'} />
      <Text style={[styles.optionText, danger && { color: '#ff4d4d' }]}>{label}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#D0D0D0" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172621',
    padding: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    color: '#D0D0D0',
    fontSize: 14,
    marginTop: 5,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#D0D0D0',
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: '#2A4038',
    borderRadius: 15,
    paddingVertical: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#3a574d',
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#D0D0D0',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default AccountScreen;
