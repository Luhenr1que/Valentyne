import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";

export default function Music(){

    return(
        <ImageBackground resizeMode='cover' source={require('../../../assets/img/music/back.png')}>

        </ImageBackground>
    )
    
}