import { StyleSheet } from 'react-native';
import { white, gray, red, black, green } from '../../utils/colors'

export default  StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    correctBtn: {
        backgroundColor: green,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    incorrectBtn: {
        backgroundColor: red,
        borderColor: black,
        borderWidth: 2,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})