import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import  { BilhetesView }  from './src/bilhetes/BilhetesView';
import {Card} from './src/bilhetes/card'
import  {HomeView}  from './src/home/HomeView';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          <Stack.Screen name='home' component={HomeView} options={homeOptions} />
          <Stack.Screen name='bilhetes' component={BilhetesView} options={bilhetesOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    
    

    /*<View><HomeView/></View>*/
  );
}


const homeOptions = {
  headerShown: false
}

const bilhetesOptions = {
  title: 'Lista de bilhetes'
}

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#0097ff'
  },
  headerTintColor: 'white'
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
