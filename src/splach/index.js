import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import { ActivityIndicator, ImageBackground} from 'react-native';
import { useAudio } from '../../audioContext.js';

export default function splach (){
    const navigation = useNavigation();
    const { playSound } = useAudio();

    useEffect(()=>{
        playSound();
        setTimeout(()=>{
            navigation.navigate('Inicio')
    },500)

},)

const load = [
    {
    gif: require('../../assets/img/splash/one.gif'),
},
    {
    gif: require('../../assets/img/splash/two.gif'),
},
    {
    gif: require('../../assets/img/splash/three.gif'),
},
    {
    gif: require('../../assets/img/splash/four.gif'),
},
    {
    gif: require('../../assets/img/splash/five.gif'),
}]

    const r = Math.floor(Math.random()*load.length)



return(
    <ImageBackground  style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center',borderWidth:10, borderColor:'#6c2400', margin:0,padding:0, }} resizeMode='cover' source={load[r].gif}>
        <ActivityIndicator size='large' color='#6c2500' style={{ transform: [{ scale: 1.5 }], alignSelf:'center', top:'30%',}} />
    </ImageBackground>
)
}