import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        borderWidth:5,
        borderColor:'#572205',
        alignItems:'center',
        justifyContent:'center',
    },
    setaA:{
        width:80,
        height:80,
        right:'40%',
        top:'3%',
        zIndex:100,
    },
    seta:{
        width:80,
        height:80,
    },
    containerScroll:{
        width:'95%',
        height:'60%',
    },
    linha:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:30,
        borderRadius:30,
        borderColor:'rgba(87, 34, 5, 1)',
        borderWidth:5,
        backgroundColor:'rgba(87, 34, 5, 0.5)',
        width:'100%',
        marginTop:20,
        textAlign:'center',
        paddingTop:20,
        gap:40,
    },
    text:{
        marginTop:5,
        flexShrink: 1,
        fontSize: 21,
        color: '#fff1dc',
        marginLeft: 20,       
        maxWidth: '95%', 
        fontFamily:'nunito',
        textShadowColor: '#005501',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
})