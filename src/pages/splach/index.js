import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { Image, ImageBackground, Pressable,ActivityIndicator } from "react-native";
import { VideoView} from "expo-video";
import { useEffect } from "react";

export default function Splach(){

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Inicio');
        },5000)
    },);

    const foto = [{
        f: require('../../../assets/img/splash/one.png'),
    },{
        f:require('../../../assets/img/splash/two.png'),
    },{
        f:require('../../../assets/img/splash/three.png'),
    },{
        f:require('../../../assets/img/splash/four.png'),
    },{
        f:require('../../../assets/img/splash/five.png'),
    }]

    const r = Math.floor(Math.random()*3)

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={foto[r].f}>
            <ActivityIndicator size='large' color='#572205' style={{top:'20%', transform: [{ scale: 1.5 }]}} />
        </ImageBackground>
    )
}