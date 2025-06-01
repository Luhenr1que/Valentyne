import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";

export default function Memories(){

    return(
        <ImageBackground resizeMode='cover' source={require('../../../assets/img/memories/back.png')}>

        </ImageBackground>
    )
    
}