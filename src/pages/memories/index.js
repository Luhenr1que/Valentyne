import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect } from "react";

export default function Memories(){

          const {playSound, playSomBot} = useAudio()
    


    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/memories/back.png')}>

        </ImageBackground>
    )
    
}