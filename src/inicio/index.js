import styles from './style.js';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../audioContext.js';
import { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Image, Dimensions, ImageBackground, Pressable } from 'react-native';

export default function Inicio (){
    const navigation = useNavigation();
    const { playSound, playSomBot } = useAudio();

    const [activeIndex, setActiveIndex] = useState(0)

    const [bloq, setBlock] = useState(0)

    useEffect(() => {
        try {
            playSound();
        } catch (err) {
            console.error("Erro ao tocar som:", err);
        }
    }, []);

    const { width, height } = Dimensions.get('window');

    const botoes = [
        {
        id: 1,
        img: require('../../assets/img/inicio/musicB.png'),
        func: () => console.log('Imagem 1') 
        },
        {
        id: 2,
        img: require('../../assets/img/inicio/rolesB.png'),
        func: () => console.log('Imagem 2') 
        },
        {
        id: 3,
        img: require('../../assets/img/inicio/drawB.png'),
        func: () => console.log('Imagem 3') 
        },
        {
        id: 4,
        img: bloq > 3 ? require('../../assets/img/inicio/usB.png') : require('../../assets/img/inicio/bloquedB.png'),
        func: () => console.log('Imagem 4') 
        },
    ]

    const renderItem = ({item, index}) =>{
        const isActive = index === activeIndex;
        return(
            <Pressable onPress={()=>{if(isActive){playSomBot();item.func();}}}>
                <View style={{opacity: isActive ? 1:0.5,}}>
                    <Image source={item.img} style={styles.image} resizeMode="cover"/>
                </View>
            </Pressable>
        )
    }
return(
    <ImageBackground resizeMode='cover' source={require('../../assets/img/inicio/back.png')} style={styles.container}>
        <Carousel style={styles.image} width={width*0.95} height={height*0.90} data={botoes} renderItem={renderItem} loop mode="parallax" snapEnabled={true} autoPlay={false} onSnapToItem={(index) => {setActiveIndex(index)}}/>
    </ImageBackground>
)
}