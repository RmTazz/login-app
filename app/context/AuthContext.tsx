// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/app/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { router } from 'expo-router';

interface UserProfile {
    uid: string;
    email: string | null;
    name?: string | null;
    // Add any other custom user data fields that are stored ONLY in Firestore here
    // Example: phoneNumber?: string;
    // Example: address?: string;
}

// Define an interface for the data structure that is actually stored in Firestore documents
interface FirestoreUserDocData {
    name?: string | null;
    email?: string | null; // Optional: if you also store email in Firestore (redundant with Auth)
    // Add other fields that you explicitly save in Firestore for the user profile
    // Example: phoneNumber?: string;
    // Example: address?: string;
}

interface AuthContextType {
    session: UserProfile | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseAuthUser | null) => {
            if (firebaseUser) {
                try {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        // Correctly cast the Firestore data to reflect what's actually in the document
                        const firestoreData = userDocSnap.data() as FirestoreUserDocData;

                        setSession({
                            uid: firebaseUser.uid, // Always take UID from Firebase Auth
                            email: firebaseUser.email, // Always take email from Firebase Auth
                            name: firebaseUser.displayName || firestoreData.name, // Prefer Auth displayName, fallback to Firestore
                            // Explicitly add other fields from firestoreData that are part of UserProfile
                            // For example, if UserProfile had `phoneNumber`:
                            // phoneNumber: firestoreData.phoneNumber,
                            // Add other custom fields from firestoreData here if they exist in UserProfile
                        });
                    } else {
                        setSession({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: firebaseUser.displayName,
                        });
                        console.warn("User Firestore document not found for UID:", firebaseUser.uid);
                    }
                } catch (error) {
                    console.error("Error fetching user data from Firestore:", error);

                    setSession({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: firebaseUser.displayName,
                    });
                }
            } else {
                setSession(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/');
        } catch (error) {
            setIsLoading(false);
            console.error("Sign In Error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await firebaseSignOut(auth);
            setSession(null);
            router.replace('/sign-in');
        } catch (error) {
            setIsLoading(false);
            console.error("Sign Out Error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
