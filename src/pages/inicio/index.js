import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, Pressable, View, Dimensions, ScrollView, Modal,Text,TextInput,KeyboardAvoidingView, Platform } from "react-native";
import { useRef,useState, useEffect, useContext } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useAudio } from "../../../audioContext";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Inicio() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [pressedButtons, setPressedButtons] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bloq,setBloq] = useState('')
  const [m,setM] = useState(false)

      const {playSomBot} = useAudio()


  const basedata = [
    {
      id: 6,
      img: require('../../../assets/img/inicio/natal.png'),
      local: 'Natal',
      color: '#ffffffff',
      image: require('../../../assets/img/inicio/snow.png')
    },
    {
      id: 1,
      img: require('../../../assets/img/inicio/musicB.png'),
      local: 'Music',
      color:'#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 2,
      img: require('../../../assets/img/inicio/drawB.png'),
      local: 'Draws',
      color:'#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 3,
      img: require('../../../assets/img/inicio/rolesB.png'),
      local: 'Memories',
      color:'#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 4,
      img: bloq=='268' ? require('../../../assets/img/inicio/usB.png') : require('../../../assets/img/inicio/bloquedB.png'),
      local: bloq=='268' ? 'Final' : 'Modal',
      color: bloq=='268' ?'#fa4141':'#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
  ];
  const data = bloq ==='268' ? [
    ...basedata,   {
      id: 5,
      img: require('../../../assets/img/inicio/gameB.png'),
      local: 'Game',
      color:'#77c0fa',
      image: require('../../../assets/img/inicio/coracao.png')
    },
  ] : basedata

    const go = (item) => {
      playSomBot()

      if (!item.local) return;

      if(item.local==='Modal'){
        setTimeout(() => {
          setM(true)
        }, 300);
      }else{
        setTimeout(() => {
          navigation.navigate(item.local);
        }, 300);
      };
    }
    const goToIndex = (index) => {
      playSomBot();
      if (swiperRef.current) {
        swiperRef.current.scrollToIndex({ index, animated: true });
        setCurrentIndex(index);
        AsyncStorage.setItem('swiperIndex', index.toString());
      }
    };

    const check = async () => {
      try {
        await AsyncStorage.setItem('bloq', bloq);
        setM(false);
      } catch (error) {
        console.error('Erro ao salvar no AsyncStorage', error);
      }
    };

    useEffect(() => {
      const loadBloq = async () => {
        try {
          const savedBloq = await AsyncStorage.getItem('bloq');
          if (savedBloq !== null) {
            setBloq(savedBloq);
          }
        } catch (error) {
          console.error('Erro ao carregar do AsyncStorage', error);
        }
      };
        const loadData = async () => {
          try {
            const savedBloq = await AsyncStorage.getItem('bloq');
            if (savedBloq !== null) {
              setBloq(savedBloq);
            }

            const savedIndex = await AsyncStorage.getItem('swiperIndex');
            if (savedIndex !== null) {
              const index = parseInt(savedIndex, 10);
              setCurrentIndex(index);

              setTimeout(() => {
                if (swiperRef.current) {
                  swiperRef.current.scrollToIndex({ index, animated: false });
                }
              }, 100);
            }
          } catch (error) {
            console.error('Erro ao carregar do AsyncStorage', error);
          }
        };

        loadData();

      loadBloq();
    }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/inicio/back.png')}
        style={{ flex: 1 }}
      >
        <SwiperFlatList
          ref={swiperRef}
          data={data}
          onChangeIndex={({ index }) => {setCurrentIndex(index);AsyncStorage.setItem('swiperIndex', index.toString());}}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: height*0.95,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pressable onPress={() => go(item)}>
                <Image
                  source={item.img}
                  style={{
                    width: width ,
                    height: height,
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            </View>
          )}
        keyExtractor={item => item.id.toString()}
        autoplayLoop 
        loop={true}
        index={0}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}>
          {data.map((item, index) => (
            <Pressable key={index} onPress={() => goToIndex(index)}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                  marginHorizontal: 6,
                  backgroundColor: index === currentIndex ? '#491601' : '#e7b76b',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {index === currentIndex && (
                  <Image
                    source={item.image}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      tintColor: item.color,  
                    }}
                  />
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        </View>
        <Modal animationType='fade' visible={m} transparent={true} >
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', height:300, paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
              <Text style={styles.codeT}>Qual é a senha?</Text>
              <TextInput style={styles.codeI} keyboardType="number-pad" onChangeText={text => setBloq(text)} maxLength={3}></TextInput>
              <Pressable onPress={()=>check()} style={styles.setaA}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}></Image></Pressable>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
