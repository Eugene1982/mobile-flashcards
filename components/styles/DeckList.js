import { StyleSheet } from 'react-native';
import { white, gray, yellow, black } from '../../utils/colors'

export default  StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    deck: {
        alignItems: 'center',
        marginTop: 1,
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
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
})


