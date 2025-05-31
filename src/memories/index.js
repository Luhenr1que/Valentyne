import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../audioContext.js';
import { useEffect} from 'react';

export default function Memories (){
      const navigation = useNavigation();
      const { playSound } = useAudio();
      
      useEffect(()=>{
          playSound();
      },)
}