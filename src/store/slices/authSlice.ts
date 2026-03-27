import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    phoneNumber: string;
    isLoggedIn: boolean;
    step: 'PHONE' | 'OTP'; // Tracks which screen to show
}

const initialState: AuthState = {
    phoneNumber: '',
    isLoggedIn: false,
    step: 'PHONE',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Called when user clicks "Send OTP"
        setPhoneAndNext: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
            state.step = 'OTP';
        },
        // Called when OTP is verified
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
        // To go back to phone entry if they made a mistake
        resetAuth: (state) => {
            state.step = 'PHONE';
            state.phoneNumber = '';
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.step = 'PHONE';
            state.phoneNumber = '';
        },
    },
});

export const { setPhoneAndNext, loginSuccess, resetAuth, logout } = authSlice.actions;
export default authSlice.reducer;