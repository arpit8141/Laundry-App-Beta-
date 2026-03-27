import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './src/store';
import { View, Text, StyleSheet } from 'react-native';
import { LoginScreen } from './src/features/auth/LoginScreen';
import { logout } from './src/store/slices/authSlice'; // Import the new action
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

const MainContent = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Welcome to LaundryApp!</Text>
      <Text style={styles.subText}>Main Screen (Coming Soon)</Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => dispatch(logout())}
      >
        <Text style={styles.resetButtonText}>Reset Auth (Dev Only)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  mainText: { fontSize: 24, fontWeight: 'bold' },
  subText: { fontSize: 16, color: '#888', marginTop: 10 },
  resetButton: {
    marginTop: 50,
    backgroundColor: '#e74c3c', // Red color
    padding: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});