import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { QUESTION_PLACEHOLDER, ANSWER_PLACEHOLDER } from '../utils/constants'
import styles from './styles/AddCard';


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Add Card'
        }
      }

    state = {
        question: QUESTION_PLACEHOLDER,
        answer: ANSWER_PLACEHOLDER
    }

    resetState = () => {
        this.setState(() => ({ question: QUESTION_PLACEHOLDER, answer: ANSWER_PLACEHOLDER }))
    }

    submit = () => {
        const {deck} = this.props
        const { question, answer } = this.state

        addCardToDeck({ deck, card: { question, answer } }, this.callbackFunc)
    }

    callbackFunc = (deck, card) => {
        this.props.addNewCard(deck, card)
        this.resetState()
        this.toDeck(deck)
    }

    toDeck = (deck) => {
        this.props.navigation.navigate(
            'Deck',
            { deckName: deck.title, count: deck.questions.length }
        )
    }

    handleQuestionTextChange = (text) => {
        this.setState((state) => { 
            return {
                ...state, 
                question: text 
            }
        })
    }

    handleAnswerTextChange = (text) => {
        this.setState((state) => { 
            return {
                ...state, 
                answer: text 
            }
        })
    }

    render() {
        const { question, answer } = this.state
        return (
            <View style={styles.container}>
               <KeyboardAvoidingView>
                <TextInput value={question} onChangeText={this.handleQuestionTextChange} style={styles.input}></TextInput>
                <TextInput value={answer} onChangeText={this.handleAnswerTextChange} style={styles.input}></TextInput>
                <SubmitBtn onPress={this.submit} />
                </KeyboardAvoidingView>
            </View>)
    }
}

function mapStateToProps(decks, { navigation }) {
    const { deckName } = navigation.state.params

    return {
        deck: decks[deckName]
    }
}

export default connect(
    mapStateToProps,
    {addNewCard}
)(AddCard)