import { StyleSheet,Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        flex: 1,

        backgroundColor:'#005500',
        borderWidth:10,
        borderColor:'#6c2400',
        opacity:1,
    },
    image:{
        bottom:'2%',
        width: width,
        height: height,
    },

});
