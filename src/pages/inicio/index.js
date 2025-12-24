import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, Pressable, View, Dimensions, ScrollView, Modal, Text, TextInput, KeyboardAvoidingView, Platform, Animated } from "react-native";
import { useRef, useState, useEffect, useContext } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useAudio } from "../../../audioContext";
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from '@expo/vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

export default function Inicio() {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [pressedButtons, setPressedButtons] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bloq, setBloq] = useState('')
  const [m, setM] = useState(false)
  const [modalVisibleUsado, setModalVisibleUsado] = useState(false);
  const [modalVisibleNovo, setModalVisibleNovo] = useState(false);

  const { playSomBot } = useAudio()
  const [ticketAvailable, setTicketAvailable] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showTicketContent, setShowTicketContent] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Configuração dos tipos com suas porcentagens e cores
  const ticketConfig = {
    tipos: [
      { nome: '🥰 ROMÂNTICO 🥰', chance: 0, color: '#ff69b4' },   
      { nome: '😈 SAFADO 😈', chance: 0, color: '#992dcbff' },       
      { nome: '🎁 MIMO 🎁', chance: 0, color: '#4c8edaff' },     
      { nome: '💛 JACKPOT 💛', chance: 100, color: '#eec600ff' }       
    ],
    mensagens: {
      '🥰 ROMÂNTICO 🥰': [
        'Vale um montão de beijinhos! 😘',
        'Vale um abraço bem apertado! 🤗',
        'Vale um jantar romântico! 🍷',
        'Vale um passeio a dois! 🌹',
        'Vale uma declaração de amor! ❤️',
        'Vale um texto fofo! 💌',
        'Vale um texto Sapeca! 😇',
        'Vale um Eu Te Amo Especial! 💖',
        'Vale mudar a cor dos corações por uma semana! 🖤',
        'Vale uma sessão de fotos! 📸',
        'Vale um mimo surpresa! 🎁'
      ],
      '😈 SAFADO 😈': [
        'Vale uma noite sob a luz Vermelha! 🔥',
        'Vale uma chupada deliciosa! 😈',
        'Vale uma dedada do jeito que você gosta! 🍑',
        'Vale uma transa inesquecível! 💦',
        'Vale uma transa sob a luz da lua! 🌙',
        'Vale uma transa no chuveiro! 🚿',
        'Vale uma transa amarradinha! ⛓️',
        'Vale uma transa no sofá! 🛋️'
      ],
      '🎁 MIMO 🎁': [
        'Vale um Chocolate! 🍫',
        'Vale um sorvetinho! 🍦',
        'Vale uma batata! 🍟',
        'Vale um drink especial! 🍹',
        'Vale um vinho! 🍷',
      ],
      '💛 JACKPOT 💛': [
        'Vale uma atualização do App! 🚀',
        'Vale um presente surpresa! 🎉',
        'Vale uma massagem VIP! 😏',
      ]
    }
  };

  // Gerar tickets dinamicamente baseado na configuração
  const generateTickets = () => {
    const tickets = [];
    let idCounter = 1;
    
    ticketConfig.tipos.forEach(tipo => {
      const mensagens = ticketConfig.mensagens[tipo.nome] || [];
      // Divide igualmente as mensagens dentro do mesmo tipo
      const chancePorMensagem = tipo.chance / mensagens.length;
      
      mensagens.forEach(mensagem => {
        tickets.push({
          id: idCounter++,
          text: mensagem,
          chance: chancePorMensagem,
          tipo: tipo.nome,
          color: tipo.color
        });
      });
    });
    
    return tickets;
  };

  const tickets = generateTickets();

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
      color: '#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 2,
      img: require('../../../assets/img/inicio/drawB.png'),
      local: 'Draws',
      color: '#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 3,
      img: require('../../../assets/img/inicio/rolesB.png'),
      local: 'Memories',
      color: '#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
    {
      id: 4,
      img: bloq == '268' ? require('../../../assets/img/inicio/usB.png') : require('../../../assets/img/inicio/bloquedB.png'),
      local: bloq == '268' ? 'Final' : 'Modal',
      color: bloq == '268' ? '#fa4141' : '#e7b76b',
      image: require('../../../assets/img/inicio/coracao.png')
    },
  ];
  const data = bloq === '268' ? [
    ...basedata, {
      id: 5,
      img: require('../../../assets/img/inicio/gameB.png'),
      local: 'Game',
      color: '#77c0fa',
      image: require('../../../assets/img/inicio/coracao.png')
    },
  ] : basedata

  const go = (item) => {
    playSomBot()

    if (!item.local) return;

    if (item.local === 'Modal') {
      setTimeout(() => {
        setM(true)
      }, 300);
    } else {
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

  // Função para calcular tempo até meia-noite
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return {
      hours,
      minutes,
      seconds,
    };
  };

  // Função para sortear um ticket baseado nas chances
  const drawTicket = () => {
    const totalChance = tickets.reduce((sum, t) => sum + t.chance, 0);
    
    // Verifica se há chances válidas
    if (totalChance <= 0) {
      // Se não há chances, retorna um ticket aleatório de qualquer tipo
      const randomIndex = Math.floor(Math.random() * tickets.length);
      return tickets[randomIndex];
    }
    
    const random = Math.random() * totalChance;
    
    let accumulator = 0;
    
    for (let ticket of tickets) {
      accumulator += ticket.chance;
      if (random <= accumulator) {
        return ticket;
      }
    }
    
    return tickets[0]; // fallback
  };

  // Função para girar o ticket
  const flipTicket = () => {
    playSomBot();
    
    if (!showTicketContent) {
      // Primeiro clique - girar para mostrar conteúdo
      setShowTicketContent(true);
      Animated.spring(flipAnimation, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // Segundo clique - girar para voltar
      setShowTicketContent(false);
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  // Função para verificar e usar o ticket
  const useTicket = async () => {
    playSomBot();
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = await AsyncStorage.getItem('ticketDate');
      const used = await AsyncStorage.getItem('ticketUsed');
      
      let isAvailable = false;
      
      // Verifica se é um novo dia
      if (lastDate == today) {
        // Novo dia - reseta
        await AsyncStorage.setItem('ticketDate', today);
        await AsyncStorage.setItem('ticketUsed', 'false');
        isAvailable = true;
        setTicketAvailable(true);
      } else {
        // Mesmo dia - verifica se já foi usado
        isAvailable = (used !== 'true');
        setTicketAvailable(isAvailable);
      }
      
      // Se ticket já foi usado hoje
      if (!isAvailable) {
        setModalVisibleUsado(true);
        return;
      }
      
      // Sorteia um novo ticket
      const ticketDrawn = drawTicket();
      setSelectedTicket(ticketDrawn);
      
      // Marca como usado
      await AsyncStorage.setItem('ticketUsed', 'true');
      setTicketAvailable(false);
      
      // Reseta a animação
      setShowTicketContent(false);
      flipAnimation.setValue(0);
      
      // Mostra o modal com o ticket sorteado
      setModalVisibleNovo(true);
      
    } catch (error) {
      console.error('Erro ao usar ticket:', error);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carrega o índice do swiper
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
        
        // Carrega a senha
        const savedBloq = await AsyncStorage.getItem('bloq');
        if (savedBloq !== null) {
          setBloq(savedBloq);
        }
        
        // Verifica status do ticket
        const today = new Date().toISOString().split('T')[0];
        const lastDate = await AsyncStorage.getItem('ticketDate');
        const used = await AsyncStorage.getItem('ticketUsed');
        
        let isAvailable = false;
        
        if (lastDate !== today) {
          // Novo dia - reseta
          await AsyncStorage.setItem('ticketDate', today);
          await AsyncStorage.setItem('ticketUsed', 'false');
          isAvailable = true;
        } else {
          // Mesmo dia - verifica se já foi usado
          isAvailable = (used !== 'true');
        }
        
        setTicketAvailable(isAvailable);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    
    loadData();
  }, []);

  // Atualizar contador de tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Interpolação para a animação de rotação
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  
  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/inicio/back.png')}
        style={{ flex: 1 }}
      >
        {/* Botão do Ticket */}
        <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 10, backgroundColor: '#3d1600', padding: 7, borderRadius:20, borderWidth: 1, borderColor: '#f8d485', }}>
          <Pressable onPress={useTicket}>
            <Entypo
              name="ticket"
              size={width * 0.09}
              color={ticketAvailable ? '#ffd700' : '#555'}
            />
          </Pressable>
        </View>

        {/* Swiper */}
        <SwiperFlatList
          ref={swiperRef}
          data={data}
          onChangeIndex={({ index }) => { 
            setCurrentIndex(index); 
            AsyncStorage.setItem('swiperIndex', index.toString()); 
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: height * 0.95,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pressable onPress={() => go(item)}>
                <Image
                  source={item.img}
                  style={{
                    width: width,
                    height: height * 0.9,
                    resizeMode: 'contain',
                    top: height * 0.03
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

        {/* Indicadores do Swiper */}
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

        {/* Modal da Senha */}
        <Modal animationType='fade' visible={m} transparent={true} >
          <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '80%', height: 300, paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
              <Text style={styles.codeT}>Qual é a senha?</Text>
              <TextInput style={styles.codeI} keyboardType="number-pad" onChangeText={text => setBloq(text)} maxLength={3}></TextInput>
              <Pressable onPress={() => check()} style={styles.setaA}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}></Image></Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal do Ticket Sorteado com Animação */}
        <Modal animationType="fade" transparent visible={modalVisibleNovo}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: '90%',
              backgroundColor: '#bc7126',
              borderRadius: 30,
              borderWidth: 5,
              borderColor: '#713205',
              alignItems: 'center',
              paddingVertical: 30,
              paddingHorizontal: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 20,
            }}>
              <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#fff1dc',
                marginBottom: 20,
                textAlign: 'center',
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}>
                {showTicketContent ? '🎉 PARABÉNS! 🎉' : ' CLIQUE NO TICKET '}
              </Text>

              {/* Container do Ticket com Animação */}
              <Pressable onPress={flipTicket} style={{ width: '100%', height: height * 0.3 }}>
                <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Frente do Ticket (antes de girar) */}
                  <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                  }, frontAnimatedStyle]}>
                    <View style={[styles.ticket, {
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8d485',
                      borderWidth: 6,
                      borderColor: selectedTicket?.color || '#ff69b4',
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }]}>
                      <View style={styles.holeLeft} />
                      <View style={styles.holeRight} />

                      {/* Linha decorativa superior */}
                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#ff69b4', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicket?.color || '#ff69b4', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#ff69b4', opacity: 0.7 }} />
                      </View>

                      {/* Conteúdo da Frente */}
                      <Text style={{
                        fontSize: 36,
                        fontWeight: 'bold',
                        color: '#3d1600',
                        letterSpacing: 3,
                        textShadowColor: 'rgba(255, 255, 255, 0.5)',
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 3,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                         TICKET 
                      </Text>
                      
                      <Text style={{
                        fontSize: 18,
                        color: '#3d1600',
                        textAlign: 'center',
                        marginTop: 10,
                        fontStyle: 'italic',
                      }}>
                        Clique para girar e ver seu prêmio!
                      </Text>

                      {/* Linha decorativa inferior */}
                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#ff69b4', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicket?.color || '#ff69b4', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#ff69b4', opacity: 0.7 }} />
                      </View>
                    </View>
                  </Animated.View>

                  {/* Verso do Ticket (depois de girar) */}
                  <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                  }, backAnimatedStyle]}>
                    <View style={[styles.ticket, {
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8d485',
                      borderWidth: 6,
                      borderColor: selectedTicket?.color || '#ff69b4',
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }]}>
                      <View style={styles.holeLeft} />
                      <View style={styles.holeRight} />

                      {/* Cabeçalho do Verso */}
                      <Text style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: '#3d1600',
                        letterSpacing: 3,
                        textShadowColor: 'rgba(255, 255, 255, 0.5)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 2,
                        marginBottom: 5,
                        textAlign: 'center',
                      }}>
                        TICKET
                      </Text>
                      
                      <Text style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: selectedTicket?.color || '#ff69b4',
                        letterSpacing: 1,
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                        {selectedTicket?.tipo}
                      </Text>

                      {/* Linha divisória */}
                      <View style={{
                        width: '80%',
                        height: 3,
                        backgroundColor: selectedTicket?.color || '#ff69b4',
                        borderRadius: 2,
                        marginVertical: 10,
                      }} />

                      {/* Prêmio */}
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                        <Text style={{
                          fontSize: 22,
                          fontWeight: 'bold',
                          color: '#3d1600',
                          textAlign: 'center',
                          lineHeight: 28,
                          textShadowColor: 'rgba(255, 255, 255, 0.7)',
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 1,
                        }}>
                          {selectedTicket?.text}
                        </Text>
                      </View>

                      {/* Rodapé do Verso */}
                      <Text style={{
                        fontSize: 14,
                        color: '#3d1600',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        marginTop: 10,
                        opacity: 0.8,
                      }}>
                        Clique para girar novamente
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              </Pressable>

              {/* Botão de Fechar */}
              <Pressable
                style={[styles.setaA, {
                  backgroundColor: '#713205',
                  borderRadius: 50,
                  paddingHorizontal: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                  marginTop: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }]}
                onPress={() => {
                  setModalVisibleNovo(false);
                  setShowTicketContent(false);
                  flipAnimation.setValue(0);
                }}
              >
                <Image
                  style={[styles.seta, { 
                    width: 80, 
                    height: 80,
                    tintColor: '#f8d485'
                  }]}
                  source={require('../../../assets/img/seta.png')}
                />
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal Ticket Já Usado */}
        <Modal animationType="fade" transparent visible={modalVisibleUsado}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: '85%',
              paddingVertical: 30,
              backgroundColor: '#572205',
              borderRadius: 30,
              borderWidth: 5,
              borderColor: '#3d1600',
              alignItems: 'center',
              gap: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 20,
            }}>
              <Text style={[styles.codeT, { textAlign: 'center', marginBottom: 20 }]}>
                O de hoje já foi sapeca 🙃
              </Text>

              <Text style={{
                color: '#ffd700',
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
                textAlign: 'center'
              }}>
                Próximo ticket em:
              </Text>

              <View style={{
                backgroundColor: '#3d1600',
                padding: 20,
                borderRadius: 20,
                marginVertical: 15,
                borderWidth: 3,
                borderColor: '#ffd700',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 10,
              }}>
                <Text style={{
                  color: '#fff1dc',
                  fontSize: 32,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  textAlign: 'center',
                }}>
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </Text>
              </View>

              <Pressable
                style={[styles.setaA, { 
                  marginTop: -20,
                  borderRadius: 50,
                  backgroundColor: '#3d1600',
                  paddingHorizontal: 80,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }]}
                onPress={() => setModalVisibleUsado(false)}
              >
                <Image
                  style={[styles.seta, { 
                    tintColor: '#ffd700'
                  }]}
                  source={require('../../../assets/img/seta.png')}
                />
              </Pressable>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}