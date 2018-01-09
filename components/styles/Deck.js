import { StyleSheet } from 'react-native';
import { white, gray, black, purple } from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'center'
    },
    deck: {
        marginTop: 1,
        alignItems: 'center'
    },
    buttons: {
      padding: 10
    },
    submitBtn: {
        backgroundColor: white,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
    },
    quizBtn: {
        backgroundColor: black,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
    quizBtnText: {
        color: purple,
        fontSize: 22,
        textAlign: 'center',
    },
})



