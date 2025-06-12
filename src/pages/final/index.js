import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView,View,Modal } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect, useState } from "react";

export default function Final(){
    const navigation = useNavigation();
    const {playSound, playSomBot} = useAudio()
    const [m,setM] = useState(false)
    const [bot,setBot] = useState('Não')
    const [msg,setMsg] = useState('')

    const resp = (text) => {
        if (text === 'Sim') {
            setM(true);
            setMsg('Eu fico extremamente feliz por essa resposta amor.\n😁❤❤❤');
            setTimeout(()=>{
                setM(false)
                navigation.navigate('Inicio')
            },5000)
        } else if (bot === 'Não') {
            setBot('Sim'); // muda o botão visualmente para "Sim"
        } else {
            setM(true);
            setMsg('Você é só minha, pra sempre, nunca se esqueça disso.\n😑🪓❤❤❤');
            setTimeout(()=>{
                setM(false)
                navigation.navigate('Inicio')
            },5000)

        }
    };
    
    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/final/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>navigation.navigate('Inicio')}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                    <Text style={{ fontSize: 18,margin:10,marginBottom:30, color: '#fff1dc', fontFamily: 'nunito', textAlign: 'center' }}>
                    Essa página vai ser a mais simples, mas a mais sincera.{"\n\n"}
                    Desde que você entrou na minha vida, tudo ficou melhor,<Text style={{ color: '#84fa41' }}> tudo fez mais sentido</Text>.{"\n\n"}
                    É como se você fosse algo que eu sempre precisei, mas nunca notei.{"\n\n"}
                    Te ter me fez sentir, me fez enxergar um mundo que eu nunca tinha visto —{" "}
                    um mundo colorido, onde está tudo bem ser eu mesmo,{" "}
                    um mundo onde, independente de quem eu for, eu não vou estar sozinho.{"\n\n"}
                    Essa mensagem é algo além de uma declaração — <Text style={{ color: '#41a6fa' }}>é um agradecimento.</Text>.{"\n\n"}
                    Esse aplicativo não é só um presente, é um eterno lembrete de que{" "}
                    <Text style={{ color: '#fa4141' }}>eu te amo muito</Text>.{"\n\n"}
                    Independente do momento,{" "}
                    <Text style={{ color: '#fa4141' }}>eu sempre te amei e</Text> {" "}
                    <Text style={{ color: '#fa4141' }}>sempre irei te amar , minha</Text>{" "}
                    <Text style={{ color: '#fa4141' }}>futura esposa</Text>.{"\n\n"}
                    Desde o dia em que te encontrei, fiquei me imaginando ao seu lado.{" "} Você nunca saiu da minha cabeça, e te reencontrar naquela sala foi algo que eu realmente não esperava — mas era exatamente o que eu precisava.{"\n\n"}
                    Eu sempre escrevi mensagens para você, mas <Text style={{ color: '#fad341' }}>essa é algo a mais</Text>.{"\n\n"}
                    Quero que você perceba o quanto você <Text style={{ color: '#84fa41' }}>melhorou tudo</Text>.{"\n\n"}
                    Independente de quantas coisas ruins aconteçam,{" "}
                    <Text style={{ color: '#8d41fa' }}>eu sempre vou preferir estar ao seu lado</Text> —{" "}
                    porque é ali que eu devo estar, é ao seu lado que eu posso ser feliz,{" "}
                    e é ao seu lado que eu quero viver.{"\n\n"}
                    <Text style={{ color: '#fad341',fontSize:23 }}>Posso viver ao seu lado para sempre?</Text>
                    </Text>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',gap:30,marginBottom:40,}}> 
                        <Pressable onPress={()=>resp('Sim')} style={{backgroundColor:'rgba(231, 183, 107, 0.2)',width:130,borderWidth:5,borderRadius:20,}}>
                            <Text style={{ fontSize: 30, color: '#fff1dc',marginVertical:10, fontFamily: 'nunito', textAlign: 'center',textAlignVertical:'center', }}>Sim</Text>
                        </Pressable>
                        <Pressable onPress={()=>resp({bot})} style={{backgroundColor:'rgba(231, 183, 107, 0.2)',width:130,borderWidth:5,borderRadius:20}}>
                            <Text style={{ fontSize: 30, color: '#fff1dc',marginVertical:10, fontFamily: 'nunito', textAlign: 'center'}}>{bot}</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <Modal animationType='fade' visible={m} transparent={true} >
                <Pressable style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', height:'60%', paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 30,margin:10,marginBottom:30, color: '#fff1dc', fontFamily: 'nunito', textAlign: 'center' }}>
                        {msg}
                    </Text>
                    </View>
                </Pressable>
                </Modal>
        </ImageBackground>
    )
}