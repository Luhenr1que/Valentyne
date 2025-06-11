import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView, View } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect, useState } from "react";

export default function Memories(){
    const navigation = useNavigation();
    const {playSound, playSomBot,playSomBotCode} = useAudio()
    const [code,setCode] = useState('');

    const back = () =>{
        playSomBot()
        setTimeout(()=>{
            navigation.navigate('Inicio')
        },500)
    }

    const codeRewiew = () =>{
        playSomBotCode()
        setTimeout(()=>{
            setCode(8)
        },700);
    }
    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/memories/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>back()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                <View style={styles.linha}>
                    <Text style={styles.text}>Nesse dia ainda não tinha caído minha ficha. Foi algo tão novo, e eu estava extremamente nervoso.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/9.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Eu estava morrendo de medo de você me achar chato. Mas não demorou para eu me soltar e curtir esse dia incrível.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/1.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Uma das nossas grandes tradições. Sempre que eu me lembro delas, meu coração aquece.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/2.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Foi por pouco kkkkkkkkk, mas rendeu muitas risadas e lembrar disso me faz rir.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/3.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Dessa vez eu estava mais tranquilo. Estar com você nesse dia foi algo incrível.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/4.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Esse café me ensinou algo: independente do valor, lugar ou emoção, com você tudo é especial.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/13.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Desde que a gente viu essa exposição, eu não paro de planejar o nosso futuro.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/5.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>"O amor está nas pequenas coisas." Cada dia que eu passo ao seu lado eu entendo mais isso.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/12.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Acho q a imagem diz tudo já kkkkkkkkk.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/6.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Os vendedores sempre encaram a gente, mas tirar essas fotos é a minha parte favorita.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/7.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Uma surpresa extremamente simples, mas ver o seu sorriso quando você viu a foto valeu o mundo para mim.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/11.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Ir até a Liberdade e comer um ramen ao seu lado foi algo que eu nunca imaginei acontecer. Mas eu amei.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/8.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <View style={styles.linhaE}>
                        <Text style={styles.textE}>Você é a minha melhor lembraça e sempre será.</Text>
                        <Pressable onPress={()=>codeRewiew()} style={styles.heartContainer}>
                            <Image style={styles.coracao} source={require('../../../assets/img/inicio/coracao.png')} />
                            <Text style={styles.heartNumber}>{code}</Text>
                        </Pressable>
                    </View>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/10.jpg')}></Image>
                </View>
            </ScrollView>
        </ImageBackground>
    )
    
}