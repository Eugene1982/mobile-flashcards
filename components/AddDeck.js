import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, lightyellow, black, gray } from '../utils/colors'
import { addNewDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { DECK_PLACEHOLDER } from '../utils/constants'


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
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
        const { deckTitle } = this.state
        saveDeckTitle(deckTitle, this.callbackFunc)
    }

    callbackFunc = (deckTitle) => {
        this.props.dispatch(addNewDeck(deckTitle))
        this.resetState()
        this.toDeckList()
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
                <TextInput value={title} onChangeText={this.handleTextChange} style={styles.input}></TextInput>
                <SubmitBtn onPress={this.submit} />
            </View>)
    }


}

const styles = StyleSheet.create({
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

function mapStateToProps(decks) {
      return {
        decks
    }
}

export default connect(
    mapStateToProps
)(AddDeck)