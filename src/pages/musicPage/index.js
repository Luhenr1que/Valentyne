import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, View, ScrollView, Modal } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect,useState } from "react";
import { Audio } from 'expo-av';

export default function Music(){
    const navigation = useNavigation();
    const {playSound, playSomBot,playSomBotCode} = useAudio()
    const [currentSound, setCurrentSound] = useState(null);
    
    const [code,setCode] = useState('');
    const [m,setM] = useState(false);
    const [aviso,setAviso] = useState('');


    const playSomBotValue = async (audioFile) => {
    try {
        if (currentSound) {
        await currentSound.unloadAsync();
        setCurrentSound(null);
        }

        const { sound } = await Audio.Sound.createAsync(audioFile);
        setCurrentSound(sound);
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
            sound.unloadAsync();
            setCurrentSound(null);
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
                setCode(7)
            },1000);
        }
        const modal = (num) =>{
            setAviso(musicPlay[num].msg)
            setM(true)
        }
        const modalOff = async() =>{
            setM(false)
            if (currentSound) {
                await currentSound.stopAsync();
                await currentSound.unloadAsync();
                setCurrentSound(null);
  }
        }

        const musicPlay =[{
            song: require('../../../assets/music/solo_01.mp3'),
            msg:'aaaaaaaaaaaaaaaaaa',
        },{
            song:'',
            msg:'ayyyyyyyyyy',
        }
        ,{
            song:'',
            msg:'aiiiiiiiiiiaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }
        ,{
            song:'',
            msg:'aaaaaaaaaaaaaaaaaa',
        }]

    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/music/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>back()}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.box}>
                    <Pressable onPress={()=>{modal(0); if (musicPlay[0].song) playSomBotValue(musicPlay[0].song);}} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/music/solo.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Flying Solo (feat. Madison Reyes, Charlie Gillespie, Owen Patrick Joyner & Jeremy Shada)</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>modal(1)} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/music/every.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Everytime We Touch - Cascada</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>modal(2)} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/music/lana.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Lana - Kaimaitachi</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=>modal(3)} style={styles.linha}>
                        <Image style={styles.icon} source={require('../../../assets/img/music/cigarro.png')}></Image>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Natural - Slow GM</Text>
                        </View>
                    </Pressable>
{/*                             <Pressable onPress={()=>codeRewiew()} style={styles.heartContainer}>
                                <Image style={styles.coracao} source={require('../../../assets/img/inicio/coracao.png')} />
                                <Text style={styles.heartNumber}>{code}</Text>
                            </Pressable> */}
                </ScrollView>
        <Modal animationType='fade' visible={m} transparent={true} >
          <Pressable onPress={()=>modalOff()} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', height:'60%', paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
              <Text style={styles.mgsText}>
                {aviso}
              </Text>
            </View>
          </Pressable>
        </Modal>
        </ImageBackground>
    )
    
}