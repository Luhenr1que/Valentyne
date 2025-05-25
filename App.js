import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import inicio from './src/inicio';
import memories from './src/memories';
import draws from './src/draws';
import music from './src/music';
import splach from './src/splach';
import final from './src/final';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

  <NavigationContainer>
    <StatusBar 
      hidden={true}
    />
      <Stack.Navigator>
        <Stack.Screen 
          name="Splach" 
          component={splach} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Inicio" 
          component={inicio} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Memories" 
          component={memories} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Draws" 
          component={draws} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Music" 
          component={music} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Final" 
          component={final} 
          options={{
            headerShown: false,
          }}
          />
        </Stack.Navigator>

  </NavigationContainer>
)}

