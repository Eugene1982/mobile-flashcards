import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { addNewDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { DECK_PLACEHOLDER } from '../utils/constants'


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'NEW DECK'
        }
      }

    state = {
        deckTitle: DECK_PLACEHOLDER
    }

    resetState = () => {
        this.setState(() => ({ deckTitle: DECK_PLACEHOLDER }))
    }

    submit = () => {
        const {decks} = this.props
        const { deckTitle } = this.state

        this.props.dispatch(addNewDeck(deckTitle))

        this.resetState()

        this.toDeckList()

        saveDeckTitle(deckTitle)

        /*clearLocalNotification()
            .then(setLocalNotification)*/
    }

    toDeckList = () => {
        this.props.navigation.navigate(
            'DeckList'
        )
    }


    handleTextChange = (text) => {
        this.setState((state) => { 
            return {
                ...state, 
                deckTitle: text 
            }
        })
    }

    render() {
        const { title } = this.state
        return (
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput value={title} onChangeText={this.handleTextChange}></TextInput>
                <SubmitBtn onPress={this.submit} />
            </View>)
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
})

function mapStateToProps(decks) {
      return {
        decks
    }
}


export default connect(
    mapStateToProps
)(AddCard)