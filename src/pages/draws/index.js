import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";

export default function Draws(){

    return(
        <ImageBackground resizeMode='contain' source={require('../../../assets/img/draw/back.png')}>

        </ImageBackground>
    )
}