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
        
        zIndex:100,
    },
    seta:{
        width:80,
        height:80,
    },
    containerScroll:{
        width:'95%',
        height:'80%',
        borderColor:'#572205',
        backgroundColor:'rgba(137, 93, 48, 0.5)',
        borderWidth:2,
    },
    text:{
        top:'10%',
        fontSize:40,
        margin:20,
        color: '#fff1dc',
        fontFamily:'nunito',
        textAlign:'center',
    },
    board: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
  },
    row: {
        flexDirection: 'row',
  },
    cell: {
        top:'100%',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 2,
  },
    cellText: {
        fontSize: 50,
        color: '#fff1dc',
        fontFamily: 'nunito',
  },
})