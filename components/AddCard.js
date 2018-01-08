import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { white, black, gray, lightyellow } from '../utils/colors'
import { addNewCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { QUESTION_PLACEHOLDER, ANSWER_PLACEHOLDER } from '../utils/constants'


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
        this.props.dispatch(addNewCard(deck, card))
        this.resetState()
        this.toDeck()
    }

    toDeck = () => {
        this.props.navigation.navigate(
            'DeckList'
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
                <TextInput value={question} onChangeText={this.handleQuestionTextChange} style={styles.input}></TextInput>
                <TextInput value={answer} onChangeText={this.handleAnswerTextChange} style={styles.input}></TextInput>
                <SubmitBtn onPress={this.submit} />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
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

function mapStateToProps(decks, { navigation }) {
    const { deckName } = navigation.state.params

    return {
        deck: decks[deckName]
    }
}

export default connect(
    mapStateToProps
)(AddCard)