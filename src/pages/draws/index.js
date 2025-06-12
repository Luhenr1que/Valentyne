import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView, View, Animated, StyleSheet } from "react-native";
import { useAudio } from "../../../audioContext";
import { useRef ,useEffect, useState } from "react";

export default function Draws(){
    const navigation = useNavigation();
    const {playSound, playSomBot,playSomBotCode} = useAudio();
    const [code,setCode] = useState('');

    const codeRewiew = () =>{
        playSomBotCode()
        setTimeout(()=>{
            setCode(6)
        },700);
    }

    const back = () =>{
        playSomBot()
        setTimeout(()=>{
            navigation.navigate('Inicio')
        },500)
    }

    const [image, setImage] = useState(Array(8).fill(false));

    const animationValues = useRef(
        Array(8).fill().map(() => new Animated.Value(0))
    ).current;

    const img = (num) => {
        const updated = [...image];
        updated[num] = !updated[num];
        setImage(updated);

          Animated.timing(animationValues[num], {
            toValue: updated[num] ? 1 : 0,
            duration: 500,
            useNativeDriver: false,  // Não dá pra animar cor com native driver
        }).start();
    };
    const getBackgroundColor = (num) => {
    return animationValues[num].interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(87, 34, 5, 1)', 'rgba(87, 34, 5, 0.2)'],
    });
    };

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/draw/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>back()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
                <ScrollView contentContainerStyle={{flexGrow:1,alignItems:'center',}} showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                    <Pressable onPress={() => img(0)}>
                        <ImageBackground source={require('../../../assets/img/draw/sakura.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(0), borderRadius: 10, }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[0] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[0]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Quando você olhou para este desenho, eu senti uma alegria tão grande. É algo tão pequeno, mas feito com muito amor.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(1)}>
                        <ImageBackground source={require('../../../assets/img/draw/android.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(1), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[1] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[1]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Este desenho é um dos muitos que eu olho e me lembro de quão talentosa você é.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(2)}>
                        <ImageBackground source={require('../../../assets/img/draw/fox.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(2), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[2] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[2]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                           Por muitos dias ruins, esse pequeno desenho me dava esperança, porque eu sabia que tinha você.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(3)}>
                        <ImageBackground source={require('../../../assets/img/draw/sasusaku.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(3), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[3] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[3]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Este aqui me faz lembrar das noites em que nossos corpos se tornam um, do calor, do fervor, da sensação.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(4)}>
                        <ImageBackground source={require('../../../assets/img/draw/link.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(4), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[4] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[4]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Eu me lembro do nosso primeiro beijo por causa deste desenho. É tão bom lembrar do nosso início, mas o futuro será ainda melhor.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(5)}>
                        <ImageBackground source={require('../../../assets/img/draw/hori.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(5), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[5] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[5]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Este é um dos mais especiais. Eu nunca me imaginei tendo alguém ao meu lado, mas você sempre me mostra que eu estava errado.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(6)}>
                        <ImageBackground source={require('../../../assets/img/draw/us.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(6), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[6] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[6]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                            Este não foi feito por nós, mas é tão fofo porque foi aqui que realmente caiu a minha ficha.
                            </Text>
                        </ImageBackground>
                        </Pressable>

                        <Pressable onPress={() => img(7)}>
                        <ImageBackground source={require('../../../assets/img/draw/vegeta.png')} style={[styles.img1, { borderRadius: 60, overflow: 'hidden' }]}>
                            <Animated.View
                            style={[
                                StyleSheet.absoluteFillObject,
                                { backgroundColor: getBackgroundColor(7), borderRadius: 10 }
                            ]}
                            />
                            <Text style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                            fontSize: 20,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: image[7] === false ? '#fff1dc' : 'transparent',
                            paddingHorizontal: 20,
                            fontFamily:'nunito',
                            textShadowColor: image[7]===false? '#005501':'transparent',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                            }}>
                           Preciso dizer algo? Este desenho é o meu maior tesouro, meu tudo, minha eterna lembrança de quem é a minha dona.
                            </Text>
                        </ImageBackground>
                        </Pressable>
                    {image.every(val => val) && (
                        <View style={{ width:'100%',alignItems:'center',marginTop: 20,marginBottom:30, padding: 20, backgroundColor: 'rgba(87, 34, 5, 0.9)', borderRadius: 10 }}>
                            <Pressable onPress={()=>codeRewiew()} style={styles.heartContainer}>
                                <Image style={styles.coracao} source={require('../../../assets/img/inicio/coracao.png')} />
                                <Text style={styles.heartNumber}>{code}</Text>
                            </Pressable>
                        </View>
                    )}
                </ScrollView>
        </ImageBackground>
    )
}