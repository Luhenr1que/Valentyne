import { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';  // Corrigindo a importação

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);

  // Som de fundo
  const playSound = async () => {
    try {
      if (sound) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('./assets/music/fundo.mp3'),
        { shouldPlay: true, isLooping: true }
      );

      await newSound.setVolumeAsync(0.2);  // Aumentando o volume para teste
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      console.error('Erro ao tocar som:', e);
    }
  };

  // Som dos botões
  const playSomBot = async () => {
    try {
      const { sound: som } = await Audio.Sound.createAsync(
        require('./assets/music/botao.mp3')
      );

      await som.setVolumeAsync(0.7);  // Aumentando o volume para teste
      await som.playAsync();

      som.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          som.unloadAsync();
        }
      });
    } catch (e) {
      console.error('Erro no som do botão:', e);
    }
  };

  // Som dos botões
  const playSomBotCode = async () => {
    try {
      const { sound: som } = await Audio.Sound.createAsync(
        require('./assets/music/botCode.mp3')
      );

      await som.setVolumeAsync(0.7);  // Aumentando o volume para teste
      await som.playAsync();

      som.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          som.unloadAsync();
        }
      });
    } catch (e) {
      console.error('Erro no som do botão:', e);
    }
  };

  useEffect(() => {
    // Configuração inicial do áudio
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    playSound();
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, playSomBot,playSomBotCode }}>
      {children}
    </AudioContext.Provider>
  );
};