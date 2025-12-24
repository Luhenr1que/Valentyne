import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView, View } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import LottieView from 'lottie-react-native';


export default function Natal() {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');

    return (

        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/feriados/merry.png')}>
            <LottieView
                source={require('../../../assets/lottie/Snowing.json')}
                autoPlay
                loop
                speed={0.3}
                style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 3,
                    pointerEvents: 'none',
                    opacity: 0.4,
                }}
            />
            <Pressable style={styles.setaA} onPress={() => navigation.goBack()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')} /></Pressable>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                <View style={styles.linha}>
                    <Image source={require('../../../assets/img/feriados/mer1.png')} style={{ width: width * 0.80, height: width * 0.65, borderRadius: 30, borderWidth: 6, borderColor: '#e7b76b' }}></Image>
                    <Text style={styles.text}>
                        Sabe, eu não tenho as melhores lembranças do Natal, mas desde que você entrou na minha vida denovo tudo se tornou melhor, comemorar essa data com você ao meu lado me fez me sentir feliz, pensar no nosso futuro, a gente na nossa casinha, com a nossa árvore de Natal na sala, uma musiquinha, as nossas risadas encantando o lugar.
                    </Text>
                    <Image source={require('../../../assets/img/feriados/teto.png')} style={{ width: width * 0.80, height: width * 0.75, borderRadius: 30, borderWidth: 6, borderColor: '#e7b76b' }}></Image>
                    <Text style={styles.text}>
                        Imaginar a nossa casa, nosso futuro juntos, tudo isso me enche de esperança, saber que um dia não estaremos separados, estaremos sobre o mesmo teto, o nosso teto.
                    </Text>
                    <Image source={require('../../../assets/img/feriados/dormi.png')} style={{ width: width * 0.80, height: width * 0.50, borderRadius: 30, borderWidth: 6, borderColor: '#e7b76b' }}></Image>
                    <Text style={styles.text}>
                        Mas não é só o futuro que me dá esperanças, viver o presente com você me faz sentir coisas que eu nunca imaginei sentir, ver você dormir me fez entender o quão calmo o mundo se torna quando eu tô do seu lado
                    </Text>
                    <Text style={styles.text}>
                        A minha vida desde que eu reencontrei você se tornou tá melhor, mas tão melhor mesmo, eu amo poder acordar e saber que o meu coração é seu e que o seu coração é meu, saber que o nosso amor é tão lindo e único, lembrar dos nossos encontros, das risadas, das nossas experiências, de todas as vezes que nós transamos, que nós nós apaixonamos ainda mais, cada uma dessas coisas são grandiosas pra mim e me deixam mais ansioso pro nosso futuro, nossos próximos encontros, nossas próximas risadas, nossas próximas piadas, nossos próximos feriados, nossos próximos Natais.
                    </Text>
                    <Image source={require('../../../assets/img/feriados/fim.png')} style={{ width: width * 0.90, height: width * 0.42, borderRadius: 30, borderWidth: 6, borderColor: '#e7b76b' }}></Image>
                    <Text style={styles.text}>
                        Eu quero viver e morrer ao seu lado meu amor, porque foi com você que eu aprendi o verdadeiro significado do amor, e eu quero passar o resto da minha vida te amando, te fazendo feliz, te cuidando, te protegendo, te desejando, te querendo, te tendo.
                    </Text>
                    <Text style={[styles.text, { marginBottom: 40, color: '#ffdddc', fontSize: 23, fontWeight: 'bold', textAlign: 'center' }]}>
                        Feliz Natal meu amor, eu te amo muito  🥰🖤❤️🖤❤️🖤❤️
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}