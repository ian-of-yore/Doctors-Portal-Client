import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext();

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();
    }, [])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const emailPasswordLogIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const socialLogInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, providerGoogle);
    }

    const userLogOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        createUser,
        emailPasswordLogIn,
        socialLogInGoogle,
        user,
        updateUserProfile,
        userLogOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;