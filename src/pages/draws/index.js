import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect } from "react";

export default function Draws(){
    const navigation = useNavigation();
    const {playSound, playSomBot} = useAudio();

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/draw/back.png')}>
            <Pressable onPress={()=>navigation.navigate('Inicio')}><Text>AAAAAAAAAAAAAAAAAAA</Text></Pressable>
        </ImageBackground>
    )
}