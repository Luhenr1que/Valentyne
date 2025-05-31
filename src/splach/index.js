import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import { ActivityIndicator} from 'react-native';
import { useAudio } from '../../audioContext.js';
import { Video } from 'expo-av';

export default function Splach (){
    const navigation = useNavigation();
    const { playSound } = useAudio();

    useEffect(()=>{
        playSound();
        setTimeout(()=>{
            navigation.navigate('Inicio')
    },5000)

},)

const load = [
    {
    gif: require('../../assets/img/splash/one.mp4'),
},
    {
    gif: require('../../assets/img/splash/two.mp4'),
},
    {
    gif: require('../../assets/img/splash/three.mp4'),
},
    {
    gif: require('../../assets/img/splash/four.mp4'),
},
    {
    gif: require('../../assets/img/splash/five.mp4'),
}]

    const r = Math.floor(Math.random()*load.length)



return(
    <Video source={load[r].gif} rate={1.0} volume={1.0} isMuted={true} resizeMode="cover" shouldPlay isLooping={true} style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center',borderWidth:10, borderColor:'#6c2400', margin:0,padding:0, }}>
        <ActivityIndicator size='large' color='#6c2500' style={{ transform: [{ scale: 1.5 }], alignSelf:'center', top:'30%',}} />
    </Video>
)
}