import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { purple, white } from '../utils/colors'
import { addNewCard } from '../actions'
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api'
import { QUESTION_PLACEHOLDER, ANSWER_PLACEHOLDER } from '../utils/constants'


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
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
        const {deck, count} = this.props
        const { question, answer } = this.state

        this.props.dispatch(addNewCard(deck, { question, answer }))

        this.resetState()

        this.toDeck(deck.title, count + 1)

        addCardToDeck({ deck, card: { question, answer } })

        /*clearLocalNotification()
            .then(setLocalNotification)*/
    }

    toDeck = (deckName, questionsCount) => {
       // this.props.navigation.dispatch(NavigationActions.back({ key: 'Deck' }))
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
                <TextInput value={question} onChangeText={this.handleQuestionTextChange}></TextInput>
                <TextInput value={answer} onChangeText={this.handleAnswerTextChange}></TextInput>
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

function mapStateToProps(decks, { navigation }) {
    const { deckName, count } = navigation.state.params

    return {
        deck: decks[deckName],
        count
    }
}


export default connect(
    mapStateToProps
)(AddCard)