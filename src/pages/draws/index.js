import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect } from "react";

export default function Draws(){

          const {playSound, playSomBot} = useAudio()
    


    return(
        <ImageBackground style={styles.container} resizeMode='contain' source={require('../../../assets/img/draw/back.png')}>

        </ImageBackground>
    )
}