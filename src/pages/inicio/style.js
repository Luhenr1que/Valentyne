import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: '#572205',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backGround: {
        width: '100%',
        height: '100%',
        ...StyleSheet.absoluteFillObject,

    },
    botoes: {
        width: width,
        height: height * 0.90,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeT: {
        fontSize: 35,
        color: '#fff1dc',
        marginLeft: 20,
        fontFamily: 'nunito',
        top: '10%',
    },
    codeI: {
        textAlign: 'center',
        fontSize: 35,
        width: '90%',
        height: 70,
        backgroundColor: '#e7b76b',
        borderWidth: 5,
        borderRadius: 20,
        borderColor: '#713205',
        top: '10%',
    },
    setaA: {
        width: 120,
        height: 120,
    },
    seta: {
        width: 120,
        height: 120,
        transform: [{ scaleX: -1 }]
    },

    ticket: {
        width: '90%',
        height: height * 0.22,
        backgroundColor: '#f5c04e',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#8a5a00',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingVertical: 0,
    },

    ticketTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3d1600',
        letterSpacing: 2,
    },

    ticketLine: {
        width: '85%',
        borderTopWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#3d1600',
        marginVertical: 12,
    },

    ticketText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3d1600',
        textAlign: 'center',
        paddingHorizontal: 10,
    },

    /* Recortes laterais */
    holeLeft: {
        position: 'absolute',
        left: -15,
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#bc7126', 
    },

    holeRight: {
        position: 'absolute',
        right: -15,
        width: 35,
        height: 35,
        borderRadius: 150,
        backgroundColor: '#bc7126',
    },
})