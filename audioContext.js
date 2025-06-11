import { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

// Cria o contexto
const AudioContext = createContext();

// Hook customizado para usar o contexto
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);

  const playSound = async () => {
    try {
      if (sound) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        require('./assets/music/fundo.mp3'),
        { shouldPlay: true, isLooping: true }
      );

      await newSound.setVolumeAsync(0.2);
      setSound(newSound);
      await newSound.playAsync();
    } catch (e) {
      console.error('Erro ao tocar som:', e);
    }
  };

  const pauseBackgroundMusic = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
      }
    } catch (e) {
      console.error('Erro ao pausar música de fundo:', e);
    }
  };

  const resumeBackgroundMusic = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      }
    } catch (e) {
      console.error('Erro ao retomar música de fundo:', e);
    }
  };

  const playSomBot = async () => {
    try {
      const { sound: som } = await Audio.Sound.createAsync(
        require('./assets/music/botao.mp3')
      );

      await som.setVolumeAsync(0.7);
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

  const playSomBotCode = async () => {
    try {
      const { sound: som } = await Audio.Sound.createAsync(
        require('./assets/music/botCode.mp3')
      );

      await som.setVolumeAsync(0.7);
      await som.playAsync();

      som.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          som.unloadAsync();
        }
      });
    } catch (e) {
      console.error('Erro no som do botão (Code):', e);
    }
  };

  useEffect(() => {
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
    <AudioContext.Provider
      value={{
        playSound,
        playSomBot,
        playSomBotCode,
        pauseBackgroundMusic,
        resumeBackgroundMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
