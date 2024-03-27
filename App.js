import React, { useCallback } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import Route from './Routes/Route';

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();



export default function App() {
  const [isLoaded] = useFonts({
    'JosefinSans-Bold': require('./assets/font/JosefinSans-Bold.ttf'),
    'JosefinSans-BoldItalic': require('./assets/font/JosefinSans-BoldItalic.ttf'),
    'JosefinSans-ExtraLight': require('./assets/font/JosefinSans-ExtraLight.ttf'),
    'JosefinSans-Medium': require('./assets/font/JosefinSans-Medium.ttf'),
    'JosefinSans-MediumItalic': require('./assets/font/JosefinSans-MediumItalic.ttf'),
    'JosefinSans-Regular': require('./assets/font/JosefinSans-Regular.ttf'),
    'JosefinSans-SemiBold': require('./assets/font/JosefinSans-SemiBold.ttf'),
    'JosefinSans-SemiBoldItalic': require('./assets/font/JosefinSans-SemiBoldItalic.ttf'),
    'JosefinSans-Thin': require('./assets/font/JosefinSans-Thin.ttf'),
    "JosefinSans-LightItalic":require('./assets/font/JosefinSans-LightItalic.ttf')
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <StatusBar  hidden={true}  />
      <Route/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});


