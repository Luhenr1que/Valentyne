import { StyleSheet,Dimensions } from "react-native";

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
    backGround:{
        width:'100%',
        height:'100%',
        ...StyleSheet.absoluteFillObject, 
        
    },
    botoes:{
        width:width,
        height:height*0.90,
        resizeMode: 'contain',
        alignItems:'center',
        justifyContent:'center',
    },
    codeT:{
        fontSize: 35,
        color: '#fff1dc',
        marginLeft: 20,       
        fontFamily:'nunito',
        top:'10%',
    },
    codeI:{
        textAlign:'center',
        fontSize: 35,
        width:'90%',
        height:70,
        backgroundColor:'#e7b76b',
        borderWidth:5,
        borderRadius:20,
        borderColor:'#713205',
        top:'10%',
    },
    setaA:{
        width:120,
        height:120,
    },
    seta:{
        width:120,
        height:120,
        transform: [{ scaleX: -1 }] 
    },
})