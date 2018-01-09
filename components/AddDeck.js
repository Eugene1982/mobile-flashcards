import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { DECK_PLACEHOLDER } from '../utils/constants'
import styles from './styles/AddDeck';


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
        this.props.addNewDeck(deckTitle)
        this.resetState()
        this.toDeck(deckTitle)
    }

    toDeck = (deckTitle) => {
        this.props.navigation.navigate(
            'Deck',
            { deckName: deckTitle, count: 0 }
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

function mapStateToProps(decks) {
      return {
        decks
    }
}

export default connect(
    mapStateToProps,
    {addNewDeck}
)(AddDeck)