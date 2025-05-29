import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../audioContext.js';
import { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Image, Dimensions } from 'react-native';

export default function inicio (){
    const navigation = useNavigation();
    const { playSound } = useAudio();

    const [activeIndex, setActiveIndex] = useState(0)
    
    useEffect(()=>{
        playSound();
    },)

    const botoes = [
        {
        id: 1,
        img: require('../../assets/img/inicio/musicB.png'),
        func: () => console.log('Imagem 1') 
        },
        {
        id: 2,
        img: require('../../assets/img/inicio/musicB.png'),
        func: () => console.log('Imagem 2') 
        },
        {
        id: 3,
        img: require('../../assets/img/inicio/musicB.png'),
        func: () => console.log('Imagem 3') 
        },
    ]

    const windowWidth = Dimensions.get('window').width

    const onSnapToItem = (index) =>{
        setActiveIndex(index)
        botoes[index].func()
    }

    const renderItem = ({item}) =>{
        return(
            <View>
                <Image source={item.img} style={{ width: windowWidth, height: 200 }}/>
            </View>
        )
    }

return(
    <View style={styles.container}>
        <Carousel width={windowWidth} height={Dimensions.get('window').height} data={botoes} renderItem={renderItem} onSnapToItem={(index) => { setActiveIndex(index); botoes[index].func()}}/>
    </View>
)
}