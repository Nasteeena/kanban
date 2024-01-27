import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { updateProfile, getAuth } from "firebase/auth";
import { db } from '@/firebase';
import handleAsyncError from './network/request';


const dataBaseUse = {
    deleteFromDataBase: async (url: string) => {
        return handleAsyncError(async () => {
            await deleteDoc(doc(db, url)); 
        })
    },

    addToDatabase: async () => {
        return handleAsyncError(async () => {
        })
    },

    updateUserName: async (updatedName: string) => {
        return handleAsyncError(async () => {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                displayName: updatedName
            })
        })
    }
};

export default dataBaseUse;
