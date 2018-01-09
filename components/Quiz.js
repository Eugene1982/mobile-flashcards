import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { CORRECT_ANSWER, INCORRECT_ANSWER } from '../utils/constants'
import { red } from '../utils/colors'
import styles from './styles/Quiz';
import { clearLocalNotification } from '../utils/helpers'


class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        }
    }

    state = {
        correctAnswers: 0,
        currentIndex: 0,
        percentage: 0,
        showPercentage: false,
        questionMode: true
    }

    nextQuestion = (currentIndex) => {
        const { questions } = this.props
        this.setState(() => {
            return {
                currentIndex: currentIndex + 1,
                questionMode: true
            }
        })
    }

    check = (option) => {
        const { correctAnswers, currentIndex } = this.state
        const { questions } = this.props

        if (option === CORRECT_ANSWER) {
            this.setState({ correctAnswers: correctAnswers + 1 }, () => {
                let percentage = ((questions.length - (questions.length - this.state.correctAnswers)) / questions.length) * 100.0
                this.setState({ percentage })
            })
        }

        if (currentIndex === questions.length - 1) {
            this.setState({ showPercentage: true })
            clearLocalNotification()
        }
        else {
            this.nextQuestion(currentIndex)
        }
    }

    restartQuiz = () => {
        this.setState(() => {
            return {
                correctAnswers: 0,
                currentIndex: 0,
                percentage: 0,
                showPercentage: false,
                questionMode: true
            }
        })
    }

    redirectToDeck = () => {
        const {deckName, questions} = this.props
        this.props.navigation.navigate(
            'Deck',
            { deckName, count: questions.length }
        )
    }

    render() {
        const { currentIndex, questionMode, percentage, showPercentage } = this.state
        const question = this.props.questions[currentIndex]
        return (
            <View style={styles.container}>
                {!showPercentage &&
                    <View>
                        <Text style={{ fontSize: 20 }}>{currentIndex + 1}/{this.props.questions.length}</Text>
                        <Text style={{ fontSize: 40 }}>{questionMode ? question.question : question.answer}</Text>
                        <TouchableOpacity
                            onPress={() => this.setState({ questionMode: !questionMode })}>
                            <Text style={{ fontSize: 20, color: red }}>
                                {questionMode ? "Answer" : "Question"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.correctBtn}
                            onPress={() => this.check(CORRECT_ANSWER)}>
                            <Text style={styles.submitBtnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.incorrectBtn}
                            onPress={() => this.check(INCORRECT_ANSWER)}>
                            <Text style={styles.submitBtnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>}
                {showPercentage &&
                    <View>
                        <Text style={{ fontSize: 20 }}>
                            {"Correct answers: " + percentage + "%"}
                        </Text>
                        <TouchableOpacity
                            style={styles.simpleBtn}
                            onPress={() => this.restartQuiz()}>
                            <Text style={styles.simpleBtnText}>Restar Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.simpleBtn}
                            onPress={() => this.redirectToDeck()}>
                            <Text style={styles.simpleBtnText}>Return to Deck</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
        )
    }
}

function mapStateToProps(decks, { navigation }) {
    const { deckName } = navigation.state.params

    return {
        questions: decks[deckName].questions,
        deckName
    }
}

export default connect(
    mapStateToProps
)(Quiz)