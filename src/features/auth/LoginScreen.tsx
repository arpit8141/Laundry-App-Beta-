import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setPhoneAndNext, loginSuccess, resetAuth } from '../../store/slices/authSlice';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { step, phoneNumber } = useSelector((state: RootState) => state.auth);
    const [inputValue, setInputValue] = useState('');

    const handleAction = () => {
        if (step === 'PHONE') {
            if (inputValue.length < 10) {
                Alert.alert("Error", "Please enter a valid 10-digit number");
                return;
            }
            dispatch(setPhoneAndNext(inputValue));
            setInputValue(''); // Clear input for OTP
        } else {
            // MOCK OTP CHECK: For now, we use '1234'
            if (inputValue === '1234') {
                dispatch(loginSuccess());
            } else {
                Alert.alert("Error", "Invalid OTP. Hint: Use 1234");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>LaundryApp Beta</Text>

            <Text style={styles.label}>
                {step === 'PHONE' ? "Enter Mobile Number" : `Enter OTP sent to ${phoneNumber}`}
            </Text>

            <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder={step === 'PHONE' ? "9876543210" : "1234"}
                value={inputValue}
                onChangeText={setInputValue}
                maxLength={step === 'PHONE' ? 10 : 4}
            />

            <TouchableOpacity style={styles.button} onPress={handleAction}>
                <Text style={styles.buttonText}>
                    {step === 'PHONE' ? "Send OTP" : "Verify & Login"}
                </Text>
            </TouchableOpacity>

            {step === 'OTP' && (
                <TouchableOpacity onPress={() => dispatch(resetAuth())}>
                    <Text style={styles.backLink}>Change Phone Number</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#f9f9f9' },
    header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#2c3e50' },
    label: { fontSize: 16, marginBottom: 10, color: '#7f8c8d' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, fontSize: 18, borderWidth: 1, borderColor: '#ddd', marginBottom: 20 },
    button: { backgroundColor: '#3498db', padding: 18, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    backLink: { marginTop: 20, textAlign: 'center', color: '#3498db', textDecorationLine: 'underline' },
});