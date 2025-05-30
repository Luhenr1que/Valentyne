import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../audioContext.js';
import { useEffect} from 'react';

export default function Music (){
    const navigation = useNavigation();
    const { playSound } = useAudio();
      
      useEffect(()=>{
          playSound();
    },)


return(
    <View></View>
)
}