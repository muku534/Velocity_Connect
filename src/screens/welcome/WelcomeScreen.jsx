import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
                <Text style={styles.welcomeText}>Welcome</Text>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20, // Increased font size for better visibility
        color: 'black', // Text color
        fontWeight: 'bold', // Make the welcome text stand out
    },
});
