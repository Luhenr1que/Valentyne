import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AudioProvider } from './audioContext.js';

import Draws from './src/pages/draws';
import Final from './src/pages/final';
import Inicio from './src/pages/inicio';
import Memories from './src/pages/memories';
import Music from './src/pages/musicPage';
import Splach from './src/pages/splach';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Splach'
          component={Splach}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Inicio'
          component={Inicio}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Music'
          component={Music}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Memories'
          component={Memories}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Draws'
          component={Draws}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Final'
          component={Final}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AudioProvider>
  );
}

