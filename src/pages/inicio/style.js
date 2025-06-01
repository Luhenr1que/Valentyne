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
})