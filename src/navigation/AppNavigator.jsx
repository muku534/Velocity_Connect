import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import CategoriesScreen from '../screens/categories/CategoriesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../components/Pixel/Index';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hide the header for tab screens
                tabBarStyle: {
                    position: 'absolute',
                    width: '100%',
                    height: hp(5.5),
                    backgroundColor: '#fff',
                    borderTopColor: '#f2f2f2',
                },
                tabBarLabelStyle: {
                    fontSize: hp(1.4), // Customize label font size
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Welcome') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Categories') {
                        iconName = focused ? 'grid' : 'grid-outline';
                    }

                    // Return the icon component
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                    tabBarLabel: 'Welcome',
                    headerShown: false // Label for the Welcome tab
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    tabBarLabel: 'Categories', // Label for the Categories tab
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;
