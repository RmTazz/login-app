import { Redirect, Slot, Stack } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
import "../global.css";
import { SessionProvider, useSession } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

function Header() {
    const { session, isLoading } = useSession();

    // Added: This block handles the loading state of the session.
    // While the session is loading (e.g., Firebase is initializing or fetching user data),
    // it displays a loading indicator to the user.
    if (isLoading) {
        return (
            <>
                <StatusBar style="dark" />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={{ marginTop: 10 }}>Loading session...</Text>
                </View>
            </>
        );
    }

    if (session) {
        return (
            <>
                <StatusBar style="dark" />
                <Redirect href="/(app)" />
            </>
        );
    }

    return (
        <>
            <StatusBar style="dark" />
        </>
    );
}

export default function RootLayout() {
    return (
        <SessionProvider>
            <ThemeProvider>
                <Header />
                <Slot />
            </ThemeProvider>
        </SessionProvider>
    );
}
