import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useEffect} from 'react';
import { View, Image, ActivityIndicator} from 'react-native';

export default function splach (){
      const navigation = useNavigation();

useEffect(()=>{
    setTimeout(()=>{
        navigation.navigate('Inicio')
    },3000)

},)

return(
    <View style={styles.container}>
        <Image></Image>
        <ActivityIndicator size='large' color='#000' style={{ transform: [{ scale: 1.5 }] }} />
    </View>
)
}