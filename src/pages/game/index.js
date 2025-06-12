import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { ImageBackground, Pressable, Text, Image, ScrollView,View,Modal } from "react-native";
import { useAudio } from "../../../audioContext";
import { useEffect,useState } from "react";
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Game(){
    const navigation = useNavigation();
    const {playSound, playSomBot} = useAudio()
    const [m,setM] = useState(false)
    const [msg,setMsg] = useState('')
    const [currentSound, setCurrentSound] = useState(null);
    const [scoreBlue, setScoreBlue] = useState(0);
    const [scorePurple, setScorePurple] = useState(0);

    useEffect(() => {
        const loadScores = async () => {
            const blue = await AsyncStorage.getItem('scoreBlue');
            const purple = await AsyncStorage.getItem('scorePurple');

            if (blue !== null) setScoreBlue(parseInt(blue));
            if (purple !== null) setScorePurple(parseInt(purple));
        };

    loadScores();
    }, []);

    const saveScore = async (blue, purple) => {
        await AsyncStorage.setItem('scoreBlue', blue.toString());
        await AsyncStorage.setItem('scorePurple', purple.toString());
    };


     const playSomBotValue = async (music) => {
    try {
      if (currentSound) {
        await currentSound.unloadAsync();
        setCurrentSound(null);
      }

      if (!music.song) return;

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

      const [board, setBoard] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    const [currentPlayer, setCurrentPlayer] = useState('💙');

const handlePress = (row, col) => {
  if (board[row][col] !== '') return;

  const newBoard = board.map((r, rIndex) =>
    r.map((c, cIndex) => {
      if (rIndex === row && cIndex === col) return currentPlayer;
      return c;
    })
  );

  const hasWon = checkWinner(newBoard, currentPlayer);
  const isDraw = isBoardFull(newBoard) && !hasWon;

  if (hasWon) {
    setBoard(newBoard);
    if (currentPlayer === '💙') {
        const newScore = scoreBlue + 1;
        setScoreBlue(newScore);
        saveScore(newScore, scorePurple);

      playSomBotValue({
        song: require('../../../assets/music/nao.mp3'),
        volume: 1,
      });
      setMsg('Parece que você ganhou meu coração denovo, mas ele sempre foi seu.\n🥰❤❤❤');
    } else {
        const newScore = scorePurple + 1;
        setScorePurple(newScore);
        saveScore(scoreBlue, newScore);
      playSomBotValue({
        song: require('../../../assets/music/cat.mp3'),
        volume: 1,
      });
      setMsg('Sou sempre eu aquele que ganha o seu coração.\n🙃❤❤❤');
    }
    setM(true);
    return;
  }

  if (isDraw) {
    // Reset automático sem mensagem
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('💙');
    return;
  }

  setBoard(newBoard);
  setCurrentPlayer(currentPlayer === '💙' ? '💜' : '💙');
};





function checkWinner(board, player) {
  // Linhas
  for (let i = 0; i < 3; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
  }

  // Colunas
  for (let i = 0; i < 3; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
  }

  // Diagonais
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;

  return false;
}

    function isBoardFull(board) {
        return board.every(row => row.every(cell => cell !== ''));
    }

    const modalOff = () =>{
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
        setCurrentPlayer('💙'); // Se quiser reiniciar com 💙
        setM(false);
    }
    
    return(
        <ImageBackground style={styles.container} resizeMode='cover' source={require('../../../assets/img/game/back.png')}>
            <Pressable style={styles.setaA} onPress={()=>navigation.navigate('Inicio')}><Image style={styles.seta} source={require('../../../assets/img/seta.png')}/></Pressable>
                <View showsVerticalScrollIndicator={false} style={styles.containerScroll}>
                    <Text style={styles.text}>Jogo da Velha</Text>
                        <View style={styles.board}>
                        {board.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.row}>
                            {row.map((cell, colIndex) => (
                                <Pressable
                                key={colIndex}
                                style={styles.cell}
                                onPress={() => handlePress(rowIndex, colIndex)}
                                >
                                <Text style={styles.cellText}>{cell}</Text>
                                </Pressable>
                            ))}
                            </View>
                        ))}
                        </View>
                        <View style={{ flexDirection: 'row',top:'20%', justifyContent: 'space-around', marginVertical: 20 }}>
                            <Text style={{ fontSize: 40, color: 'white' }}>💙: {scoreBlue}</Text>
                            <Text style={{ fontSize: 40, color: 'white' }}>💜: {scorePurple}</Text>
                        </View>
                </View>
                <Modal animationType='fade' visible={m} transparent={true} >
                <Pressable onPress={()=>modalOff()} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(94, 93, 93, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '80%', height:'40%', paddingVertical: 20, backgroundColor: '#bc7126', alignItems: 'center', justifyContent: 'center', gap: 20, borderWidth: 5, borderRadius: 30, borderColor: '#713205', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 30,margin:10,marginBottom:30, color: '#fff1dc', fontFamily: 'nunito', textAlign: 'center' }}>
                        {msg}
                    </Text>
                    </View>
                </Pressable>
                </Modal>
        </ImageBackground>
    )
}