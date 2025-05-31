import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AudioProvider } from './audioContext.js';

import Inicio from './src/inicio/index.js';
import Memories from './src/memories/index.js';
import Draws from './src/draws/index.js';
import Music from './src/music/index.js';
import Splach from './src/splach/index.js';
import Final from './src/final/index.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <AudioProvider>

  <NavigationContainer>
    <StatusBar 
      hidden={true}
    />
      <Stack.Navigator>
        <Stack.Screen 
          name="Splach" 
          component={Splach} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Memories" 
          component={Memories} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Draws" 
          component={Draws} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Music" 
          component={Music} 
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen 
          name="Final" 
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

