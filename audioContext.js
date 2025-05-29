import { createContext, useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const useAudio = () =>useContext(AudioContext);

export const AudioProvider = ({children}) => {
    const [sound, setSound] = useState(null);
    const [mutado, setMutado] = useState(false)

    //Audio de fundo
    const playSound = async () => {
        if(sound) return

        const {sound: newSound} = await Audio.Sound.createAsync(
            require('./assets/music/fundo.mp3'),
            { shouldPlay: true, isLooping: true}
        )
        //Volume
        await newSound.setVolumeAsync(0.1);
        setSound(newSound)
        await newSound.playAsync();
    }
    
/*     //Audio dos botoes
    const playSomBot = async () => {
        if (mutado) return;
        const { sound: som } = await Audio.Sound.createAsync(
          require('./assets/music/button.mp3')
        )
        //Volume
        await som.setVolumeAsync(0.2);
        await som.playAsync();
    
        som.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            som.unloadAsync();
          }
        })
      } */

/*       const mutar = async() => {
        if(!sound) return

        const novoVolume = mutado ? 0.02 : 0 
        await sound.setVolumeAsync(novoVolume)
        setMutado(!mutado)
      } */

      useEffect(() => {
        const prepararAudio = async () => {
          await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            shouldDuckAndroid: false,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
          });

          playSound(); // autoplay aqui
        };

        prepararAudio();
      }, []);

    useEffect(() => {
        return sound
        ? () => {
            sound.unloadAsync();
        }
        : undefined
    }, [sound])

    return(
        <AudioContext.Provider value={{playSound/* , playSomBot, mutado, mutar */}}>
            {children}
        </AudioContext.Provider>
    )

}


