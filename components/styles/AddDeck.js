import { StyleSheet } from 'react-native'
import { white, lightyellow, black, gray } from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    input: {
        borderColor: gray,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: lightyellow,
        padding: 20,
        margin: 10
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
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    submitBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center',
    },
})