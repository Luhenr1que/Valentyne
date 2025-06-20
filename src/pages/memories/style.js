import { StyleSheet } from "react-native";

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
        flexDirection:'row-reverse',
        justifyContent:'center',
        marginBottom:30,
        borderRadius:30,
        borderColor:'rgba(87, 34, 5, 1)',
        borderWidth:5,
        backgroundColor:'rgba(87, 34, 5, 0.5)',
    },
    linha2:{
        display:'flex',
        flexDirection:'row',
        marginBottom:30,
        borderRadius:30,
        borderColor:'rgba(87, 34, 5, 1)',
        borderWidth:5,
        backgroundColor:'rgba(87, 34, 5, 0.5)',
    },
    linhaE:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:30,
    },
    heartContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    heartNumber: {
        position: 'absolute',
        color: '#fff1dc',
        fontSize: 50,
        fontWeight: 'bold',
        top:'10%',
        textShadowColor: '#572205',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        fontFamily: 'nunito',
    },
    coracao:{
        width:100,
        height:100,
        tintColor:'#e7b76b',
    },
    textE:{
        marginTop:5,
        flexShrink: 1,
        fontSize: 21,
        color: '#fff1dc',
        maxWidth: '54%', 
        fontFamily:'nunito',
        textShadowColor: '#005501',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    text:{
        marginTop:5,
        flexShrink: 1,
        fontSize: 21,
        color: '#fff1dc',
        marginLeft: 20,       
        maxWidth: '50%', 
        fontFamily:'nunito',
        textShadowColor: '#005501',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    img:{
        width:170,
        height:230,
        borderRadius:30,
        borderWidth:6,
        borderColor:'#e7b76b',
    },
})