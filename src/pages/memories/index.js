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
            setCode(3)
        },1000);
    }
    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/memories/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>back()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                <View style={styles.linha}>
                    <Text style={styles.text}>Nesse dia ainda não tinha caido a minha ficha. Foi algo tão novo, e eu tava extremamente nervoso nesse dia.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/9.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Eu tava morrendo de medo de vc me achar chato.Mas não demorou pra eu me soltar e curtir esse dias incrivel.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/1.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Uma das nossas grandes tradições, sempre q eu me lembro delas o meu coração aquece.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/2.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Foi por pouco kkkkkkkkk, mas rendeu muitas risadas, e lembrar disso me faz rir.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/3.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Dessa vez eu tava mais tranquilo, estar com você nesse dia foi algo incrivel.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/4.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Esse café me ensinou algo, independete do valor, lugar ou emoção, com você, tudo é especial.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/13.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Desde que a gente viu essas exposição eu não paro de planejar o nosso futuro.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/5.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>"O amor esta nas pequenas coisas". Cada dia que eu passo ao seu lado eu entenddo mais isso.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/12.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Acho q a imagem diz tudo já kkkkkkkkk.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/6.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Os vendedores sempre encarram a gente, mas tirar essas fotos são a minha parte favorita</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/7.jpg')}></Image>
                </View>
                <View style={styles.linha2}>
                    <Text style={styles.text}>Uma surpresa extremamente simples, mas ver o seu sorriso quando vc viu a foto valeu o mundo pra mim.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/11.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.text}>Ir até a Liberdade e comer um ramen ao seu lado foi algo que eu nunca imaginei acontecer, mas eu amei.</Text>
                    <Image resizeMode="cover" style={styles.img} source={require('../../../assets/img/roles/8.jpg')}></Image>
                </View>
                <View style={styles.linha}>
                    <View style={styles.linhaE}>
                        <Text style={styles.textE}>Você é a minha melhor lembraça, e sempre será.</Text>
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