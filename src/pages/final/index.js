import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground } from "react-native";

export default function Final(){

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/final/back.png')}>

        </ImageBackground>
    )
    
}