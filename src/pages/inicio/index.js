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
  const [modalTeste, setModalTeste] = useState(false);
  const [modalVisibleUsadoDireito, setModalVisibleUsadoDireito] = useState(false);
  const [modalVisibleNovoDireito, setModalVisibleNovoDireito] = useState(false);

  const { playSomBot, playSomFlip } = useAudio()
  const [ticketAvailable, setTicketAvailable] = useState(false);
  const [ticketAvailableDireito, setTicketAvailableDireito] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketDireito, setSelectedTicketDireito] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftDireito, setTimeLeftDireito] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showTicketContent, setShowTicketContent] = useState(false);
  const [showTicketContentDireito, setShowTicketContentDireito] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipAnimationDireito = useRef(new Animated.Value(0)).current;
  const [debugInfo, setDebugInfo] = useState('');
  const [ticketSide, setTicketSide] = useState(''); // 'esquerdo' ou 'direito'

  // Configuração dos tipos do ticket ESQUERDO (para ela)
  const ticketConfigEsquerdo = {
    tipos: [
      { nome: '🥰 ROMÂNTICO 🥰', chance: 56, color: '#ff69b4' },   
      { nome: '😈 SAFADO 😈', chance: 40, color: '#992dcbff' },       
      { nome: '🎁 MIMO 🎁', chance: 3, color: '#4c8edaff' },     
      { nome: '💛 JACKPOT 💛', chance: 1, color: '#eec600ff' }       
    ],
    mensagens: {
      '🥰 ROMÂNTICO 🥰': [
        'Vale um montão de beijinhos! 😘',
        'Vale um abraço bem apertado! 🤗',
        'Vale uma declaração de amor! ❤️',
        'Vale um texto fofo! 💌',
        'Vale um texto Sapeca! 😇',
        'Vale um Eu Te Amo Especial! 💖',
        'Vale mudar a cor dos corações por uma semana! 🖤',
        'Vale uma sessão de fotos! 📸',
        'Vale um mimo surpresa! 🎁',
        'Vale uma banana! 🍌',
        'Vale um filminho juntinhos! 🎬',
        'Vale um miojo! 🍜',
        'Vale uma noite jogando videogame! 🎮',
        'Vale pintar as minhas unhas! 💅',
        'Vale cozinhar juntinhos! 🍳',
        'Vale zerar uma série juntos! 📺',
        'Vale apelido novo! 🥰',
        'Vale uma carta de amor! 💕',
        'Vale jogar stardew valley comigo! 🌾',
      ],
      '😈 SAFADO 😈': [
        'Vale uma noite sob a luz Vermelha! 🔥',
        'Vale uma chupada deliciosa! 😈',
        'Vale uma dedada do jeito que você gosta! 🍑',
        'Vale uma transa inesquecível! 💦',
        'Vale uma transa sob a luz da lua! 🌙',
        'Vale uma transa no chuveiro! 🚿',
        'Vale uma transa amarradinha! ⛓️',
        'Vale uma transa no sofá! 🛋️',
        'Vale um chupão! 😋',
        'Vale um nude! 📸',
        'Vale uma transa com muitos tapas! 👋',
        'Vale beber e transar! 🍻',
        'Vale sexo oral gostoso! 👅',
        'Vale um jogo safado! 🎲',
        'Vale uma transa enquanto joga! 🎮',
      ],
      '🎁 MIMO 🎁': [
        'Vale um Chocolate! 🍫',
        'Vale um sorvetinho! 🍦',
        'Vale uma batata! 🍟',
        'Vale um drink especial! 🍹',
        'Vale um vinho! 🍷',
        'Vale um novo brinquedo! 😏',
        'Vale um lanche especial! 🍔',
        'Vale flores! 🌹',
        'Vale roupa de gótica! 🖤',
        'Vale um novo livro! 📚',
      ],
      '💛 JACKPOT 💛': [
        'Vale uma atualização do App! 🚀',
        'Vale um presente surpresa! 🎉',
        'Vale uma massagem VIP! 😏',
        'Vale uma camiseta personalizada nossa! 👕',
        'Vale uma xícara personalizada nossa! ☕',
        'Vale ir no cinema! 🍿',
      ]
    }
  };

  // Configuração dos tipos do ticket DIREITO (para ele)
  const ticketConfigDireito = {
    tipos: [
      { nome: '🎮 GAMER 🎮', chance: 50, color: '#4CAF50' },   
      { nome: '🍔 LANCHÃO 🍔', chance: 30, color: '#FF9800' },       
      { nome: '🎬 CINEMA 🎬', chance: 15, color: '#2196F3' },     
      { nome: '🏆 ESPECIAL 🏆', chance: 5, color: '#9C27B0' }       
    ],
    mensagens: {
      '🎮 GAMER 🎮': [
        'Vale uma noite de jogatina! 🎮',
        'Vale zerar um jogo juntos! 🏆',
        'Vale jogar até de madrugada! 🌙',
        'Vale comprar um jogo novo! 🛒',
        'Vale jogar online com amigos! 👥',
        'Vale maratona de vídeo game! ⚡',
        'Vale jogar em modo coop! 🤝',
        'Vale competir em multiplayer! 🏅',
        'Vale descobrir um jogo novo! 🎯',
        'Vale jogar retro! 👾',
      ],
      '🍔 LANCHÃO 🍔': [
        'Vale um hambúrguer artesanal! 🍔',
        'Vale uma pizza gourmet! 🍕',
        'Vale um rodízio de carne! 🥩',
        'Vale uma sobremesa especial! 🍰',
        'Vale um sushi de qualidade! 🍣',
        'Vale um fast food gostoso! 🍟',
        'Vale um chocolate especial! 🍫',
        'Vale um café da manhã reforçado! 🥞',
        'Vale um sorvete premium! 🍦',
        'Vale uma comida diferente! 🌮',
      ],
      '🎬 CINEMA 🎬': [
        'Vale ir ao cinema! 🍿',
        'Vale maratonar uma série! 📺',
        'Vale assistir um filme antigo! 🎥',
        'Vale ver um filme de terror! 👻',
        'Vale cinema em casa com pipoca! 🏠',
        'Vale documentário interessante! 📽️',
        'Vale ver um filme de super herói! 🦸',
        'Vale uma comédia romântica! 💑',
        'Vale um filme de animação! 🐭',
        'Vale drama emocionante! 😢',
      ],
      '🏆 ESPECIAL 🏆': [
        'Vale um dia em um parque! 🎡',
        'Vale um passeio diferente! 🚶',
        'Vale um jantar romântico! 🕯️',
        'Vale uma viagem curta! 🚗',
        'Vale um show ao vivo! 🎵',
        'Vale um evento esportivo! ⚽',
        'Vale um dia na praia! 🏖️',
        'Vale fazer uma trilha! 🌲',
        'Vale ver o pôr do sol! 🌅',
        'Vale um piquenique! 🧺',
      ]
    }
  };

  // Gerar tickets dinamicamente baseado na configuração ESQUERDA
  const generateTicketsEsquerdo = () => {
    const tickets = [];
    let idCounter = 1;
    
    ticketConfigEsquerdo.tipos.forEach(tipo => {
      const mensagens = ticketConfigEsquerdo.mensagens[tipo.nome] || [];
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

  // Gerar tickets dinamicamente baseado na configuração DIREITA
  const generateTicketsDireito = () => {
    const tickets = [];
    let idCounter = 100; // IDs diferentes para diferenciar
    
    ticketConfigDireito.tipos.forEach(tipo => {
      const mensagens = ticketConfigDireito.mensagens[tipo.nome] || [];
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

  const ticketsEsquerdo = generateTicketsEsquerdo();
  const ticketsDireito = generateTicketsDireito();

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

  // Função para sortear um ticket ESQUERDO
  const drawTicketEsquerdo = () => {
    const totalChance = ticketsEsquerdo.reduce((sum, t) => sum + t.chance, 0);
    
    if (totalChance <= 0) {
      const randomIndex = Math.floor(Math.random() * ticketsEsquerdo.length);
      return ticketsEsquerdo[randomIndex];
    }
    
    const random = Math.random() * totalChance;
    let accumulator = 0;
    
    for (let ticket of ticketsEsquerdo) {
      accumulator += ticket.chance;
      if (random <= accumulator) {
        return ticket;
      }
    }
    
    return ticketsEsquerdo[0];
  };

  // Função para sortear um ticket DIREITO
  const drawTicketDireito = () => {
    const totalChance = ticketsDireito.reduce((sum, t) => sum + t.chance, 0);
    
    if (totalChance <= 0) {
      const randomIndex = Math.floor(Math.random() * ticketsDireito.length);
      return ticketsDireito[randomIndex];
    }
    
    const random = Math.random() * totalChance;
    let accumulator = 0;
    
    for (let ticket of ticketsDireito) {
      accumulator += ticket.chance;
      if (random <= accumulator) {
        return ticket;
      }
    }
    
    return ticketsDireito[0];
  };

  // Função para girar o ticket ESQUERDO
  const flipTicketEsquerdo = () => {
    playSomFlip();
    
    if (!showTicketContent) {
      setShowTicketContent(true);
      Animated.spring(flipAnimation, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      setShowTicketContent(false);
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  // Função para girar o ticket DIREITO
  const flipTicketDireito = () => {
    playSomFlip();
    
    if (!showTicketContentDireito) {
      setShowTicketContentDireito(true);
      Animated.spring(flipAnimationDireito, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      setShowTicketContentDireito(false);
      Animated.spring(flipAnimationDireito, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  // Função para verificar e usar o ticket ESQUERDO
  const useTicketEsquerdo = async () => {
    playSomBot();
    setTicketSide('esquerdo');
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = await AsyncStorage.getItem('ticketDateEsquerdo');
      const used = await AsyncStorage.getItem('ticketUsedEsquerdo');
      
      if (lastDate === null || lastDate !== today) {
        await AsyncStorage.setItem('ticketDateEsquerdo', today);
        await AsyncStorage.setItem('ticketUsedEsquerdo', 'false');
        setTicketAvailable(true);
        
        const ticketDrawn = drawTicketEsquerdo();
        setSelectedTicket(ticketDrawn);
        
        await AsyncStorage.setItem('ticketUsedEsquerdo', 'true');
        
        setShowTicketContent(false);
        flipAnimation.setValue(0);
        
        setModalVisibleNovo(true);
      } else {
        const isUsed = used === 'true';
        
        if (isUsed) {
          setTicketAvailable(false);
          setModalVisibleUsado(true);
        } else {
          setTicketAvailable(true);
          
          const ticketDrawn = drawTicketEsquerdo();
          setSelectedTicket(ticketDrawn);
          
          await AsyncStorage.setItem('ticketUsedEsquerdo', 'true');
          
          setShowTicketContent(false);
          flipAnimation.setValue(0);
          
          setModalVisibleNovo(true);
        }
      }
      
    } catch (error) {
      console.error('Erro ao usar ticket esquerdo:', error);
    }
  };

  // Função para verificar e usar o ticket DIREITO
  const useTicketDireito = async () => {
    playSomBot();
    setTicketSide('direito');
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = await AsyncStorage.getItem('ticketDateDireito');
      const used = await AsyncStorage.getItem('ticketUsedDireito');
      
      if (lastDate === null || lastDate !== today) {
        await AsyncStorage.setItem('ticketDateDireito', today);
        await AsyncStorage.setItem('ticketUsedDireito', 'false');
        setTicketAvailableDireito(true);
        
        const ticketDrawn = drawTicketDireito();
        setSelectedTicketDireito(ticketDrawn);
        
        await AsyncStorage.setItem('ticketUsedDireito', 'true');
        
        setShowTicketContentDireito(false);
        flipAnimationDireito.setValue(0);
        
        setModalVisibleNovoDireito(true);
      } else {
        const isUsed = used === 'true';
        
        if (isUsed) {
          setTicketAvailableDireito(false);
          setModalVisibleUsadoDireito(true);
        } else {
          setTicketAvailableDireito(true);
          
          const ticketDrawn = drawTicketDireito();
          setSelectedTicketDireito(ticketDrawn);
          
          await AsyncStorage.setItem('ticketUsedDireito', 'true');
          
          setShowTicketContentDireito(false);
          flipAnimationDireito.setValue(0);
          
          setModalVisibleNovoDireito(true);
        }
      }
      
    } catch (error) {
      console.error('Erro ao usar ticket direito:', error);
    }
  };

  // Função para testar/resetar os tickets
  const resetTicketTest = async () => {
    try {
      // Limpa os dados dos tickets
      await AsyncStorage.removeItem('ticketDateEsquerdo');
      await AsyncStorage.removeItem('ticketUsedEsquerdo');
      await AsyncStorage.removeItem('ticketDateDireito');
      await AsyncStorage.removeItem('ticketUsedDireito');
      
      // Atualiza os estados
      setTicketAvailable(true);
      setTicketAvailableDireito(true);
      
      setDebugInfo('Tickets resetados com sucesso!');
      setTimeout(() => setDebugInfo(''), 3000);
      
      setModalTeste(false);
    } catch (error) {
      console.error('Erro ao resetar tickets:', error);
      setDebugInfo('Erro ao resetar tickets');
    }
  };

  // Função para simular passar um dia
  const simularNovoDia = async () => {
    try {
      const ontem = new Date();
      ontem.setDate(ontem.getDate() - 1);
      const ontemString = ontem.toISOString().split('T')[0];
      
      await AsyncStorage.setItem('ticketDateEsquerdo', ontemString);
      await AsyncStorage.setItem('ticketUsedEsquerdo', 'true');
      await AsyncStorage.setItem('ticketDateDireito', ontemString);
      await AsyncStorage.setItem('ticketUsedDireito', 'true');
      
      const hoje = new Date().toISOString().split('T')[0];
      if (ontemString !== hoje) {
        setTicketAvailable(true);
        setTicketAvailableDireito(true);
      }
      
      setDebugInfo('Dia simulado: tickets de ontem foram usados');
      setTimeout(() => setDebugInfo(''), 3000);
      
      setModalTeste(false);
    } catch (error) {
      console.error('Erro ao simular novo dia:', error);
      setDebugInfo('Erro ao simular novo dia');
    }
  };

  // Função para mostrar informações de debug
  const mostrarDebugInfo = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const lastDateEsquerdo = await AsyncStorage.getItem('ticketDateEsquerdo');
      const usedEsquerdo = await AsyncStorage.getItem('ticketUsedEsquerdo');
      const lastDateDireito = await AsyncStorage.getItem('ticketDateDireito');
      const usedDireito = await AsyncStorage.getItem('ticketUsedDireito');
      
      const info = `
Data atual: ${today}

TICKET ESQUERDO:
Última data: ${lastDateEsquerdo || 'Nunca usado'}
Usado hoje: ${usedEsquerdo === 'true' ? 'SIM' : 'NÃO'}
Disponível: ${ticketAvailable ? 'SIM' : 'NÃO'}

TICKET DIREITO:
Última data: ${lastDateDireito || 'Nunca usado'}
Usado hoje: ${usedDireito === 'true' ? 'SIM' : 'NÃO'}
Disponível: ${ticketAvailableDireito ? 'SIM' : 'NÃO'}
      `.trim();
      
      setDebugInfo(info);
      setTimeout(() => setDebugInfo(''), 5000);
    } catch (error) {
      console.error('Erro ao mostrar debug:', error);
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
        
        // Verifica status dos tickets
        const today = new Date().toISOString().split('T')[0];
        
        // Ticket ESQUERDO
        const lastDateEsquerdo = await AsyncStorage.getItem('ticketDateEsquerdo');
        const usedEsquerdo = await AsyncStorage.getItem('ticketUsedEsquerdo');
        
        if (lastDateEsquerdo === null || lastDateEsquerdo !== today) {
          await AsyncStorage.setItem('ticketDateEsquerdo', today);
          await AsyncStorage.setItem('ticketUsedEsquerdo', 'false');
          setTicketAvailable(true);
        } else {
          const isAvailableEsquerdo = usedEsquerdo !== 'true';
          setTicketAvailable(isAvailableEsquerdo);
        }
        
        // Ticket DIREITO
        const lastDateDireito = await AsyncStorage.getItem('ticketDateDireito');
        const usedDireito = await AsyncStorage.getItem('ticketUsedDireito');
        
        if (lastDateDireito === null || lastDateDireito !== today) {
          await AsyncStorage.setItem('ticketDateDireito', today);
          await AsyncStorage.setItem('ticketUsedDireito', 'false');
          setTicketAvailableDireito(true);
        } else {
          const isAvailableDireito = usedDireito !== 'true';
          setTicketAvailableDireito(isAvailableDireito);
        }
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    
    loadData();
  }, []);

  // Atualizar contador de tempo e verificar se passou meia-noite
  useEffect(() => {
    const verificarMeiaNoite = async () => {
      const now = new Date();
      const hoje = now.toISOString().split('T')[0];
      
      // Ticket ESQUERDO
      const lastDateEsquerdo = await AsyncStorage.getItem('ticketDateEsquerdo');
      if (lastDateEsquerdo && lastDateEsquerdo !== hoje) {
        await AsyncStorage.setItem('ticketDateEsquerdo', hoje);
        await AsyncStorage.setItem('ticketUsedEsquerdo', 'false');
        setTicketAvailable(true);
      }
      
      // Ticket DIREITO
      const lastDateDireito = await AsyncStorage.getItem('ticketDateDireito');
      if (lastDateDireito && lastDateDireito !== hoje) {
        await AsyncStorage.setItem('ticketDateDireito', hoje);
        await AsyncStorage.setItem('ticketUsedDireito', 'false');
        setTicketAvailableDireito(true);
      }
    };

    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnight());
      setTimeLeftDireito(getTimeUntilMidnight());
      
      const now = new Date();
      if (now.getSeconds() === 0) {
        verificarMeiaNoite();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Interpolação para a animação de rotação ESQUERDA
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

  // Interpolação para a animação de rotação DIREITA
  const frontInterpolateDireito = flipAnimationDireito.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  const backInterpolateDireito = flipAnimationDireito.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  
  const frontAnimatedStyleDireito = {
    transform: [{ rotateY: frontInterpolateDireito }],
  };
  
  const backAnimatedStyleDireito = {
    transform: [{ rotateY: backInterpolateDireito }],
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/img/inicio/back.png')}
        style={{ flex: 1 }}
      >
        {/* Botão do Ticket ESQUERDO */}
        <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 10, backgroundColor: '#3d1600', padding: 7, borderRadius:20, borderWidth: 1, borderColor: '#f8d485', }}>
          <Pressable onPress={useTicketEsquerdo}>
            <Entypo
              name="ticket"
              size={width * 0.09}
              color={ticketAvailable ? '#69d2ffff' : '#555'}
            />
          </Pressable>
        </View>

        {/* Botão do Ticket DIREITO */}
        <View style={{ position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: '#3d1600', padding: 7, borderRadius:20, borderWidth: 1, borderColor: '#f8d485', }}>
          <Pressable onPress={useTicketDireito}>
            <Entypo
              name="ticket"
              size={width * 0.09}
              color={ticketAvailableDireito ? '#4CAF50' : '#555'}
            />
          </Pressable>
        </View>

        {/* Botão de Ferramentas */}
        <View style={{ position: 'absolute', top: 120, right: 20, zIndex: 10 }}>
          <Pressable onPress={() => setModalTeste(true)}>
            <Entypo
              name="tools"
              size={width * 0.08}
              color="#ffd700"
            />
          </Pressable>
        </View>

        {debugInfo ? (
          <View style={{
            position: 'absolute',
            top: 180,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 10,
            padding: 10,
            zIndex: 100,
          }}>
            <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'monospace' }}>
              {debugInfo}
            </Text>
          </View>
        ) : null}

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

        {/* Modal de Teste */}
        <Modal animationType="fade" transparent visible={modalTeste}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: '85%',
              paddingVertical: 30,
              backgroundColor: '#3d1600',
              borderRadius: 30,
              borderWidth: 5,
              borderColor: '#713205',
              alignItems: 'center',
              gap: 15,
            }}>
              <Text style={[styles.codeT, { textAlign: 'center', marginBottom: 20 }]}>
                🛠️ Ferramentas de Teste 🛠️
              </Text>

              <Pressable
                style={{
                  backgroundColor: '#713205',
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: '80%',
                  alignItems: 'center',
                }}
                onPress={resetTicketTest}
              >
                <Text style={{ color: '#ffd700', fontSize: 18, fontWeight: 'bold' }}>
                  🔄 Resetar Tickets
                </Text>
                <Text style={{ color: '#fff1dc', fontSize: 12, textAlign: 'center' }}>
                  (Permite usar novamente agora)
                </Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#713205',
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: '80%',
                  alignItems: 'center',
                }}
                onPress={simularNovoDia}
              >
                <Text style={{ color: '#ffd700', fontSize: 18, fontWeight: 'bold' }}>
                  📅 Simular Novo Dia
                </Text>
                <Text style={{ color: '#fff1dc', fontSize: 12, textAlign: 'center' }}>
                  (Marca como se tivesse usado ontem)
                </Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: '#713205',
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: '80%',
                  alignItems: 'center',
                }}
                onPress={mostrarDebugInfo}
              >
                <Text style={{ color: '#ffd700', fontSize: 18, fontWeight: 'bold' }}>
                  🔍 Informações de Debug
                </Text>
                <Text style={{ color: '#fff1dc', fontSize: 12, textAlign: 'center' }}>
                  (Mostra status atual)
                </Text>
              </Pressable>

              <Pressable
                style={[styles.setaA, { 
                  borderRadius: 50,
                  backgroundColor: '#572205',
                  padding: 15,
                  marginTop: 10,
                }]}
                onPress={() => setModalTeste(false)}
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

        {/* Modal do Ticket Sorteado ESQUERDO */}
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

              <Text style={{
                fontSize: 18,
                color: '#69d2ffff',
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
              }}>
                Ticket Especial para Ela 💖
              </Text>

              {/* Container do Ticket ESQUERDO com Animação */}
              <Pressable onPress={flipTicketEsquerdo} style={{ width: '100%', height: height * 0.3 }}>
                <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Frente do Ticket */}
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
                      borderColor: selectedTicket?.color || '#69d2ffff',
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

                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#69d2ffff', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicket?.color || '#69d2ffff', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#69d2ffff', opacity: 0.7 }} />
                      </View>

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

                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#69d2ffff', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicket?.color || '#69d2ffff', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicket?.color || '#69d2ffff', opacity: 0.7 }} />
                      </View>
                    </View>
                  </Animated.View>

                  {/* Verso do Ticket */}
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
                      borderColor: selectedTicket?.color || '#69d2ffff',
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
                        color: selectedTicket?.color || '#69d2ffff',
                        letterSpacing: 1,
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                        {selectedTicket?.tipo}
                      </Text>

                      <View style={{
                        width: '80%',
                        height: 3,
                        backgroundColor: selectedTicket?.color || '#69d2ffff',
                        borderRadius: 2,
                        marginVertical: 10,
                      }} />

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

        {/* Modal do Ticket Sorteado DIREITO */}
        <Modal animationType="fade" transparent visible={modalVisibleNovoDireito}>
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
                {showTicketContentDireito ? '🎉 PARABÉNS! 🎉' : ' CLIQUE NO TICKET '}
              </Text>

              <Text style={{
                fontSize: 18,
                color: '#4CAF50',
                fontWeight: 'bold',
                marginBottom: 10,
                textAlign: 'center',
              }}>
                Ticket Especial para Ele 💪
              </Text>

              {/* Container do Ticket DIREITO com Animação */}
              <Pressable onPress={flipTicketDireito} style={{ width: '100%', height: height * 0.3 }}>
                <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                  {/* Frente do Ticket */}
                  <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                  }, frontAnimatedStyleDireito]}>
                    <View style={[styles.ticket, {
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8d485',
                      borderWidth: 6,
                      borderColor: selectedTicketDireito?.color || '#4CAF50',
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

                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicketDireito?.color || '#4CAF50', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicketDireito?.color || '#4CAF50', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicketDireito?.color || '#4CAF50', opacity: 0.7 }} />
                      </View>

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

                      <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicketDireito?.color || '#4CAF50', opacity: 0.7 }} />
                        <View style={{ flex: 1, height: 4, backgroundColor: selectedTicketDireito?.color || '#4CAF50', marginHorizontal: 10, borderRadius: 2 }} />
                        <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: selectedTicketDireito?.color || '#4CAF50', opacity: 0.7 }} />
                      </View>
                    </View>
                  </Animated.View>

                  {/* Verso do Ticket */}
                  <Animated.View style={[{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                  }, backAnimatedStyleDireito]}>
                    <View style={[styles.ticket, {
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#f8d485',
                      borderWidth: 6,
                      borderColor: selectedTicketDireito?.color || '#4CAF50',
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
                        color: selectedTicketDireito?.color || '#4CAF50',
                        letterSpacing: 1,
                        textShadowColor: 'rgba(0, 0, 0, 0.3)',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 3,
                        marginBottom: 10,
                        textAlign: 'center',
                      }}>
                        {selectedTicketDireito?.tipo}
                      </Text>

                      <View style={{
                        width: '80%',
                        height: 3,
                        backgroundColor: selectedTicketDireito?.color || '#4CAF50',
                        borderRadius: 2,
                        marginVertical: 10,
                      }} />

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
                          {selectedTicketDireito?.text}
                        </Text>
                      </View>

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
                  setModalVisibleNovoDireito(false);
                  setShowTicketContentDireito(false);
                  flipAnimationDireito.setValue(0);
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

        {/* Modal Ticket ESQUERDO Já Usado */}
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
                O de hoje já foi Sapeca 🙃
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

        {/* Modal Ticket DIREITO Já Usado */}
        <Modal animationType="fade" transparent visible={modalVisibleUsadoDireito}>
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
                O de hoje já foi usado! 🎫
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
                  {String(timeLeftDireito.hours).padStart(2, '0')}:
                  {String(timeLeftDireito.minutes).padStart(2, '0')}:
                  {String(timeLeftDireito.seconds).padStart(2, '0')}
                </Text>
              </View>

              <Pressable
                style={[styles.setaA, { 
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
                onPress={() => setModalVisibleUsadoDireito(false)}
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