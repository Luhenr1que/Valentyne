import { StatusBar } from 'expo-status-bar';
import { useState, useEffect }  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AudioProvider } from './audioContext.js';
import * as Font from 'expo-font';

import Draws from './src/pages/draws';
import Final from './src/pages/final';
import Inicio from './src/pages/inicio';
import Memories from './src/pages/memories';
import Music from './src/pages/musicPage';
import Splach from './src/pages/splach';
import Game from './src/pages/game/index.js';
import Natal from './src/pages/feriados/natal.js';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {

  const [font,setFont] = useState(false)

    useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'nunito': require('./assets/fonts/Nunito-SemiBold.ttf'),
      })
      setFont(true)
    }
    loadFonts()
  }, [])

  return (
    <AudioProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splach">
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
        <Stack.Screen
          name='Game'
          component={Game}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Natal'
          component={Natal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AudioProvider>
  );
}

