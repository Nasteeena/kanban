import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFromLocal } from '@/utils/localStore';
import { auth } from '@/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { userInterface } from '@/interfaces/user.interface';
import dataBaseUse from '@/utils/databaseUse';

const initialState : userInterface = {
    email: getFromLocal('email'),
    id: getFromLocal('userId'),
    displayName: getFromLocal('userName'),
    loginErrorMessage: undefined,
    registerErrorMessage: undefined,
    nameLoading: false
};

export const logIn = createAsyncThunk('user/login', 
    async(params: {email: string, password: string}) => {
            const userData = await signInWithEmailAndPassword(auth, params.email, params.password);
            const user = userData.user;
            await dataBaseUse.updateUserName(user.displayName)

            return {
                email: user.email,
                id: user.uid,
                displayName: user.displayName
            };
    }
);

export const register = createAsyncThunk('user/register', 
    async(params: {email: string, password: string, userName: string}) => {
            const userData = await createUserWithEmailAndPassword(auth, params.email, params.password);
            const user = userData.user;
            await dataBaseUse.updateUserName(params.userName)

            return {
                email: user.email,
                id: user.uid,
                displayName: user.displayName
            };
    }
);

export const updateName = createAsyncThunk('user/updateName', 
    async(updatedName) => {
        await dataBaseUse.updateUserName(updatedName)

        return {
            userName: auth.currentUser?.displayName
        }
    }
)

export const userSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        removeUser: (state) => {
            state.email = null;
            state.id = null;
            state.displayName = null;
        },
        
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined;
        },

        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined;
        },

        clearLoader: (state) => {
            state.nameLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
        });

        builder.addCase(logIn.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.displayName = action.payload.displayName;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });

        builder.addCase(updateName.fulfilled, (state, action) => {
            state.displayName = action.payload.userName;
        })

        builder.addCase(updateName.pending, (state) => {
            state.nameLoading = true;
        })
    }
});

export const { removeUser, clearLoginError, clearRegisterError, clearLoader } = userSlice.actions;
export default userSlice.reducer;
