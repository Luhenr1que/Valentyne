import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect } from "react";

export default function Final(){
    const navigation = useNavigation();
    const {playSound, playSomBot} = useAudio()
    
    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/final/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>navigation.navigate('Inicio')}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
        </ImageBackground>
    )
    
}