import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView  } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect } from "react";

export default function Draws(){
    const navigation = useNavigation();
    const {playSound, playSomBot} = useAudio();

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/draw/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>navigation.navigate('Inicio')}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
        </ImageBackground>
    )
}