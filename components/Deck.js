import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'

function AddBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
    )
}

class Deck extends Component {

    submit = () => {
        // const key = timeToString()
        // const entry = this.state

        /* this.props.dispatch(addEntry({
           [key]: entry
         }))
     
         this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))
     
         this.toHome()
     
         submitEntry({ key, entry })
     
         clearLocalNotification()
           .then(setLocalNotification)*/
    }
    
    render() {
        const { deck } = this.props
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Text>{deck}</Text>
                <AddBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    deck: {
        /*flexDirection: 'row',*/
        marginTop: 1
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    }
})


function mapStateToProps(state, { navigation }) {
    const { deck } = navigation.state.params

    return {
        deck
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Deck)