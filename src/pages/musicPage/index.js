import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, View, ScrollView, Modal } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect,useState } from "react";
import { Audio } from 'expo-av';

export default function Music(){
    const navigation = useNavigation();
    const {playSound, playSomBot,playSomBotCode,pauseBackgroundMusic,resumeBackgroundMusic} = useAudio()
    const [currentSound, setCurrentSound] = useState(null);
    
    const [code,setCode] = useState('');
    const [m,setM] = useState(false);
    const [ma,setMa] = useState(false);
    const [aviso,setAviso] = useState('');


    const playSomBotValue = async (music) => {
    try {
        if (currentSound) {
        await currentSound.unloadAsync();
        setCurrentSound(null);
        }

        if (!music.song) return;

        // Pausa a música de fundo
        await pauseBackgroundMusic();

        const { sound } = await Audio.Sound.createAsync(
        music.song,
        { volume: music.volume || 1 } // volume padrão 1
        );

        setCurrentSound(sound);
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
            await sound.unloadAsync();
            setCurrentSound(null);

            // Retoma a música de fundo
            await resumeBackgroundMusic();
        }
        });

    } catch (e) {
        console.error(e);
    }
    };



    
        const back = () =>{
            playSomBot()
            setTimeout(()=>{
                navigation.navigate('Inicio')
            },500)
        }
    
        const codeRewiew = () =>{
            playSomBotCode()
            setTimeout(()=>{
                setCode(2)
            },700);
        }
        const modal = (num) =>{
            setAviso(musicPlay[num].msg)
            setM(true)
            setMa(num)
        }
        const modalOff = async () => {
        setM(false);
        if (currentSound) {
            await currentSound.stopAsync();
            await currentSound.unloadAsync();
            setCurrentSound(null);

            // Retoma a música de fundo ao fechar o modal
            await resumeBackgroundMusic();
        }
        };


        const musicPlay =[{
            song: require('../../../assets/music/solo_01.mp3'),
            msg:'Esse céu é grande demais para se voar sozinho, por isso eu quero voar ao seu lado.',
            volume:1,
        },{
            song: require('../../../assets/music/touch.mp3'),
            msg:'Todas as vezes que a gente se toca, eu sinto algo incrível, algo de outro mundo.',
            volume:0.5,
        }
        ,{
            song: require('../../../assets/music/guns.mp3'),
            msg:'Essa música me faz imaginar o nosso futuro e me lembra de como saber que eu vou ver você me alegra muito.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/lana.mp3'),
            msg:'Viver ao seu lado, com seus jeitos, tudo isso me fascina, tudo isso me encanta.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/natural.mp3'),
            msg:'Sempre vivi solitário, mas desde que você entrou na minha vida, eu quero estar sempre na sua companhia.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/times.mp3'),
            msg:'Essas musícas assim tocam na minha cabeça quando eu te vejo, você é tão linda que eu acho que é um sonho.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/vicio.mp3'),
            msg:'Tem que dizer algo? Eu sou viciado em você, cada dia mais, a cada segundo mais.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/colapso.mp3'),
            msg:'Eu sinto em paz junto de você, ter você é o motivo de eu querer tanto viver.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/hortela.mp3'),
            msg:'Saborear você é algo que eu sempre amei, o gosto da sua boca, o gosto do seu corpo.',
            volume:1,
        }
        ,{
            song: require('../../../assets/music/auras.mp3'),
            msg:'A nossa aura é tão linda, tão única. E nunca se esqueça, a sua voz sempre será a minha música favorita!',
            volume:1,
        },
        {
            song: require('../../../assets/music/drunk.mp3'),
            msg:'E nunca se esqueça, a sua voz sempre será a minha música favorita!',
            volume:1,
        },
]

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/musicFotos/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>back()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.box}>
                   <Pressable onPress={() => { modal(0); playSomBotValue(musicPlay[0]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/solo.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Flying Solo (feat. Madison Reyes, Charlie Gillespie, Owen Patrick Joyner & Jeremy Shada)</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(1); playSomBotValue(musicPlay[1]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/touch.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Everytime We Touch - Cascada</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(2); playSomBotValue(musicPlay[2]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/guns.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Gunslinger - Avenged Sevenfold</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(3); playSomBotValue(musicPlay[3]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/lana.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Lana - Kaimaitachi</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(4); playSomBotValue(musicPlay[4]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/natural.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Natural - Slow GM</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(5); playSomBotValue(musicPlay[5]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/times.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Times Square - Akashi Cruz</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(6); playSomBotValue(musicPlay[6]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/vicio.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Viciado Em Você - Zant</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(7); playSomBotValue(musicPlay[7]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/colapso.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Colapso - Dri</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(8); playSomBotValue(musicPlay[8]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/hortela.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Sorvete de Hortelã - CHAOSS</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(9); playSomBotValue(musicPlay[9]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/auras.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Colapso - Dri</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => { modal(10); playSomBotValue(musicPlay[10]); }} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/musicFotos/drunk.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>?</Text>
                        </View>
                    </Pressable>

                </ScrollView>
        <Modal animationType='fade' visible={m} transparent={true} >
          <Pressable onPress={()=>modalOff()} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', height:'60%', paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
              <Text style={styles.mgsText}>
                {aviso}
              </Text>
                {ma===10  ? <Pressable onPress={()=>codeRewiew()} style={styles.heartContainer}>
                                <Image style={styles.coracao} source={require('../../../assets/img/inicio/coracao.png')} />
                                <Text style={styles.heartNumber}>{code}</Text>
                            </Pressable>: ''}
            </View>
          </Pressable>
        </Modal>
        </ImageBackground>
    )
    
}